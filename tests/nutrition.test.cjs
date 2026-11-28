// Ejecutar desde la raíz con node --test tests/nutrition.test.cjs
// Adaptadores en memoria para DOM, localStorage y el JSON local.
// El formulario y los dos botones ejecutan los manejadores reales de script.js.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const catalog = JSON.parse(fs.readFileSync(path.join(root, 'nutrition_ar.json')));
const mealsKey = 'calorietrack_meals_v2';

class Element {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.listeners = new Map();
    this.style = {};
    this.value = '';
    this.textContent = '';
  }
  append(...elements) { this.children.push(...elements); }
  prepend(...elements) { this.children.unshift(...elements); }
  replaceChildren(...elements) { this.children = elements; }
  setAttribute(key, value) { this[key] = value; }
  reset() {}
  addEventListener(name, fn) {
    if (!this.listeners.has(name)) this.listeners.set(name, []);
    this.listeners.get(name).push(fn);
  }
  async fire(name) {
    for (const fn of this.listeners.get(name) || []) await fn({preventDefault() {}});
  }
  flat() { return [this, ...this.children.flatMap(child => child.flat())]; }
}

function start(storage = new Map()) {
  const ids = ['analyzePhraseButton', 'analyzeAIButton', 'mealDescription', 'aiAnalysis',
    'phraseAnalysis', 'mealForm', 'mealList', 'mealError', 'dailyConsumedCalories', 'totalMeals'];
  const elements = {};
  for (const id of ids) {
    assert.ok(html.includes('id="' + id + '"'), id + ' debe existir en index.html');
    elements[id] = new Element(id);
  }
  const document = {
    readyState: 'complete',
    createElement: tag => new Element(tag),
    createTextNode: text => Object.assign(new Element('text'), {textContent: text}),
    getElementById: id => elements[id] || null,
    querySelector: () => null, querySelectorAll: () => [], addEventListener() {}
  };
  const fetch = async url => {
    assert.match(url, /^\.\/nutrition_ar\.json\?/, 'El caso debe resolverse localmente');
    return {ok: true, json: async () => catalog};
  };
  vm.runInNewContext(script, {window: {}, document, fetch, AbortController, setTimeout, clearTimeout,
    localStorage: {getItem: k => storage.get(k) ?? null, setItem: (k,v) => storage.set(k,v)},
    console: {log() {}, info() {}, error: console.error, warn: console.warn}});
  return {elements, storage};
}

const breakfast = 'Comí 2 huevos, 2 tostadas y una banana';
const expectedBreakfast = [['huevo crudo',100,'g'],['tostadas de pan blanco',60,'g'],['banana',120,'g']];
const cases = [
  [breakfast, expectedBreakfast],
  ['0,5 kg de arroz', [['arroz blanco cocido',500,'g']]],
  ['0.5 kg de arroz', [['arroz blanco cocido',500,'g']]],
  ['250 ml de leche descremada y 40 g de avena', [['leche descremada',250,'ml'],['avena seca',40,'g']]],
  ['1,5 litros de leche descremada; dos bananas', [['leche descremada',1500,'ml'],['banana',240,'g']]],
  ['un huevo y medio kilo de arroz', [['huevo crudo',50,'g'],['arroz blanco cocido',500,'g']]],
  ['12,5g de avena, 1.5 tostadas', [['avena seca',12.5,'g'],['tostadas de pan blanco',45,'g']]],
  ['dos huevos,una banana', [['huevo crudo',100,'g'],['banana',120,'g']]],
  ['medio huevo con 125 mililitros de leche descremada', [['huevo crudo',25,'g'],['leche descremada',125,'ml']]]
];

function button(panel, label) {
  const result = panel.flat().find(e => e.tag === 'button' && e.textContent.includes(label));
  assert.ok(result, 'Falta el botón ' + label);
  return result;
}

async function analyze(app, text, id = 'analyzePhraseButton') {
  app.elements.mealDescription.value = text;
  await app.elements[id].fire('click');
}

function near(actual, expected) {
  assert.ok(Math.abs(actual - expected) < 1e-8, actual + ' vs ' + expected);
}

