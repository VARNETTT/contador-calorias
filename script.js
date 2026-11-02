/* CalorieTrack · lógica principal */
(() => {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const STORAGE_MEALS = "calorietrack_meals_v2";
  const STORAGE_GOAL = "calorietrack_goal_v2";
  const foods = Array.isArray(window.calorieTrackFoodsAR) ? window.calorieTrackFoodsAR : [];
  let scanner = null;
  let scannedNutrition = null;

  const todayKey = () => new Date().toLocaleDateString("en-CA");
  const readJSON = (key, fallback) => {
    try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; }
    catch { return fallback; }
  };
  let meals = readJSON(STORAGE_MEALS, []).filter(m => m && m.date === todayKey());
  let goal = readJSON(STORAGE_GOAL, { calories: 2000, protein: 120 });

  const saveMeals = () => localStorage.setItem(STORAGE_MEALS, JSON.stringify(meals));
  const saveGoal = () => localStorage.setItem(STORAGE_GOAL, JSON.stringify(goal));
  const fmt = n => Math.round(Number(n) || 0).toLocaleString("es-AR");

  function openModal(name) {
    const modal = $(name);
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function closeModal(name) {
    const modal = $(name);
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    if (!document.querySelector(".modal.is-open")) document.body.style.overflow = "";
    if (name === "mealModal") stopScanner();
  }

  function normalize(value) {
    return String(value || "").toLowerCase().normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "").replace(/[.,;:!?()[\]]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  const numberWords = {un:1,una:1,uno:1,dos:2,tres:3,cuatro:4,cinco:5,seis:6,siete:7,ocho:8,nueve:9,diez:10,media:.5,medio:.5};
  function quantityBefore(text, index) {
    const before = text.slice(Math.max(0, index - 35), index).trim();
    const match = before.match(/(\d+(?:[.,]\d+)?)\s*(?:g|gr|gramos?|ml|mililitros?)?\s*(?:de)?\s*$/);
    if (match) return Number(match[1].replace(",", "."));
    const words = Object.keys(numberWords).sort((a,b)=>b.length-a.length);
    for (const word of words) if (new RegExp(`\\b${word}\\s*$`).test(before)) return numberWords[word];
    return 1;
  }
  function estimateMeal(description, portion = "normal") {
    const text = normalize(description);
    const found = [];
    const occupied = [];
    for (const food of [...foods].sort((a,b)=>Math.max(...b.aliases.map(x=>normalize(x).length))-Math.max(...a.aliases.map(x=>normalize(x).length)))) {
      for (const aliasRaw of food.aliases) {
        const alias = normalize(aliasRaw);
        if (!alias) continue;
        const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const re = new RegExp(`\\b${escaped}\\b`, "g");
        let match;
        while ((match = re.exec(text)) !== null) {
          const start = match.index, end = start + match[0].length;
          if (occupied.some(([a,b]) => start < b && end > a)) continue;
          occupied.push([start,end]);
          const before = text.slice(Math.max(0,start-45), start);
          const grams = before.match(/(\d+(?:[.,]\d+)?)\s*(g|gr|gramos?)\s*(?:de)?\s*$/);
          const ml = before.match(/(\d+(?:[.,]\d+)?)\s*(ml|mililitros?)\s*(?:de)?\s*$/);
          let amount, unit;
          if (grams) { amount = Number(grams[1].replace(",",".")); unit = "g"; }
          else if (ml) { amount = Number(ml[1].replace(",",".")); unit = "ml"; }
          else {
            const qty = quantityBefore(text,start);
            amount = food.portion ? food.portion * qty : (food.unit === "ml" ? 100 : 100) * qty;
            unit = food.unit;
          }
          if (!Number.isFinite(amount) || amount <= 0) continue;
          const factor = amount / 100;
          found.push({name:food.name,amount,unit,kcal:food.kcal*factor,protein:food.protein*factor});
        }
      }
    }
    const multiplier = portion === "poco" ? .8 : portion === "abundante" ? 1.2 : 1;
    const kcal = found.reduce((s,x)=>s+x.kcal,0) * multiplier;
    const protein = found.reduce((s,x)=>s+x.protein,0) * multiplier;
    return { foods:found, calories:kcal, protein, multiplier };
  }

  function render() {
    const calories = meals.reduce((s,m)=>s+m.calories,0);
    const protein = meals.reduce((s,m)=>s+m.protein,0);
    const target = Math.max(1, Number(goal.calories) || 2000);
    $("dailyConsumedCalories").textContent = fmt(calories);
    $("dailyTargetCalories").textContent = fmt(target);
    $("totalProtein").textContent = fmt(protein);
    $("totalMeals").textContent = meals.length;
    const percent = Math.min(100, calories / target * 100);
    $("dailyProgress").style.width = `${percent}%`;
    $("dailyRemainingCalories").textContent = calories <= target
      ? `Te quedan aproximadamente ${fmt(target-calories)} kcal para tu objetivo.`
      : `Superaste tu objetivo estimado por ${fmt(calories-target)} kcal.`;
    $("progressGoalLabel").textContent = `${fmt(target)} kcal`;
    $("todayLabel").textContent = new Date().toLocaleDateString("es-AR",{weekday:"short",day:"numeric",month:"short"});
    const list = $("mealList");
    list.innerHTML = "";
    if (!meals.length) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML = '<span class="empty-icon">☼</span><h3>Tu día empieza acá</h3><p>Todavía no registraste comidas. Cuando agregues una, la vas a ver en esta lista.</p><button class="button button-outline" id="emptyAddMeal" type="button">Agregar mi primera comida</button>';
      list.appendChild(empty);
      $("emptyAddMeal").addEventListener("click", () => openModal("mealModal"));
      return;
    }
    const icons = {Desayuno:"☀",Almuerzo:"🥗",Merienda:"☕",Cena:"🌙",Colación:"🍎"};
    meals.slice().reverse().forEach(meal => {
      const item = document.createElement("article");
      item.className = "meal-item";
      const symbol = document.createElement("div"); symbol.className = "meal-symbol"; symbol.textContent = icons[meal.type] || "🍽";
      const info = document.createElement("div"); info.className = "meal-info";
      const title = document.createElement("h3"); title.textContent = meal.type;
      const desc = document.createElement("p"); desc.textContent = meal.description;
      info.append(title,desc);
      const nutrition = document.createElement("div"); nutrition.className = "meal-nutrition";
      nutrition.innerHTML = `<div><strong>${fmt(meal.calories)}</strong><span>kcal</span></div><div><strong>${fmt(meal.protein)} g</strong><span>proteínas</span></div>`;
      const del = document.createElement("button"); del.className = "delete-meal"; del.type = "button"; del.setAttribute("aria-label","Eliminar comida"); del.textContent = "×";
      del.addEventListener("click",()=>{ meals = meals.filter(x=>x.id!==meal.id); saveMeals(); render(); });
      item.append(symbol,info,nutrition,del); list.appendChild(item);
    });
  }

  function updateEstimatePreview() {
    const text = $("mealDescription").value.trim();
    if (!text) { $("estimatePreview").hidden = true; return null; }
    const portion = document.querySelector('input[name="portion"]:checked')?.value || "normal";
    const estimate = estimateMeal(text, portion);
    $("previewCalories").textContent = `${fmt(estimate.calories)} kcal`;
    $("previewProtein").textContent = `${estimate.protein.toFixed(1)} g`;
    $("previewDetails").textContent = estimate.foods.length
      ? `Detectados: ${estimate.foods.map(f=>`${f.name} (${fmt(f.amount)} ${f.unit})`).join(", ")}`
      : "No reconocí alimentos de la base. Probá con nombres simples y cantidades, por ejemplo: 2 huevos o 150 g de pollo.";
    $("estimatePreview").hidden = false;
    return estimate;
  }

  async function startScanner() {
    if (!window.Html5Qrcode) {
      $("scannerStatus").textContent = "No se pudo cargar el lector. Revisá tu conexión e intentá nuevamente.";
      return;
    }
    $("scannerSection").hidden = false;
    $("scannerStatus").textContent = "Solicitando permiso para usar la cámara…";
    if (!scanner) scanner = new Html5Qrcode("reader");
    try {
      const cameras = await Html5Qrcode.getCameras();
      if (!cameras.length) throw new Error("No se encontró una cámara disponible.");
      const cameraId = cameras.find(c => /back|rear|trasera|environment/i.test(c.label))?.id || cameras[0].id;
      await scanner.start(cameraId, {fps:10, qrbox:{width:250,height:150}}, onBarcodeScanned, () => {});
      $("scannerStatus").textContent = "Apuntá la cámara al código de barras del producto.";
      $("scanButton").disabled = true;
    } catch (error) {
      $("scannerStatus").textContent = error.message || "No se pudo iniciar la cámara. Permití el acceso desde el navegador.";
    }
  }
  async function stopScanner() {
    $("scanButton").disabled = false;
    if (scanner && scanner.isScanning) {
      try { await scanner.stop(); } catch (e) { console.warn("No se pudo detener el escáner:",e); }
    }
    $("scannerSection").hidden = true;
  }
  async function onBarcodeScanned(code) {
    await stopScanner();
    $("scannerSection").hidden = false;
    $("scannerStatus").textContent = `Código detectado: ${code}. Buscando información nutricional…`;
    await lookupBarcode(code);
  }
  async function lookupBarcode(code) {
    const box = $("scannedProduct");
    box.hidden = false;
    box.textContent = "Consultando Open Food Facts…";
    scannedNutrition = null;
    try {
      const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(code)}.json`);
      if (!response.ok) throw new Error("No se pudo consultar la base de productos.");
      const data = await response.json();
      const product = data.product;
      if (data.status !== 1 || !product) throw new Error("No encontramos ese producto. Podés ingresarlo manualmente.");
      const n = product.nutriments || {};
      const kcal = Number(n["energy-kcal_100g"] ?? (Number(n["energy_100g"]) / 4.184));
      const protein = Number(n.proteins_100g);
      if (!Number.isFinite(kcal) || !Number.isFinite(protein)) throw new Error("El producto no tiene datos nutricionales completos.");
      scannedNutrition = {name:product.product_name || product.brands || "Producto escaneado",kcal,protein};
      // Incorporamos el producto a la base de esta sesión para que el analizador
      // pueda calcularlo cuando el usuario escriba la cantidad en gramos.
      const productAlias = normalize(scannedNutrition.name);
      const existing = foods.find(food => food.id === `barcode_${code}`);
      if (!existing) {
        foods.push({
          id: `barcode_${code}`,
          name: scannedNutrition.name,
          aliases: [productAlias],
          kcal,
          protein,
          unit: "g",
          portion: 100
        });
      }
      box.textContent = `${scannedNutrition.name} · ${fmt(kcal)} kcal y ${protein.toFixed(1)} g de proteína cada 100 g. Ingresá la cantidad en la descripción como “100 g de ${scannedNutrition.name}”.`;
      const current = $("mealDescription").value.trim();
      if (!current) $("mealDescription").value = `100 g de ${scannedNutrition.name}`;
      updateEstimatePreview();
    } catch (error) {
      box.textContent = error.message || "Ocurrió un error al buscar el producto.";
    }
  }

  $("mealForm").addEventListener("submit", event => {
    event.preventDefault();
    const description = $("mealDescription").value.trim();
    const type = $("mealType").value;
    const portion = document.querySelector('input[name="portion"]:checked')?.value || "normal";
    if (!description) { $("mealError").textContent = "Escribí qué comiste antes de guardar."; return; }
    const estimate = estimateMeal(description, portion);
    if (!estimate.foods.length || estimate.calories <= 0) {
      $("mealError").textContent = "No pude reconocer los alimentos. Probá con nombres como banana, huevo, arroz o pollo.";
      return;
    }
    meals.push({id:crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),date:todayKey(),type,description,calories:estimate.calories,protein:estimate.protein});
    saveMeals(); render(); $("mealForm").reset(); $("estimatePreview").hidden=true; $("scannedProduct").hidden=true; $("mealError").textContent="";
    closeModal("mealModal");
  });

  $("goalForm").addEventListener("submit", event => {
    event.preventDefault();
    const weight = Number($("goalWeight").value), height = Number($("goalHeight").value), age = Number($("goalAge").value);
    const sex = $("goalSex").value, activity = Number($("goalActivity").value), type = $("goalType").value;
    if (!(weight>0 && height>0 && age>=13)) { $("goalError").textContent = "Revisá los datos ingresados."; return; }
    const bmr = 10*weight + 6.25*height - 5*age + (sex==="male" ? 5 : -161);
    const tdee = bmr*activity;
    let target = type==="deficit" ? tdee-300 : type==="surplus" ? tdee+200 : tdee;
    target = Math.max(1200,Math.round(target/50)*50);
    goal = {calories:target,protein:Math.round(weight*1.4)};
    saveGoal();
    $("goalResult").hidden=false;
    $("goalResult").textContent=`Tu gasto diario estimado es de ${fmt(tdee)} kcal. Como punto de partida, el objetivo calculado es ${fmt(target)} kcal por día. Es una estimación general, no una indicación médica.`;
    $("goalError").textContent="";
    render();
  });

  ["openMealModal","dashboardAddMeal","emptyAddMeal","headerAddMeal"].forEach(id=>$(id)?.addEventListener("click",()=>openModal("mealModal")));
  $("openGoalModal").addEventListener("click",()=>openModal("goalModal"));
  document.querySelectorAll("[data-close]").forEach(button=>button.addEventListener("click",()=>closeModal(button.dataset.close==="meal"?"mealModal":"goalModal")));
  $("scanButton").addEventListener("click",startScanner);
  $("stopScanner").addEventListener("click",stopScanner);
  $("mealDescription").addEventListener("input",updateEstimatePreview);
  document.querySelectorAll('input[name="portion"]').forEach(input=>input.addEventListener("change",updateEstimatePreview));
  document.addEventListener("keydown",event=>{if(event.key==="Escape"){closeModal("mealModal");closeModal("goalModal");}});
  render();
})();