for (const [text, expected] of cases) {
  test(text, async () => {
    const app = start();
    await analyze(app, text);
    assert.equal(app.storage.has(mealsKey), false);
    await button(app.elements.aiAnalysis,'Confirmar').fire('click');
    assert.equal(app.storage.has(mealsKey), false);
    await app.elements.mealForm.fire('submit');
    const meals = JSON.parse(app.storage.get(mealsKey));
    assert.equal(meals.length, 1);
    const meal = meals[0];
    assert.deepEqual(meal.products.map(p => [p.name,p.amount,p.unit]), expected);
    for (const [key, field] of Object.entries({calories:'kcal', protein:'protein', carbs:'carbs', fats:'fats'})) {
      let total = 0;
      expected.forEach(([name,amount], i) => {
        const ref = catalog.foods.find(f => f.name === name);
        const value = amount * ref[field + '_per_100'] / 100;
        near(meal.products[i][key], value);
        total += value;
      });
      near(meal[key], total);
    }
    const again = start(app.storage);
    assert.equal(again.elements.totalMeals.textContent, '1');
    assert.equal(again.elements.dailyConsumedCalories.textContent, meal.calories.toLocaleString('es-AR',{maximumFractionDigits:1}));
    for (const [name] of expected) assert.ok(again.elements.mealList.flat().some(e => e.textContent.includes(name)));
    await again.elements.mealForm.fire('submit');
    assert.equal(JSON.parse(app.storage.get(mealsKey)).length, 1);
  });
}

test('Ruta rápida de IA, edición de porción y conservación de un registro previo', async () => {
  const old = {id:'anterior',date:'2024-01-01',description:'Registro previo',calories:90,protein:3};
  const app = start(new Map([[mealsKey,JSON.stringify([old])]]));
  await analyze(app, breakfast, 'analyzeAIButton');
  const panel = app.elements.aiAnalysis;
  const egg = panel.flat().find(e => e.tag === 'input');
  egg.value = '75.5';
  await egg.fire('input');
  await button(panel,'Confirmar').fire('click');
  await app.elements.mealForm.fire('submit');
  const [before, meal] = JSON.parse(app.storage.get(mealsKey));
  assert.deepEqual(before, old);
  assert.equal(meal.products.length,3);
  assert.equal(meal.products[0].amount,75.5);
  near(meal.calories, 143 * 0.755 + 265 * 0.6 + 89 * 1.2);
});

for (const text of ['un huevo y 2 ml de arroz','un huevo y producto desconocido']) {
  test('Avisa el ingrediente sin identificar: ' + text, async () => {
    const app = start();
    await analyze(app,text);
    assert.ok(app.elements.phraseAnalysis.flat().some(e => e.textContent.includes('Sin identificar:')));
    assert.equal(app.storage.has(mealsKey),false);
  });
}

test('Dos análisis en una comida: guardar antes de confirmar la segunda tanda no descarta ingredientes', async () => {
  const app = start();
  await analyze(app, 'un huevo');
  await button(app.elements.aiAnalysis, 'Confirmar').fire('click');
  await analyze(app, 'leche descremada (250 ml) + avena (40 g)');
  await app.elements.mealForm.fire('submit');
  assert.equal(app.storage.has(mealsKey), false);
  assert.match(app.elements.mealError.textContent, /Confirmá/);
  await button(app.elements.aiAnalysis, 'Confirmar').fire('click');
  await app.elements.mealForm.fire('submit');
  const meals = JSON.parse(app.storage.get(mealsKey));
  assert.equal(meals.length, 1);
  assert.deepEqual(meals[0].products.map(p => p.amount), [50,250,40]);
  near(meals[0].calories, 143 * 0.5 + 35 * 2.5 + 389 * 0.4);
});

test('Editar el texto mientras se analiza invalida la revisión anterior', async () => {
  const app = start();
  const first = analyze(app, breakfast);
  app.elements.mealDescription.value = '0,5 kg de arroz';
  await app.elements.mealDescription.fire('input');
  await first;
  assert.equal(app.elements.aiAnalysis.children.length, 0);
  await analyze(app,'0,5 kg de arroz');
  await button(app.elements.aiAnalysis, 'Confirmar').fire('click');
  await app.elements.mealForm.fire('submit');
  const [meal] = JSON.parse(app.storage.get(mealsKey));
  assert.deepEqual(meal.products.map(p => p.amount), [500]);
});

test('Los registros inválidos no reducen el total diario y el botón queda en su columna', () => {
  const now = new Date();
  const date = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
  const storage = new Map([[mealsKey, JSON.stringify([{id:'a',date,type:'Desayuno',description:'Prueba',calories:100,protein:5},{id:'b',date,type:'Desayuno',description:'Inválido',calories:-30,protein:-2}])]]);
  const app = start(storage);
  assert.equal(app.elements.dailyConsumedCalories.textContent, '100');
  const cards = app.elements.mealList.flat().filter(e=>e.className==='meal-item meal-card-v2');
  assert.equal(cards.length,2);
  for(const card of cards){assert.equal(card.children.length,2);assert.match(card.children[1].className,/meal-card-actions/);assert.match(card.children[1].children[0]['aria-label'],/Eliminar/);}
});
