
/* ============================================
   CALORIETRACK
   SCRIPT CORREGIDO - PARTE 1
   Buscador de alimentos + Agua + Progreso
============================================ */

(() => {
  "use strict";

  /* ============================================
     CONFIGURACIÓN
  ============================================ */

  const $ = id => document.getElementById(id);

  const KEYS = {
    meals: "calorietrack_meals_v2",
    products: "calorietrack_products_v1",
    goal: "calorietrack_goal_v2",
    water: "calorietrack_water_v1",
    steps: "calorietrack_steps_v1"
  };

  const API = "https://world.openfoodfacts.org";
  const AI_API = "https://contador-calorias-yiqx.onrender.com";

  const OFF_FIELDS = [
    "code",
    "product_name",
    "product_name_es",
    "generic_name_es",
    "brands",
    "nutriments",
    "quantity",
    "serving_size",
    "product_quantity",
    "product_quantity_unit",
    "image_front_url",
    "image_url",
    "countries_tags"
  ].join(",");

  /* ============================================
     ALMACENAMIENTO LOCAL
  ============================================ */

  const read = (key, fallback) => {
    try {
      return JSON.parse(
        localStorage.getItem(key)
      ) ?? fallback;
    } catch {
      return fallback;
    }
  };

  const write = (key, value) => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      );
      return true;
    } catch (error) {
      console.error(error);

      alert(
        "No se pudieron guardar los datos. " +
        "Revisá el almacenamiento del navegador."
      );

      return false;
    }
  };

  /* ============================================
     FUNCIONES AUXILIARES
  ============================================ */

  const num = value => {
    if (
      value === "" ||
      value === null ||
      value === undefined
    ) {
      return NaN;
    }

    return Number(
      String(value).replace(",", ".")
    );
  };

  const positive = value =>
    Number.isFinite(num(value)) &&
    num(value) > 0;

  const nonnegative = value =>
    Number.isFinite(num(value)) &&
    num(value) >= 0;

  const fmt = value =>
    Number(value || 0).toLocaleString(
      "es-AR",
      {
        maximumFractionDigits: 1
      }
    );

  const normalize = value =>
    String(value || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const uid = () =>
    globalThis.crypto?.randomUUID?.() ||
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}`;

  const today = () => {
    const date = new Date();

    return [
      date.getFullYear(),
      String(date.getMonth() + 1)
        .padStart(2, "0"),
      String(date.getDate())
        .padStart(2, "0")
    ].join("-");
  };

  function node(tag, className = "", text = "") {
    const el = document.createElement(tag);

    el.className = className;
    el.textContent = text;

    return el;
  }

  function makeButton(text, className, action) {
    const btn = node(
      "button",
      className,
      text
    );

    btn.type = "button";

    btn.addEventListener(
      "click",
      action
    );

    return btn;
  }

  function setText(id, text) {
    const el = $(id);

    if (el) {
      el.textContent = text;
    }
  }

  function safeImage(url) {
    try {
      const parsed = new URL(url);

      return parsed.protocol === "https:"
        ? parsed.href
        : "";
    } catch {
      return "";
    }
  }

  /* ============================================
     ESTADO DE LA APLICACIÓN
  ============================================ */

  let meals = read(KEYS.meals, []);

  let products = read(KEYS.products, []);

  let waterEntries = read(KEYS.water, []);
  let stepsByDate = read(KEYS.steps, {});
  if (!stepsByDate || typeof stepsByDate !== "object" || Array.isArray(stepsByDate)) stepsByDate = {};

  let goal = read(KEYS.goal, {
    calories: 2000,
    protein: 120
  });

  if (!Array.isArray(meals)) {
    meals = [];
  }

  if (!Array.isArray(products)) {
    products = [];
  }

  if (!Array.isArray(waterEntries)) {
    waterEntries = [];
  }

  if (!goal || typeof goal !== "object") {
    goal = {
      calories: 2000,
      protein: 120,
      carbs: 250,
      fats: 67
    };
  }

  let selectedProduct = null;

  let mealProducts = [];

  let pendingImage = "";

  let scanner = null;

  let scannerStarting = false;

  let scanBusy = false;

  
  /* ============================================
     CONTROLES DE BÚSQUEDA
  ============================================ */

  const searchCounters = {
    instant: 0,
    meal: 0,
    main: 0
  };

  let instantTimer = null;

  /* ============================================
     VENTANAS MODALES
  ============================================ */

  function openModal(id) {
    const modal = $(id);

    if (!modal) return;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  function closeModal(id) {
    const modal = $(id);

    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    if (!document.querySelector(".modal.is-open")) {
      document.body.classList.remove("modal-open");
    }

    if (id === "mealModal") {
      stopScanner();
      stopVoiceRecognition();
    }
  }

  /* ============================================
     OPEN FOOD FACTS
     NORMALIZACIÓN DE PRODUCTOS
  ============================================ */

  function productLabel(product) {
    const name = String(
      product.name || ""
    ).trim();

    const brand = String(
      product.brand || ""
    ).trim();

    if (
      brand &&
      !normalize(name).includes(normalize(brand))
    ) {
      return `${name} - ${brand}`;
    }

    return name;
  }

  function productKey(product) {
    return product.barcode
      ? `code:${product.barcode}`
      : `name:${normalize(productLabel(product))}`;
  }

  function validNutrition(product) {
    return (
      nonnegative(product.kcal) &&
      nonnegative(product.protein)
    );
  }

  function fromOFF(raw) {
    if (!raw) return null;

    const n = raw.nutriments || {};

    const name = String(
      raw.product_name_es ||
      raw.product_name ||
      raw.generic_name_es ||
      ""
    ).trim();

    if (!name) return null;

    let kcal = null;

    if (nonnegative(n["energy-kcal_100g"])) {
      kcal = num(n["energy-kcal_100g"]);
    } else if (nonnegative(n.energy_100g)) {
      kcal = num(n.energy_100g) / 4.184;
    }

    const protein = nonnegative(n.proteins_100g)
      ? num(n.proteins_100g)
      : null;
    const carbs = nonnegative(n.carbohydrates_100g) ? num(n.carbohydrates_100g) : null;
    const fats = nonnegative(n.fat_100g) ? num(n.fat_100g) : null;

    const quantityUnit = String(
      raw.product_quantity_unit || ""
    ).toLowerCase();

    return {
      id: uid(),
      name,

      brand: String(raw.brands || "").trim(),

      barcode: String(raw.code || "").trim(),

      kcal,
      protein,
      carbs,
      fats,

      unit: ["ml", "cl", "l"].includes(quantityUnit)
        ? "ml"
        : "g",

      portion: 100,
      source: "openfoodfacts",

      image: safeImage(
        raw.image_front_url ||
        raw.image_url ||
        ""
      ),

      quantity: String(raw.quantity || ""),

      servingSize: String(raw.serving_size || ""),

      productQuantity: nonnegative(
        raw.product_quantity
      )
        ? num(raw.product_quantity)
        : null,

      unitWeight: null,

      countries: Array.isArray(raw.countries_tags)
        ? raw.countries_tags
        : []
    };
  }

  /* ============================================
     CONSULTAS A LA API
  ============================================ */

  async function fetchJSON(url) {
    const controller = new AbortController();

    const timeout = setTimeout(
      () => controller.abort(),
      15000
    );

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();

    } finally {
      clearTimeout(timeout);
    }
  }

  /* ============================================
     ELIMINAR PRODUCTOS DUPLICADOS
  ============================================ */

  function uniqueProducts(list) {
    const keys = new Set();

    return list.filter(product => {
      const key = productKey(product);

      if (keys.has(key)) {
        return false;
      }

      keys.add(key);
      return true;
    });
  }

  /* ============================================
     BUSCAR PRODUCTOS GUARDADOS
  ============================================ */

  function localSearch(query) {
    const terms = normalize(query)
      .split(" ")
      .filter(Boolean);

    return products.filter(product => {
      const text = normalize(
        `${product.name} ` +
        `${product.brand} ` +
        `${product.barcode}`
      );

      return terms.every(term =>
        text.includes(term)
      );
    });
  }

  /* ============================================
     BUSCADOR ONLINE DE ALIMENTOS
  ============================================ */

  async function searchOFF(query) {
    const terms = normalize(query)
      .split(" ")
      .filter(Boolean);

    if (!terms.length) {
      return [];
    }

    const urls = [];

    // Búsqueda por nombre del producto

    const textURL = new URL(
      `${API}/cgi/search.pl`
    );

    textURL.searchParams.set(
      "search_terms",
      query
    );

    textURL.searchParams.set(
      "search_simple",
      "1"
    );

    textURL.searchParams.set(
      "action",
      "process"
    );

    textURL.searchParams.set(
      "json",
      "1"
    );

    textURL.searchParams.set(
      "page_size",
      "100"
    );

    textURL.searchParams.set(
      "fields",
      OFF_FIELDS
    );

    urls.push(textURL.toString());

    // Búsquedas adicionales por marca

    const brandCandidates = new Set();

    terms.forEach(term => {
      if (term.length >= 3) {
        brandCandidates.add(term);
      }
    });

    for (let i = 0; i < terms.length - 1; i++) {
      brandCandidates.add(
        `${terms[i]} ${terms[i + 1]}`
      );
    }

    for (
      const brand of [...brandCandidates].slice(0, 4)
    ) {
      const url = new URL(
        `${API}/api/v2/search`
      );

      url.searchParams.set(
        "brands_tags",
        brand.replace(/\s+/g, "-")
      );

      url.searchParams.set(
        "page_size",
        "100"
      );

      url.searchParams.set(
        "fields",
        OFF_FIELDS
      );

      urls.push(url.toString());
    }

    // Consultar las fuentes

    const responses = await Promise.allSettled(
      urls.map(fetchJSON)
    );

    const fulfilled = responses.filter(
      result => result.status === "fulfilled"
    );

    if (!fulfilled.length) {
      throw new Error(
        "No se pudo consultar la base de datos."
      );
    }

    const remote = fulfilled.flatMap(
      result =>
        (result.value.products || [])
          .map(fromOFF)
          .filter(Boolean)
    );

    // Ordenar resultados por coincidencia

    const ranked = uniqueProducts(remote)
      .map(product => {
        const text = normalize(
          productLabel(product)
        );

        const matched = terms.filter(
          term => text.includes(term)
        ).length;

        const allMatch =
          matched === terms.length;

        let score = matched * 20;

        if (allMatch) {
          score += 100;
        }

        if (text.includes(normalize(query))) {
          score += 30;
        }

        if (validNutrition(product)) {
          score += 10;
        }

        if (product.image) {
          score += 5;
        }

        if (
          product.countries.includes("en:argentina")
        ) {
          score += 8;
        }

        return {
          product,
          score,
          allMatch
        };
      });

    return ranked
      .filter(result => result.allMatch)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map(result => result.product);
  }

  /* ============================================
     BUSCAR POR CÓDIGO DE BARRAS
  ============================================ */

  async function lookupBarcode(code) {
    const local = products.find(
      product => product.barcode === code
    );

    if (local) {
      return local;
    }

    const data = await fetchJSON(
      `${API}/api/v2/product/` +
      `${encodeURIComponent(code)}.json`
    );

    return data.status === 1
      ? fromOFF({
          ...data.product,
          code
        })
      : null;
  }

  
  /* ============================================
     IMÁGENES Y TARJETAS DE PRODUCTOS
  ============================================ */

  function productImage(product) {
    const box = node(
      "div",
      "product-image"
    );

    const url = safeImage(product.image);

    if (!url) {
      box.textContent = "▤";
      return box;
    }

    const image = document.createElement("img");

    image.src = url;
    image.alt = productLabel(product);
    image.loading = "lazy";

    image.onerror = () => {
      box.replaceChildren();
      box.textContent = "▤";
    };

    box.append(image);

    return box;
  }

  /* ============================================
     GUARDAR PRODUCTOS
  ============================================ */

  function storeProduct(product) {
    if (
      !product.name?.trim() ||
      !validNutrition(product)
    ) {
      return false;
    }

    const clean = {
      id: product.id || uid(),

      name: String(product.name).trim(),

      brand: String(
        product.brand || ""
      ).trim(),

      barcode: String(
        product.barcode || ""
      ).trim(),

      kcal: num(product.kcal),

      protein: num(product.protein),
      carbs: nonnegative(product.carbs) ? num(product.carbs) : null,
      fats: nonnegative(product.fats) ? num(product.fats) : null,

      unit: product.unit === "ml"
        ? "ml"
        : "g",

      portion: positive(product.portion)
        ? num(product.portion)
        : 100,

      source: product.source || "manual",

      image: safeImage(product.image),

      quantity: String(
        product.quantity || ""
      ),

      servingSize: String(
        product.servingSize || ""
      ),

      productQuantity: nonnegative(
        product.productQuantity
      )
        ? num(product.productQuantity)
        : null,

      unitWeight: positive(
        product.unitWeight
      )
        ? num(product.unitWeight)
        : null
    };

    const previous = products.slice();

    const index = products.findIndex(
      item =>
        productKey(item) === productKey(clean)
    );

    if (index >= 0) {
      clean.id = products[index].id;
      products[index] = clean;
    } else {
      products.push(clean);
    }

    if (!write(KEYS.products, products)) {
      products = previous;
      return false;
    }

    renderSavedProducts();

    return true;
  }

  /* ============================================
     CREAR TARJETA DE PRODUCTO
  ============================================ */

  function createProductCard(product) {
    const card = node(
      "article",
      "product-card"
    );

    const main = node(
      "div",
      "product-card-main"
    );

    const source = node(
      "span",
      "product-source",
      product.source === "openfoodfacts"
        ? "Open Food Facts"
        : "Mi catálogo"
    );

    const title = node(
      "h3",
      "",
      productLabel(product)
    );

    const info = node(
      "p",
      "",
      validNutrition(product)
        ? `${fmt(product.kcal)} kcal · ` +
          `${fmt(product.protein)} g ` +
          `proteínas por 100 ${product.unit}`
        : "Información nutricional incompleta"
    );

    main.append(
      productImage(product),
      source,
      title,
      info
    );

    const actions = node(
      "div",
      "product-card-actions"
    );

    if (validNutrition(product)) {
      actions.append(
        makeButton(
          "Seleccionar",
          "button button-primary",
          () => selectProduct(product)
        )
      );

      const alreadySaved = products.some(
        item =>
          productKey(item) === productKey(product)
      );

      if (!alreadySaved) {
        actions.append(
          makeButton(
            "Guardar",
            "button button-outline",
            () => {
              if (storeProduct(product)) {
                source.textContent = "Mi catálogo";
              }
            }
          )
        );
      }
    } else {
      actions.append(
        makeButton(
          "Completar datos",
          "button button-outline",
          () => openProductForm(
            product.barcode,
            product
          )
        )
      );
    }

    card.append(main, actions);

    return card;
  }

  /* ============================================
     MOSTRAR RESULTADOS DE BÚSQUEDA
  ============================================ */

  function renderProductResults(id, list) {
    const root = $(id);

    if (!root) return;

    root.replaceChildren();

    if (!list.length) {
      root.append(
        node(
          "p",
          "helper-text",
          "No se encontraron productos."
        )
      );

      return;
    }

    list.forEach(product => {
      root.append(
        createProductCard(product)
      );
    });
  }

  /* ============================================
     MOSTRAR PRODUCTOS GUARDADOS
  ============================================ */

  function renderSavedProducts() {
    const root = $("savedProductsList");

    if (!root) return;

    root.replaceChildren();

    if (!products.length) {
      root.append(
        node(
          "p",
          "helper-text",
          "Todavía no guardaste productos."
        )
      );

      return;
    }

    products
      .slice()
      .reverse()
      .forEach(product => {
        const card = createProductCard(product);

        const actions = card.querySelector(
          ".product-card-actions"
        );

        actions.append(
          makeButton(
            "Eliminar",
            "button button-outline",
            () => {
              const confirmed = confirm(
                `¿Eliminar ${productLabel(product)}?`
              );

              if (!confirmed) return;

              const previous = products.slice();

              products = products.filter(
                item => item.id !== product.id
              );

              if (
                !write(
                  KEYS.products,
                  products
                )
              ) {
                products = previous;
                return;
              }

              renderSavedProducts();
            }
          )
        );

        root.append(card);
      });
  }

  /* ============================================
     BÚSQUEDA MANUAL DE PRODUCTOS
  ============================================ */

  async function searchProducts(inMeal = false) {
    const inputId = inMeal
      ? "mealProductSearch"
      : "productSearch";

    const resultsId = inMeal
      ? "mealProductResults"
      : "productResults";

    const statusId = inMeal
      ? "mealProductSearchStatus"
      : "productSearchStatus";

    const kind = inMeal ? "meal" : "main";

    const input = $(inputId);
    if (!input) return;

    const query = input.value.trim();

    if (query.length < 2) {
      setText(
        statusId,
        "Escribí al menos dos caracteres."
      );
      return;
    }

    const sequence = ++searchCounters[kind];

    const local = localSearch(query);

    renderProductResults(resultsId, local);

    setText(
      statusId,
      "Buscando productos..."
    );

    try {
      const remote = await searchOFF(query);

      if (sequence !== searchCounters[kind]) {
        return;
      }

      const combined = uniqueProducts([
        ...local,
        ...remote
      ]);

      renderProductResults(
        resultsId,
        combined
      );

      setText(
        statusId,
        `${combined.length} productos encontrados.`
      );

    } catch (error) {
      console.error(error);

      if (sequence !== searchCounters[kind]) {
        return;
      }

      setText(
        statusId,
        local.length
          ? "Mostrando productos guardados. No se pudo completar la búsqueda online."
          : "No se pudo completar la búsqueda online."
      );
    }
  }

  /* ============================================
     SUGERENCIAS AUTOMÁTICAS
  ============================================ */

  function createInstantItem(product) {
    const item = makeButton(
      "",
      "instant-food-item",
      () => {
        // Evitar duplicar el alimento seleccionado
        // al guardar la comida.

        $("mealDescription").value = "";

        $("instantFoodResults")
          .replaceChildren();

        clearTimeout(instantTimer);

        ++searchCounters.instant;

        selectProduct(product);
        updatePreview();
      }
    );

    const imageBox = node(
      "div",
      "instant-food-image"
    );

    const url = safeImage(product.image);

    if (url) {
      const image = document.createElement("img");

      image.src = url;
      image.alt = productLabel(product);
      image.loading = "lazy";

      image.onerror = () => {
        imageBox.replaceChildren();
        imageBox.textContent = "▤";
      };

      imageBox.append(image);

    } else {
      imageBox.textContent = "▤";
    }

    const info = node(
      "div",
      "instant-food-info"
    );

    info.append(
      node(
        "strong",
        "",
        productLabel(product)
      ),

      node(
        "span",
        "",
        validNutrition(product)
          ? `${fmt(product.kcal)} kcal · ` +
            `${fmt(product.protein)} g proteína / 100 ${product.unit}`
          : "Datos nutricionales incompletos"
      )
    );

    item.append(
      imageBox,
      info,
      node(
        "span",
        "instant-food-add",
        "+"
      )
    );

    return item;
  }

  /* ============================================
     MOSTRAR SUGERENCIAS
  ============================================ */

  function renderInstantResults(list, message = "") {
    const root = $("instantFoodResults");

    if (!root) return;

    root.replaceChildren();

    if (message) {
      root.append(
        node(
          "p",
          "instant-food-loading",
          message
        )
      );
    }

    list.slice(0, 12).forEach(product => {
      root.append(
        createInstantItem(product)
      );
    });
  }

  /* ============================================
     CONSULTAR SUGERENCIAS ONLINE
  ============================================ */

  async function instantSearch(query) {
    const sequence = ++searchCounters.instant;

    const local = localSearch(query);

    renderInstantResults(
      local,
      "Buscando productos..."
    );

    try {
      const remote = await searchOFF(query);

      if (sequence !== searchCounters.instant) {
        return;
      }

      const results = uniqueProducts([
        ...local,
        ...remote
      ]);

      renderInstantResults(
        results,
        results.length
          ? ""
          : "No encontramos productos. Probá otra marca o nombre."
      );

    } catch (error) {
      console.error(error);

      if (sequence !== searchCounters.instant) {
        return;
      }

      renderInstantResults(
        local,
        local.length
          ? "Mostrando productos guardados."
          : "No se pudo consultar Open Food Facts."
      );
    }
  }

  /* ============================================
     DETECTAR LO QUE ESCRIBE EL USUARIO
  ============================================ */

  function handleInstantInput() {
    clearTimeout(instantTimer);

    ++searchCounters.instant;

    const input = $("mealDescription");

    if (!input) return;

    const text = input.value.trim();

    updatePreview();

    if (text.length < 3) {
      $("instantFoodResults")
        ?.replaceChildren();

      return;
    }

    instantTimer = setTimeout(
      () => instantSearch(text),
      450
    );
  }

  /* ============================================
     SELECCIÓN DE PRODUCTOS
  ============================================ */

  function selectProduct(product) {
    if (!product) return;

    if (!validNutrition(product)) {
      openProductForm(
        product.barcode || "",
        product
      );
      return;
    }

    selectedProduct = product;

    const panel = $("selectedProductPanel");

    if (panel) {
      panel.hidden = false;
    }

    setText(
      "selectedProductName",
      productLabel(product)
    );

    const amountInput = $("selectedProductAmount");

    if (amountInput) {
      const defaultAmount = positive(product.portion)
        ? num(product.portion)
        : 100;

      amountInput.value = defaultAmount;

      amountInput.min = "0.1";
      amountInput.step = "any";

      const label = document.querySelector(
        'label[for="selectedProductAmount"]'
      );

      if (label) {
        label.textContent =
          `Cantidad consumida (${product.unit})`;
      }
    }

    updateSelectedProductNutrition();

    // Abrir el registro de comidas cuando
    // se selecciona un producto del catálogo.

    openModal("mealModal");

    updatePreview();
  }

  /* ============================================
     CÁLCULO NUTRICIONAL POR CANTIDAD
  ============================================ */

  function calculateProductNutrition(
    product,
    amount
  ) {
    if (
      !product ||
      !validNutrition(product) ||
      !positive(amount)
    ) {
      return {
        calories: 0,
        protein: 0
      };
    }

    const factor = num(amount) / 100;

    return {
      calories: num(product.kcal) * factor,
      protein: num(product.protein) * factor,
      carbs: nonnegative(product.carbs) ? num(product.carbs) * factor : null,
      fats: nonnegative(product.fats) ? num(product.fats) * factor : null
    };
  }

  /* ============================================
     MOSTRAR CALORÍAS Y PROTEÍNAS
     DEL PRODUCTO SELECCIONADO
  ============================================ */

  function updateSelectedProductNutrition() {
    if (!selectedProduct) {
      setText(
        "selectedProductNutrition",
        ""
      );
      return;
    }

    const amountInput = $("selectedProductAmount");

    const amount = num(
      amountInput?.value
    );

    if (!positive(amount)) {
      setText(
        "selectedProductNutrition",
        "Ingresá una cantidad mayor a cero."
      );
      return;
    }

    const nutrition = calculateProductNutrition(
      selectedProduct,
      amount
    );

    setText(
      "selectedProductNutrition",
      `${fmt(amount)} ${selectedProduct.unit} · ` +
      `${fmt(nutrition.calories)} kcal · ` +
      `${fmt(nutrition.protein)} g de proteínas`
    );
  }

  /* ============================================
     AGREGAR PRODUCTO A LA COMIDA
  ============================================ */

  function addSelectedProductToMeal() {
    if (!selectedProduct) {
      return;
    }

    const amountInput = $("selectedProductAmount");

    const amount = num(
      amountInput?.value
    );

    if (!positive(amount)) {
      setText(
        "mealError",
        "Ingresá una cantidad válida."
      );
      return;
    }

    const nutrition = calculateProductNutrition(
      selectedProduct,
      amount
    );

    mealProducts.push({
      id: uid(),

      productId: selectedProduct.id,

      name: productLabel(selectedProduct),

      amount,

      unit: selectedProduct.unit,

      calories: nutrition.calories,

      protein: nutrition.protein,
      carbs: nutrition.carbs,
      fats: nutrition.fats
    });

    selectedProduct = null;

    const panel = $("selectedProductPanel");

    if (panel) {
      panel.hidden = true;
    }

    const description = $("mealDescription");

    if (description) {
      description.value = "";
    }

    $("instantFoodResults")?.replaceChildren();

    setText("mealError", "");

    updatePreview();
  }

  /* ============================================
     TOTALES DE PRODUCTOS AGREGADOS
  ============================================ */

  function calculateMealProducts() {
    return mealProducts.reduce(
      (total, item) => {
        total.calories += Number(
          item.calories || 0
        );

        total.protein += Number(item.protein || 0);
        if (nonnegative(item.carbs)) { total.carbs += num(item.carbs); total.carbCount++; }
        if (nonnegative(item.fats)) { total.fats += num(item.fats); total.fatCount++; }
        return total;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0, fats: 0, carbCount: 0, fatCount: 0
      }
    );
  }

  /* ============================================
     REINICIAR PRODUCTOS DE LA COMIDA
  ============================================ */

  function resetMealProducts() {
    mealProducts = [];

    selectedProduct = null;

    const panel = $("selectedProductPanel");

    if (panel) {
      panel.hidden = true;
    }

    const amountInput = $("selectedProductAmount");

    if (amountInput) {
      amountInput.value = 100;
    }

    setText(
      "selectedProductNutrition",
      ""
    );

    $("instantFoodResults")?.replaceChildren();

    updatePreview();
  }

  /* ============================================
     RESUMEN NUTRICIONAL DE LA COMIDA
  ============================================ */

  function updatePreview() {
    const preview = $("estimatePreview");

    if (!preview) return;

    const totals = calculateMealProducts();

    let calories = totals.calories;
    let protein = totals.protein;

    // Si hay un producto seleccionado pero todavía
    // no fue agregado, mostrar su aporte estimado.

    if (selectedProduct) {
      const amount = num(
        $("selectedProductAmount")?.value
      );

      if (positive(amount)) {
        const selectedNutrition =
          calculateProductNutrition(
            selectedProduct,
            amount
          );

        calories += selectedNutrition.calories;
        protein += selectedNutrition.protein;
      }
    }

    const hasProducts =
      mealProducts.length > 0 ||
      selectedProduct !== null;

    preview.hidden = !hasProducts;

    if (!hasProducts) return;

    setText(
      "previewCalories",
      `${fmt(calories)} kcal`
    );

    setText(
      "previewProtein",
      `${fmt(protein)} g`
    );

    const details = mealProducts.map(
      item =>
        `${item.name}: ${fmt(item.amount)} ${item.unit}`
    );

    if (selectedProduct) {
      details.push(
        `${productLabel(selectedProduct)} (sin agregar)`
      );
    }

    setText(
      "previewDetails",
      details.join(" · ")
    );

    updateSelectedProductNutrition();
  }

  /* ============================================
     GUARDAR COMIDA
  ============================================ */

  function saveMeal(event) {
    event.preventDefault();

    const type = $("mealType")?.value || "Colación";

    const description = String(
      $("mealDescription")?.value || ""
    ).trim();

    if (selectedProduct) {
      setText(
        "mealError",
        "Tenés un producto seleccionado. " +
        "Presioná 'Agregar alimento' antes de guardar."
      );
      return;
    }

    if (!mealProducts.length) {
      setText(
        "mealError",
        description
          ? "Seleccioná un alimento de las sugerencias " +
            "y agregá la cantidad consumida."
          : "Agregá al menos un alimento."
      );
      return;
    }

    const totals = calculateMealProducts();

    const meal = {
      id: uid(),

      date: today(),

      timestamp: new Date().toISOString(),

      type,

      description: mealProducts
        .map(item => item.name)
        .join(", "),

      products: mealProducts.map(
        item => ({ ...item })
      ),

      calories: totals.calories,

      protein: totals.protein,
      carbs: totals.carbCount ? totals.carbs : null,
      fats: totals.fatCount ? totals.fats : null
    };

    const previous = meals.slice();

    meals.push(meal);

    if (!write(KEYS.meals, meals)) {
      meals = previous;
      return;
    }

    $("mealForm")?.reset();

    resetMealProducts();
    phraseDraft = [];
    const phraseRoot = $("phraseAnalysis");
    if (phraseRoot) { phraseRoot.hidden = true; phraseRoot.replaceChildren(); }

    setText("mealError", "");

    closeModal("mealModal");

    renderMeals();
    renderDashboard();
  }

  /* ============================================
     ELIMINAR COMIDA
  ============================================ */

  function deleteMeal(id) {
    const meal = meals.find(
      item => item.id === id
    );

    if (!meal) return;

    const confirmed = confirm(
      "¿Querés eliminar esta comida del registro?"
    );

    if (!confirmed) return;

    const previous = meals.slice();

    meals = meals.filter(
      item => item.id !== id
    );

    if (!write(KEYS.meals, meals)) {
      meals = previous;
      return;
    }

    renderMeals();
    renderDashboard();
  }

  /* ============================================
     COMIDAS REGISTRADAS HOY
  ============================================ */

  function getTodayMeals() {
    const currentDate = today();

    return meals.filter(
      meal => meal.date === currentDate
    );
  }

  /* ============================================
     CREAR TARJETA DE COMIDA
  ============================================ */

  function createMealCard(meal) {
    const card = node(
      "article",
      "meal-item"
    );

    const content = node(
      "div",
      "meal-item-content"
    );

    const heading = node(
      "div",
      "meal-item-heading"
    );

    const type = node(
      "span",
      "meal-type",
      meal.type || "Comida"
    );

    let time = "";

    if (meal.timestamp) {
      const date = new Date(meal.timestamp);

      if (!Number.isNaN(date.getTime())) {
        time = date.toLocaleTimeString(
          "es-AR",
          {
            hour: "2-digit",
            minute: "2-digit"
          }
        );
      }
    }

    const timeLabel = node(
      "span",
      "meal-time",
      time
    );

    heading.append(
      type,
      timeLabel
    );

    const description = node(
      "h3",
      "",
      meal.description || "Comida registrada"
    );

    const nutrition = node(
      "p",
      "meal-nutrition",
      `${fmt(meal.calories)} kcal · ` +
      `${fmt(meal.protein)} g de proteínas` +
      (nonnegative(meal.carbs) ? ` · ${fmt(meal.carbs)} g carb.` : "") +
      (nonnegative(meal.fats) ? ` · ${fmt(meal.fats)} g grasas` : "")
    );

    content.append(
      heading,
      description,
      nutrition
    );

    const actions = node(
      "div",
      "meal-item-actions"
    );

    actions.append(
      makeButton(
        "Eliminar",
        "button button-outline",
        () => deleteMeal(meal.id)
      )
    );

    card.append(
      content,
      actions
    );

    return card;
  }

  /* ============================================
     MOSTRAR HISTORIAL DE COMIDAS
  ============================================ */

  function renderMeals() {
    const root = $("mealList");

    if (!root) return;

    root.replaceChildren();

    const todayMeals = getTodayMeals();

    if (!todayMeals.length) {
      const empty = node(
        "div",
        "empty-state"
      );

      empty.append(
        node(
          "h3",
          "",
          "Todavía no registraste comidas hoy"
        ),

        node(
          "p",
          "",
          "Agregá tu primera comida para comenzar " +
          "a llevar un seguimiento de tu alimentación."
        )
      );

      root.append(empty);
      return;
    }

    todayMeals
      .slice()
      .reverse()
      .forEach(meal => {
        root.append(
          createMealCard(meal)
        );
      });
  }

  /* ============================================
     TOTALES NUTRICIONALES DEL DÍA
  ============================================ */

  function getDailyTotals() {
    const todayMeals = getTodayMeals();

    return todayMeals.reduce(
      (totals, meal) => {
        totals.calories += Number(
          meal.calories || 0
        );

        totals.protein += Number(meal.protein || 0);
        if (Array.isArray(meal.products)) {
          for (const item of meal.products) {
            totals.foodCount++;
            if (nonnegative(item.carbs)) { totals.carbs += num(item.carbs); totals.carbCount++; }
            if (nonnegative(item.fats)) { totals.fats += num(item.fats); totals.fatCount++; }
          }
        } else { totals.foodCount++; }
        totals.meals += 1;

        return totals;
      },
      {
        calories: 0,
        protein: 0,
        carbs: 0, fats: 0, carbCount: 0, fatCount: 0, foodCount: 0,
        meals: 0
      }
    );
  }

  /* ============================================
     DASHBOARD Y PROGRESO NUTRICIONAL
  ============================================ */

  function getCalorieGoal() {
    const value = num(goal.calories);

    return positive(value) ? value : 2000;
  }

  function getProteinGoal() {
    const value = num(goal.protein);

    return positive(value) ? value : 120;
  }

  /* ============================================
     PORCENTAJE DE PROGRESO
  ============================================ */

  function calculateProgress(consumed, target) {
    if (!positive(target)) return 0;

    return Math.max(
      0,
      Math.min(
        (Number(consumed) / Number(target)) * 100,
        100
      )
    );
  }

  /* ============================================
     ACTUALIZAR INDICADORES CIRCULARES
  ============================================ */

  function updateCircularProgress(
    element,
    consumed,
    target
  ) {
    if (!element) return;

    const percentage = calculateProgress(
      consumed,
      target
    );

    element.style.setProperty(
      "--progress",
      `${percentage}%`
    );

    element.style.setProperty(
      "--progress-value",
      percentage
    );

    element.dataset.progress = String(
      Math.round(percentage)
    );

    element.setAttribute(
      "role",
      "progressbar"
    );

    element.setAttribute(
      "aria-valuemin",
      "0"
    );

    element.setAttribute(
      "aria-valuemax",
      "100"
    );

    element.setAttribute(
      "aria-valuenow",
      String(Math.round(percentage))
    );

    // Compatible con anillos SVG.

    const circle = element.matches("circle")
      ? element
      : element.querySelector(
          ".progress-ring-circle, .ring-progress, circle[data-progress]"
        );

    if (circle) {
      const radius = num(
        circle.getAttribute("r")
      );

      if (positive(radius)) {
        const circumference =
          2 * Math.PI * radius;

        circle.style.strokeDasharray =
          String(circumference);

        circle.style.strokeDashoffset =
          String(
            circumference *
            (1 - percentage / 100)
          );
      }
    }

    // Compatible con anillos hechos con CSS.

    if (
      !circle &&
      element.classList.contains("progress-ring")
    ) {
      element.style.background =
        `conic-gradient(` +
        `var(--ring-color, #22c55e) ` +
        `${percentage}%, ` +
        `var(--ring-track, #e5e7eb) ` +
        `${percentage}% 100%)`;
    }
  }

  /* ============================================
     BUSCAR ANILLOS DEL DASHBOARD
  ============================================ */

  function findProgressRing(type) {
    const selectors = {
      calories: [
        "#calorieRing",
        "#caloriesRing",
        "#calorieProgressRing",
        '[data-ring="calories"]',
        '[data-progress-type="calories"]'
      ],

      protein: [
        "#proteinRing",
        "#proteinProgressRing",
        '[data-ring="protein"]',
        '[data-progress-type="protein"]'
      ],

      water: [
        "#waterRing",
        "#waterProgressRing",
        '[data-ring="water"]',
        '[data-progress-type="water"]'
      ]
    };

    for (const selector of selectors[type] || []) {
      const element = document.querySelector(
        selector
      );

      if (element) return element;
    }

    return null;
  }

  /* ============================================
     MOSTRAR FECHA ACTUAL
  ============================================ */

  function updateTodayLabel() {
    const date = new Date();

    const formatted = date.toLocaleDateString(
      "es-AR",
      {
        weekday: "long",
        day: "numeric",
        month: "long"
      }
    );

    setText(
      "todayLabel",
      formatted.charAt(0).toUpperCase() +
      formatted.slice(1)
    );
  }

  /* ============================================
     ACTUALIZAR DASHBOARD
  ============================================ */

  function renderDashboard() {
    const totals = getDailyTotals();

    const calorieGoal = getCalorieGoal();
    const proteinGoal = getProteinGoal();
    renderMacroRings(totals);

    const remainingCalories = Math.max(
      0,
      calorieGoal - totals.calories
    );

    const caloriePercentage = calculateProgress(
      totals.calories,
      calorieGoal
    );

    const proteinPercentage = calculateProgress(
      totals.protein,
      proteinGoal
    );

    /* ------------------------------------------
       TEXTOS DE CALORÍAS
    ------------------------------------------ */

    setText(
      "dailyConsumedCalories",
      fmt(totals.calories)
    );

    setText(
      "dailyTargetCalories",
      fmt(calorieGoal)
    );

    setText(
      "dailyRemainingCalories",
      fmt(remainingCalories)
    );

    setText(
      "progressGoalLabel",
      `${fmt(calorieGoal)} kcal`
    );

    /* ------------------------------------------
       TEXTOS DE PROTEÍNAS
    ------------------------------------------ */

    setText(
      "totalProtein",
      `${fmt(totals.protein)} g`
    );

    setText(
      "dailyProtein",
      fmt(totals.protein)
    );

    setText(
      "dailyTargetProtein",
      fmt(proteinGoal)
    );

    /* ------------------------------------------
       CANTIDAD DE COMIDAS
    ------------------------------------------ */

    setText(
      "totalMeals",
      String(totals.meals)
    );

    /* ------------------------------------------
       BARRA DE PROGRESO TRADICIONAL
    ------------------------------------------ */

    const progressBar = $("dailyProgress");

    if (progressBar) {
      progressBar.style.width =
        `${caloriePercentage}%`;

      progressBar.setAttribute(
        "aria-valuenow",
        String(Math.round(caloriePercentage))
      );
    }

    /* ------------------------------------------
       INDICADOR CIRCULAR DE CALORÍAS
    ------------------------------------------ */

    const calorieRing = findProgressRing(
      "calories"
    );

    updateCircularProgress(
      calorieRing,
      totals.calories,
      calorieGoal
    );

    /* ------------------------------------------
       INDICADOR CIRCULAR DE PROTEÍNAS
    ------------------------------------------ */

    const proteinRing = findProgressRing(
      "protein"
    );

    updateCircularProgress(
      proteinRing,
      totals.protein,
      proteinGoal
    );

    /* ------------------------------------------
       PORCENTAJES
    ------------------------------------------ */

    setText(
      "calorieProgressPercentage",
      `${Math.round(caloriePercentage)}%`
    );

    setText(
      "proteinProgressPercentage",
      `${Math.round(proteinPercentage)}%`
    );

    /* ------------------------------------------
       VALORES CENTRALES DE LOS ANILLOS
    ------------------------------------------ */

    setText(
      "calorieRingValue",
      fmt(totals.calories)
    );

    setText(
      "proteinRingValue",
      fmt(totals.protein)
    );

    /* ------------------------------------------
       METAS DE LOS ANILLOS
    ------------------------------------------ */

    setText(
      "calorieRingGoal",
      `de ${fmt(calorieGoal)} kcal`
    );

    setText(
      "proteinRingGoal",
      `de ${fmt(proteinGoal)} g`
    );

    updateTodayLabel();
  }

  /* ============================================
     CALORIETRACK - PARTE 8
     CONTROL DE HIDRATACIÓN
  ============================================ */

  const WATER_GOAL = 2000;

  /* ============================================
     CONVERTIR CANTIDADES A MILILITROS
  ============================================ */

  function waterToMl(amount, unit) {
    const value = num(amount);

    if (!positive(value)) {
      return 0;
    }

    switch (unit) {
      case "glass":
        return value * 250;

      case "l":
        return value * 1000;

      case "ml":
        return value;

      default:
        return 0;
    }
  }

  /* ============================================
     OBTENER AGUA CONSUMIDA HOY
  ============================================ */

  function getTodayWaterEntries() {
    const currentDate = today();

    return waterEntries.filter(
      entry => entry.date === currentDate
    );
  }

  function getDailyWaterTotal() {
    return getTodayWaterEntries().reduce(
      (total, entry) => {
        const amount = num(entry.ml);

        return total + (
          Number.isFinite(amount) && amount > 0
            ? amount
            : 0
        );
      },
      0
    );
  }

  /* ============================================
     FORMATEAR CANTIDAD DE AGUA
  ============================================ */

  function formatWater(ml) {
    if (ml >= 1000) {
      return `${fmt(ml / 1000)} L`;
    }

    return `${fmt(ml)} ml`;
  }

  /* ============================================
     CREAR PANEL DE HIDRATACIÓN
  ============================================ */

  function createWaterTracker() {
    const mount = $("waterTrackerMount");

    if (!mount) {
      renderWater();
      return;
    }

    mount.innerHTML = `
      <section class="water-card water-modern" aria-label="Seguimiento de hidratación">
        <div class="water-modern-top">
          <div><p class="eyebrow">HIDRATACIÓN DIARIA</p><h2>Tu consumo de agua</h2><p class="water-modern-caption">Cada vaso cuenta para tu bienestar.</p></div>
          <div class="water-modern-icon" aria-hidden="true">💧</div>
        </div>
        <div class="water-modern-stats">
          <div class="water-modern-stat"><strong id="waterTotal">0 ml</strong><span>Consumidos hoy</span></div>
          <div class="water-modern-stat"><strong id="waterRemaining">2.000 ml</strong><span>Para tu referencia</span></div>
        </div>
        <div class="water-modern-progress-head"><span>Progreso diario</span><strong id="waterProgressText">0%</strong></div>
        <div class="water-progress" role="progressbar" aria-label="Progreso de agua"><div id="waterProgress" class="water-progress-fill"></div></div>
        <p class="water-modern-equivalent" id="waterEquivalent">0 vasos de 250 ml</p>
        <div class="water-modern-quick-title">Agregar rápidamente</div>
        <div class="water-modern-quick">
          <button type="button" class="water-quick-btn" data-water-ml="150"><span>💧</span><strong>+150 ml</strong></button>
          <button type="button" class="water-quick-btn" data-water-ml="250"><span>🥛</span><strong>+250 ml</strong></button>
          <button type="button" class="water-quick-btn" data-water-ml="500"><span>💦</span><strong>+500 ml</strong></button>
        </div>
        <form id="waterForm" class="water-form water-modern-form">
          <div class="water-form-group"><label for="waterAmount">Otra cantidad</label><input id="waterAmount" type="number" min="0.01" step="any" value="1" required></div>
          <div class="water-form-group"><label for="waterUnit">Unidad</label><select id="waterUnit"><option value="glass">Vasos (250 ml)</option><option value="l">Litros</option><option value="ml">Mililitros</option></select></div>
          <button type="submit" class="button water-add-button">+ Agregar agua</button>
        </form>
        <p id="waterError" class="form-error" role="alert"></p>
        <div class="water-history"><div class="water-modern-history-title"><h3>Registros de hoy</h3><span>Historial</span></div><div id="waterHistoryList" class="water-history-list"></div></div>
      </section>
    `;

    $("waterForm").addEventListener(
      "submit",
      addWater
    );

    $("waterUnit").addEventListener(
      "change",
      () => {
        const unit = $("waterUnit").value;

        $("waterAmount").value =
          unit === "ml"
            ? 250
            : unit === "l"
              ? 0.25
              : 1;
      }
    );

    mount.querySelectorAll("[data-water-ml]").forEach(button => {
      button.addEventListener("click", () => {
        $("waterUnit").value = "ml";
        $("waterAmount").value = button.dataset.waterMl;
        $("waterForm").requestSubmit();
      });
    });

    renderWater();
  }

  /* ============================================
     AGREGAR AGUA AL REGISTRO
  ============================================ */

  function addWater(event) {
    event.preventDefault();

    const amount = num(
      $("waterAmount")?.value
    );

    const unit = $("waterUnit")?.value;

    if (!positive(amount)) {
      setText(
        "waterError",
        "Ingresá una cantidad válida."
      );
      return;
    }

    const ml = waterToMl(amount, unit);

    if (!positive(ml) || ml > 10000) {
      setText(
        "waterError",
        "Ingresá una cantidad válida de hasta 10 litros."
      );
      return;
    }

    const entry = {
      id: uid(),
      date: today(),
      timestamp: new Date().toISOString(),
      amount,
      unit,
      ml
    };

    const previous = waterEntries.slice();

    waterEntries.push(entry);

    if (!write(KEYS.water, waterEntries)) {
      waterEntries = previous;
      return;
    }

    setText("waterError", "");

    renderWater();
  }

  /* ============================================
     ELIMINAR UN REGISTRO DE AGUA
  ============================================ */

  function deleteWaterEntry(id) {
    const previous = waterEntries.slice();

    waterEntries = waterEntries.filter(
      entry => entry.id !== id
    );

    if (!write(KEYS.water, waterEntries)) {
      waterEntries = previous;
      return;
    }

    renderWater();
  }

  /* ============================================
     CREAR TARJETA DE REGISTRO DE AGUA
  ============================================ */

  function createWaterEntryCard(entry) {
    const item = node(
      "div",
      "water-history-item"
    );

    const details = node("div");

    const amountLabel = node(
      "strong",
      "",
      formatWater(num(entry.ml) || 0)
    );

    let original = "";

    if (entry.unit === "glass") {
      original = `${fmt(entry.amount)} vaso(s)`;
    } else if (entry.unit === "l") {
      original = `${fmt(entry.amount)} litro(s)`;
    } else {
      original = `${fmt(entry.amount)} ml`;
    }

    const description = node(
      "span",
      "",
      ` · ${original}`
    );

    details.append(
      amountLabel,
      description
    );

    const removeButton = makeButton(
      "Eliminar",
      "water-delete",
      () => deleteWaterEntry(entry.id)
    );

    item.append(
      details,
      removeButton
    );

    return item;
  }

  /* ============================================
     ACTUALIZAR DASHBOARD DE AGUA
  ============================================ */

  function renderWater() {
    const entries = getTodayWaterEntries();

    const total = getDailyWaterTotal();

    const glasses = total / 250;

    const percentage = calculateProgress(
      total,
      WATER_GOAL
    );

    const realPercentage =
      (total / WATER_GOAL) * 100;

    /* ------------------------------------------
       RESUMEN DE HIDRATACIÓN
    ------------------------------------------ */

    setText(
      "waterTotal",
      formatWater(total)
    );

    setText(
      "waterEquivalent",
      `${fmt(glasses)} vasos de 250 ml`
    );

    setText("waterRemaining", formatWater(Math.max(0, WATER_GOAL - total)));

    /* ------------------------------------------
       INDICADOR CIRCULAR
    ------------------------------------------ */

    const ring = findProgressRing("water");

    updateCircularProgress(
      ring,
      total,
      WATER_GOAL
    );

    setText(
      "waterRingValue",
      formatWater(total)
    );

    setText(
      "waterRingGoal",
      "de 2 L"
    );

    setText(
      "waterProgressPercentage",
      `${Math.round(realPercentage)}%`
    );

    // Compatibilidad con identificadores
    // alternativos del dashboard.

    const waterCircle = $("waterCircle");

    if (waterCircle && waterCircle !== ring) {
      updateCircularProgress(
        waterCircle,
        total,
        WATER_GOAL
      );
    }

    setText(
      "waterCircleTotal",
      formatWater(total)
    );

    setText(
      "waterCirclePercent",
      `${Math.round(realPercentage)}%`
    );

    /* ------------------------------------------
       BARRA HORIZONTAL
    ------------------------------------------ */

    const progressBar = $("waterProgress");

    if (progressBar) {
      progressBar.style.width =
        `${percentage}%`;
    }

    setText(
      "waterProgressText",
      `${Math.round(realPercentage)}% de la referencia`
    );

    /* ------------------------------------------
       HISTORIAL DE AGUA
    ------------------------------------------ */

    const root = $("waterHistoryList");

    if (!root) return;

    root.replaceChildren();

    if (!entries.length) {
      root.append(
        node(
          "p",
          "helper-text",
          "Todavía no registraste agua hoy."
        )
      );

      return;
    }

    entries
      .slice()
      .reverse()
      .forEach(entry => {
        root.append(
          createWaterEntryCard(entry)
        );
      });
  }

  /* ============================================
     CALORIETRACK - PARTE 9
     PRODUCTOS PERSONALIZADOS
  ============================================ */

  /* ============================================
     CAMBIAR REFERENCIA NUTRICIONAL
  ============================================ */

  function updateReference() {
    const reference = $("newProductReference");
    const portionGroup = $("newProductPortionGroup");
    const portionInput = $("newProductPortionGrams");

    if (!reference || !portionGroup || !portionInput) {
      return;
    }

    const byPortion = reference.value === "portion";

    portionGroup.hidden = !byPortion;
    portionInput.required = byPortion;
  }

  /* ============================================
     ABRIR FORMULARIO DE PRODUCTO
  ============================================ */

  function openProductForm(
    barcode = "",
    product = null
  ) {
    const form = $("productForm");

    if (!form) {
      console.error(
        "No se encontró el formulario productForm."
      );
      return;
    }

    form.reset();

    const barcodeInput = $("newProductBarcode");
    const nameInput = $("newProductName");
    const brandInput = $("newProductBrand");
    const unitInput = $("newProductUnit");

    if (barcodeInput) {
      barcodeInput.value = barcode || "";
    }

    if (nameInput) {
      nameInput.value = product?.name || "";
    }

    if (brandInput) {
      brandInput.value = product?.brand || "";
    }

    if (unitInput) {
      unitInput.value = product?.unit || "g";
    }

    if (product && nonnegative(product.kcal)) {
      const caloriesInput = $("newProductCalories");

      if (caloriesInput) {
        caloriesInput.value = product.kcal;
      }
    }

    if (product && nonnegative(product.protein)) {
      const proteinInput = $("newProductProtein");

      if (proteinInput) {
        proteinInput.value = product.protein;
      }
    }

    pendingImage = safeImage(product?.image);
    if ($("newProductCarbs")) $("newProductCarbs").value = nonnegative(product?.carbs) ? product.carbs : "";
    if ($("newProductFats")) $("newProductFats").value = nonnegative(product?.fats) ? product.fats : "";

    updateReference();

    setText("productError", "");

    openModal("productModal");
  }

  /* ============================================
     GUARDAR PRODUCTO PERSONALIZADO
  ============================================ */

  function saveManualProduct(event) {
    event.preventDefault();

    const name = String(
      $("newProductName")?.value || ""
    ).trim();

    const brand = String(
      $("newProductBrand")?.value || ""
    ).trim();

    const barcode = String(
      $("newProductBarcode")?.value || ""
    ).trim();

    const calories = num(
      $("newProductCalories")?.value
    );

    const protein = num($("newProductProtein")?.value);
    const carbsRaw = $("newProductCarbs")?.value?.trim() || "";
    const fatsRaw = $("newProductFats")?.value?.trim() || "";
    const carbs = carbsRaw === "" ? null : num(carbsRaw);
    const fats = fatsRaw === "" ? null : num(fatsRaw);
    if ((carbs !== null && !nonnegative(carbs)) || (fats !== null && !nonnegative(fats))) {
      setText("productError", "Los carbohidratos y grasas deben ser números positivos o quedar vacíos."); return;
    }

    const byPortion =
      $("newProductReference")?.value === "portion";

    const portion = byPortion
      ? num($("newProductPortionGrams")?.value)
      : 100;

    /* ------------------------------------------
       VALIDAR INFORMACIÓN
    ------------------------------------------ */

    if (!name) {
      setText(
        "productError",
        "Ingresá el nombre del alimento."
      );
      return;
    }

    if (
      !nonnegative(calories) ||
      !nonnegative(protein)
    ) {
      setText(
        "productError",
        "Las calorías y proteínas deben ser números válidos."
      );
      return;
    }

    if (!positive(portion)) {
      setText(
        "productError",
        "Ingresá una porción mayor a cero."
      );
      return;
    }

    if (
      barcode &&
      !/^\d{8,14}$/.test(barcode)
    ) {
      setText(
        "productError",
        "El código de barras debe tener entre 8 y 14 dígitos."
      );
      return;
    }

    /* ------------------------------------------
       CONVERTIR VALORES A CADA 100 g O ml
    ------------------------------------------ */

    const caloriesPer100 =
      (calories * 100) / portion;

    const proteinPer100 =
      (protein * 100) / portion;

    const unit = $("newProductUnit")?.value === "ml"
      ? "ml"
      : "g";

    const product = {
      id: uid(),

      name,
      brand,
      barcode,

      kcal: caloriesPer100,
      protein: proteinPer100,
      carbs: carbs === null ? null : carbs * 100 / portion,
      fats: fats === null ? null : fats * 100 / portion,

      unit,

      portion,

      source: "manual",

      image: pendingImage,

      quantity: "",
      servingSize: "",

      unitWeight: byPortion
        ? portion
        : null
    };

    /* ------------------------------------------
       GUARDAR EN CATÁLOGO
    ------------------------------------------ */

    if (!storeProduct(product)) {
      setText(
        "productError",
        "No se pudo guardar el producto."
      );
      return;
    }

    closeModal("productModal");

    /* ------------------------------------------
       SELECCIONAR PRODUCTO SI ESTAMOS
       REGISTRANDO UNA COMIDA
    ------------------------------------------ */

    const mealModal = $("mealModal");

    if (
      mealModal &&
      mealModal.classList.contains("is-open")
    ) {
      selectProduct(product);
    }

    pendingImage = "";
  }

  /* ============================================
     CALORIETRACK - PARTE 10
     ESCÁNER DE CÓDIGOS DE BARRAS
  ============================================ */

  /* ============================================
     INICIAR ESCÁNER
  ============================================ */

  async function startScanner() {
    const section = $("scannerSection");
    const button = $("scanButton");

    if (!window.Html5Qrcode) {
      setText(
        "scannerStatus",
        "No se pudo cargar el escáner. Revisá la conexión a Internet."
      );

      if (section) {
        section.hidden = false;
      }

      return;
    }

    if (
      scannerStarting ||
      scanner?.isScanning
    ) {
      return;
    }

    scannerStarting = true;

    if (section) {
      section.hidden = false;
    }

    setText(
      "scannerStatus",
      "Solicitando acceso a la cámara..."
    );

    try {
      if (!scanner) {
        scanner = new Html5Qrcode(
          "reader"
        );
      }

      const cameras =
        await Html5Qrcode.getCameras();

      if (!cameras.length) {
        throw new Error(
          "No se encontró ninguna cámara disponible."
        );
      }

      // Priorizar la cámara trasera del celular.

      const camera = cameras.find(
        item =>
          /back|rear|trasera|environment/i
            .test(item.label)
      ) || cameras[0];

      await scanner.start(
        camera.id,
        {
          fps: 10,

          qrbox: {
            width: 250,
            height: 150
          }
        },

        onBarcodeScanned,

        () => {
          // Los intentos de lectura fallidos
          // son normales mientras se enfoca.
        }
      );

      if (button) {
        button.disabled = true;
      }

      setText(
        "scannerStatus",
        "Apuntá la cámara al código de barras del producto."
      );

    } catch (error) {
      console.error(
        "Error al iniciar el escáner:",
        error
      );

      setText(
        "scannerStatus",
        error.message ||
        "No se pudo iniciar la cámara. Revisá los permisos del navegador."
      );

    } finally {
      scannerStarting = false;
    }
  }

  /* ============================================
     DETENER ESCÁNER
  ============================================ */

  async function stopScanner() {
    const button = $("scanButton");

    if (button) {
      button.disabled = false;
    }

    if (scanner?.isScanning) {
      try {
        await scanner.stop();

      } catch (error) {
        console.warn(
          "No se pudo detener la cámara:",
          error
        );
      }
    }

    const section = $("scannerSection");

    if (section) {
      section.hidden = true;
    }
  }

  /* ============================================
     PROCESAR CÓDIGO DE BARRAS
  ============================================ */

  async function onBarcodeScanned(code) {
    if (scanBusy) return;

    scanBusy = true;

    try {
      await stopScanner();

      const box = $("scannedProduct");

      if (!box) {
        return;
      }

      box.hidden = false;

      box.replaceChildren(
        node(
          "p",
          "",
          "Buscando producto en Open Food Facts..."
        )
      );

      // Buscar primero en productos guardados
      // y después en la base de datos online.

      const product = await lookupBarcode(
        String(code).trim()
      );

      box.replaceChildren();

      /* ------------------------------------------
         PRODUCTO NO ENCONTRADO
      ------------------------------------------ */

      if (!product) {
        box.append(
          node(
            "p",
            "",
            "No encontramos este producto. Podés cargarlo manualmente."
          ),

          makeButton(
            "Crear producto",
            "button button-primary",
            () => openProductForm(code)
          )
        );

        return;
      }

      /* ------------------------------------------
         PRODUCTO ENCONTRADO
      ------------------------------------------ */

      const productName = node(
        "h3",
        "",
        productLabel(product)
      );

      box.append(productName);

      if (product.image) {
        box.append(
          productImage(product)
        );
      }

      if (validNutrition(product)) {
        box.append(
          node(
            "p",
            "",
            `${fmt(product.kcal)} kcal · ` +
            `${fmt(product.protein)} g proteínas ` +
            `por 100 ${product.unit}`
          ),

          makeButton(
            "Seleccionar producto",
            "button button-primary",
            () => selectProduct(product)
          )
        );

      } else {
        box.append(
          node(
            "p",
            "",
            "Encontramos el producto, pero faltan datos nutricionales."
          ),

          makeButton(
            "Completar información",
            "button button-primary",
            () => openProductForm(
              code,
              product
            )
          )
        );
      }

    } catch (error) {
      console.error(
        "Error al consultar el producto:",
        error
      );

      setText(
        "scannerStatus",
        "No se pudo consultar el producto. Intentá nuevamente."
      );

    } finally {
      scanBusy = false;
    }
  }

  /* ============================================
     CALORIETRACK - PARTE 11
     OBJETIVOS NUTRICIONALES
  ============================================ */

  /* ============================================
     MOSTRAR OBJETIVOS GUARDADOS
  ============================================ */

  function renderGoals() {
    const calories = getCalorieGoal();
    const protein = getProteinGoal();

    const calorieInput = $("goalCalories");
    const proteinInput = $("goalProtein");
    const carbInput = $("goalCarbs");
    const fatInput = $("goalFats");
    if (carbInput) carbInput.value = positive(goal.carbs) ? goal.carbs : Math.round(getCalorieGoal() * .5 / 4);
    if (fatInput) fatInput.value = positive(goal.fats) ? goal.fats : Math.round(getCalorieGoal() * .3 / 9);

    if (calorieInput) {
      calorieInput.value = calories;
    }

    if (proteinInput) {
      proteinInput.value = protein;
    }

    setText(
      "currentCalorieGoal",
      `${fmt(calories)} kcal`
    );

    setText(
      "currentProteinGoal",
      `${fmt(protein)} g`
    );

    setText(
      "goalCaloriesLabel",
      `${fmt(calories)} kcal`
    );

    setText(
      "goalProteinLabel",
      `${fmt(protein)} g`
    );
  }

  /* ============================================
     GUARDAR OBJETIVOS
  ============================================ */

  function saveGoals(event) {
    if (event) {
      event.preventDefault();
    }

    const calories = num(
      $("goalCalories")?.value
    );

    const protein = num($("goalProtein")?.value);
    const carbs = num($("goalCarbs")?.value);
    const fats = num($("goalFats")?.value);
    if (!positive(carbs) || carbs > 1500 || !positive(fats) || fats > 500) {
      setText("goalError", "Ingresá metas válidas de carbohidratos y grasas.");
      return;
    }

    /* ------------------------------------------
       VALIDACIONES
    ------------------------------------------ */

    if (
      !positive(calories) ||
      !positive(protein)
    ) {
      setText(
        "goalError",
        "Ingresá objetivos mayores a cero."
      );
      return;
    }

    if (
      calories < 500 ||
      calories > 10000
    ) {
      setText(
        "goalError",
        "Ingresá un objetivo calórico válido."
      );
      return;
    }

    if (
      protein < 1 ||
      protein > 500
    ) {
      setText(
        "goalError",
        "Ingresá un objetivo de proteínas válido."
      );
      return;
    }

    /* ------------------------------------------
       GUARDAR EN ALMACENAMIENTO LOCAL
    ------------------------------------------ */

    const previous = { ...goal };

    goal = {
      ...goal,
      calories,
      protein,
      carbs,
      fats,
      weight,
      height,
      age,
      sex,
      activity,
      goalType
    };

    if (!write(KEYS.goal, goal)) {
      goal = previous;

      setText(
        "goalError",
        "No se pudieron guardar los objetivos."
      );

      return;
    }

    /* ------------------------------------------
       ACTUALIZAR INTERFAZ
    ------------------------------------------ */

    setText("goalError", "");

    renderGoals();
    renderDashboard();

    setText(
      "goalSuccess",
      "¡Tus objetivos se guardaron correctamente!"
    );
  }

  /* ============================================
     RESTABLECER OBJETIVOS
  ============================================ */

  function resetGoals() {
    const confirmed = confirm(
      "¿Querés restablecer los objetivos predeterminados?"
    );

    if (!confirmed) return;

    const previous = { ...goal };

    goal = {
      ...goal,
      calories: 2000,
      protein: 120
    };

    if (!write(KEYS.goal, goal)) {
      goal = previous;
      return;
    }

    setText("goalError", "");

    setText(
      "goalSuccess",
      "Objetivos restablecidos correctamente."
    );

    renderGoals();
    renderDashboard();
  }

  /* ============================================
     MOSTRAR CALORÍAS RESTANTES
  ============================================ */

  function updateRemainingCalories() {
    const totals = getDailyTotals();

    const target = getCalorieGoal();

    const remaining = Math.max(
      0,
      target - totals.calories
    );

    const exceeded = Math.max(
      0,
      totals.calories - target
    );

    setText(
      "remainingCalories",
      `${fmt(remaining)} kcal`
    );

    setText(
      "remainingProtein",
      `${fmt(
        Math.max(
          0,
          getProteinGoal() - totals.protein
        )
      )} g`
    );

    const status = $("calorieGoalStatus");

    if (status) {
      if (exceeded > 0) {
        status.textContent =
          `Superaste tu objetivo por ${fmt(exceeded)} kcal.`;

        status.dataset.status = "exceeded";

      } else if (remaining === 0) {
        status.textContent =
          "Alcanzaste tu objetivo diario.";

        status.dataset.status = "completed";

      } else {
        status.textContent =
          `Te quedan ${fmt(remaining)} kcal para tu objetivo.`;

        status.dataset.status = "remaining";
      }
    }
  }

  /* ============================================
     RESUMEN GENERAL DE OBJETIVOS
  ============================================ */

  function updateGoalSummary() {
    const totals = getDailyTotals();

    const calorieGoal = getCalorieGoal();
    const proteinGoal = getProteinGoal();

    const caloriePercent =
      calorieGoal > 0
        ? (totals.calories / calorieGoal) * 100
        : 0;

    const proteinPercent =
      proteinGoal > 0
        ? (totals.protein / proteinGoal) * 100
        : 0;

    setText(
      "goalCaloriePercentage",
      `${Math.round(caloriePercent)}%`
    );

    setText(
      "goalProteinPercentage",
      `${Math.round(proteinPercent)}%`
    );

    updateRemainingCalories();
  }

  /* ============================================
     CALORIETRACK - PARTE 12
     INICIALIZACIÓN Y EVENTOS
  ============================================ */

  /* ============================================
     COMPATIBILIDAD CON LOS ANILLOS DEL HTML
  ============================================ */

  function refreshCircularDashboard() {
    const totals = getDailyTotals();

    const caloriesGoal = getCalorieGoal();
    const proteinGoal = getProteinGoal();

    const waterTotal = getDailyWaterTotal();

    const indicators = [
      {
        id: "calorieCircle",
        value: totals.calories,
        target: caloriesGoal,
        percentId: "caloriePercent"
      },
      {
        id: "proteinCircle",
        value: totals.protein,
        target: proteinGoal,
        percentId: "proteinPercent"
      },
      {
        id: "waterCircle",
        value: waterTotal,
        target: WATER_GOAL,
        percentId: "waterCirclePercent"
      }
    ];

    indicators.forEach(item => {
      const ring = $(item.id);

      const percentage = calculateProgress(
        item.value,
        item.target
      );

      if (ring) {
        ring.style.setProperty(
          "--progress",
          `${percentage}%`
        );

        ring.setAttribute(
          "role",
          "progressbar"
        );

        ring.setAttribute(
          "aria-valuemin",
          "0"
        );

        ring.setAttribute(
          "aria-valuemax",
          "100"
        );

        ring.setAttribute(
          "aria-valuenow",
          String(Math.round(percentage))
        );
      }

      setText(
        item.percentId,
        `${Math.round(percentage)}%`
      );
    });

    setText(
      "proteinGoalLabel",
      `Meta: ${fmt(proteinGoal)} g`
    );

    setText(
      "dailyRemainingCalories",
      `Te quedan ${fmt(
        Math.max(
          0,
          caloriesGoal - totals.calories
        )
      )} kcal.`
    );

    setText(
      "totalProtein",
      fmt(totals.protein)
    );

    setText(
      "waterCircleTotal",
      formatWater(waterTotal)
    );
  }

  /* ============================================
     ACTUALIZACIÓN GENERAL
  ============================================ */

  function refreshAll() {
    renderDashboard();
    renderMeals();
    renderWater();
    renderSavedProducts();
    updateGoalSummary();
    refreshCircularDashboard();
  }

  /* ============================================
     CONFIGURAR OBJETIVOS DESDE EL FORMULARIO
  ============================================ */

  function saveGoal(event) {
    event.preventDefault();

    const weight = num(
      $("goalWeight")?.value
    );

    const height = num(
      $("goalHeight")?.value
    );

    const age = num(
      $("goalAge")?.value
    );

    const sex = $("goalSex")?.value;

    const activity = $("goalActivity")?.value;

    const goalType = $("goalType")?.value;

    if (
      !positive(weight) ||
      !positive(height) ||
      !positive(age)
    ) {
      setText(
        "goalError",
        "Completá correctamente peso, altura y edad."
      );
      return;
    }

    if (
      weight < 20 ||
      weight > 400 ||
      height < 100 ||
      height > 250 ||
      age < 15 ||
      age > 110
    ) {
      setText(
        "goalError",
        "Revisá los valores ingresados."
      );
      return;
    }

    // Estimación de metabolismo basal
    // mediante Mifflin-St Jeor.

    const base =
      10 * weight +
      6.25 * height -
      5 * age;

    const bmr = base + (
      sex === "female" ? -161 : 5
    );

    const activityFactors = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    const numericActivity = Number(activity);
    const factor = Number.isFinite(numericActivity) && numericActivity >= 1.2 && numericActivity <= 1.9
      ? numericActivity
      : (activityFactors[activity] || 1.2);

    let calories = bmr * factor;

    if (
      goalType === "lose" ||
      goalType === "weight_loss" ||
      goalType === "deficit"
    ) {
      calories -= 300;
    }

    if (
      goalType === "gain" ||
      goalType === "muscle_gain" ||
      goalType === "surplus"
    ) {
      calories += 250;
    }

    calories = Math.round(calories);

    const protein = Math.round(weight * 1.6);
    const carbs = num($("goalCarbs")?.value);
    const fats = num($("goalFats")?.value);
    if (!positive(carbs) || carbs > 1500 || !positive(fats) || fats > 500) {
      setText("goalError", "Revisá las metas de carbohidratos y grasas."); return;
    }

    const previous = { ...goal };

    goal = {
      ...goal,
      calories,
      protein,
      carbs,
      fats,
      weight,
      height,
      age,
      sex,
      activity,
      goalType
    };

    if (!write(KEYS.goal, goal)) {
      goal = previous;
      return;
    }

    setText("goalError", "");
    const goalResultElement = $("goalResult");
    if (goalResultElement) goalResultElement.hidden = false;

    setText(
      "goalResult",
      `Objetivo estimado: ${fmt(calories)} kcal ` +
      `y ${fmt(protein)} g de proteínas por día.`
    );

    refreshAll();
  }

  /* ============================================
     CONECTAR BOTONES DE FORMA SEGURA
  ============================================ */

  function bindClick(id, callback) {
    const element = $(id);

    if (!element) return;

    element.addEventListener(
      "click",
      callback
    );
  }

  function bindSubmit(id, callback) {
    const element = $(id);

    if (!element) return;

    element.addEventListener(
      "submit",
      callback
    );
  }

  /* ============================================
     DICTADO DE COMIDAS POR VOZ
     API Web Speech (según navegador)
  ============================================ */

  let voiceRecognition = null;
  let voiceListening = false;

  function stopVoiceRecognition() {
    if (voiceRecognition && voiceListening) voiceRecognition.stop();
  }

  function initializeVoiceInput() {
    const button = $("voiceMealButton");
    const status = $("voiceMealStatus");
    const input = $("mealDescription");
    if (!button || !status || !input) return;

    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      button.disabled = true;
      status.textContent = "El dictado no está disponible en este navegador. Probá Chrome o Edge actualizado.";
      return;
    }

    const recognition = new Recognition();
    voiceRecognition = recognition;
    recognition.lang = "es-AR";
    // Una frase por pulsación. Los resultados provisionales se descartan
    // para evitar repeticiones en Chrome para Android.
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    let originalText = "";
    let capturedText = "";
    let receivedFinal = false;

    function normalizeVoiceText(text) {
      return String(text || "").toLocaleLowerCase("es-AR")
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
    }

    recognition.onstart = () => {
      voiceListening = true;
      button.classList.add("is-listening");
      button.setAttribute("aria-pressed", "true");
      button.textContent = "■ Detener dictado";
      status.textContent = "Escuchando una frase...";
    };

    recognition.onresult = event => {
      if (receivedFinal) return;
      const fragments = [];
      for (let i = 0; i < event.results.length; i++) {
        if (!event.results[i].isFinal) continue;
        const phrase = (event.results[i][0]?.transcript || "").trim();
        if (!phrase) continue;
        // Algunas implementaciones devuelven varias veces el mismo resultado.
        if (fragments.some(part => normalizeVoiceText(part) === normalizeVoiceText(phrase))) continue;
        fragments.push(phrase);
      }
      if (!fragments.length) return;
      const transcript = fragments.join(" ").trim();
      if (!transcript) return;
      receivedFinal = true;
      capturedText = transcript;
      const before = normalizeVoiceText(originalText);
      const spoken = normalizeVoiceText(transcript);
      input.value = before && (before === spoken || before.endsWith(" " + spoken))
        ? originalText
        : [originalText, transcript].filter(Boolean).join(" ").trim();
      input.dispatchEvent(new Event("input", { bubbles: true }));
      status.textContent = "Frase reconocida. Revisá el texto antes de agregar la comida.";
    };

    recognition.onerror = event => {
      const messages = {
        "not-allowed": "Permití el acceso al micrófono en el navegador.",
        "audio-capture": "No se detectó un micrófono disponible.",
        "no-speech": "No se detectó voz. Intentá nuevamente.",
        "network": "Error de conexión del reconocimiento de voz.",
        "service-not-allowed": "El servicio de voz no está permitido."
      };
      status.textContent = messages[event.error] || "No se pudo reconocer la voz.";
    };

    recognition.onend = () => {
      voiceListening = false;
      button.classList.remove("is-listening");
      button.setAttribute("aria-pressed", "false");
      button.textContent = "🎙 Dictar comida";
      if (receivedFinal && capturedText) {
        analyzeFullMealPhrase();
      } else if (status.textContent.startsWith("Escuchando")) {
        status.textContent = "No se reconoció ninguna frase. Intentá nuevamente.";
      }
    };

    button.addEventListener("click", () => {
      if (voiceListening) {
        recognition.stop();
        return;
      }
      originalText = input.value.trim();
      capturedText = "";
      receivedFinal = false;
      try {
        recognition.start();
      } catch (error) {
        console.error("No se pudo iniciar el dictado:", error);
        status.textContent = "No se pudo iniciar el micrófono. Intentá nuevamente.";
      }
    });
  }

  /* ============================================
     INICIALIZAR CALORIETRACK
  ============================================ */


  /* ============================================
     INTERPRETACIÓN LOCAL DE FRASES
     Valores aproximados por 100 g / ml.
     No sustituye etiquetas nutricionales.
  ============================================ */
  const PHRASE_FOODS = [
    ["cafe con leche", "Café con leche", 45, 3.1, 200, "ml"],
    ["café con leche", "Café con leche", 45, 3.1, 200, "ml"],
    ["mate cocido con leche", "Mate cocido con leche", 40, 2.8, 200, "ml"],
    ["queso crema", "Queso crema", 230, 5.5, 20, "g"],
    ["queso untable", "Queso untable", 230, 5.5, 20, "g"],
    ["pan lactal", "Pan lactal", 260, 9, 30, "g"],
    ["pan integral", "Pan integral", 250, 10, 35, "g"],
    ["leche descremada", "Leche descremada", 35, 3.4, 200, "ml"],
    ["leche entera", "Leche entera", 61, 3.2, 200, "ml"],
    ["carne picada", "Carne picada cocida", 250, 26, 100, "g"],
    ["pechuga de pollo", "Pechuga de pollo cocida", 165, 31, 150, "g"],
    ["pollo", "Pollo cocido", 165, 31, 150, "g"],
    ["arroz integral", "Arroz integral cocido", 111, 2.6, 150, "g"],
    ["arroz", "Arroz cocido", 130, 2.7, 150, "g"],
    ["fideos", "Fideos cocidos", 158, 5.8, 150, "g"],
    ["pasta", "Pasta cocida", 158, 5.8, 150, "g"],
    ["rapiditas integrales", "Tortilla integral", 290, 9, 40, "g"],
    ["rapiditas", "Tortilla de trigo", 310, 8, 40, "g"],
    ["tostadas", "Tostada de pan", 265, 9, 30, "g"],
    ["tostada", "Tostada de pan", 265, 9, 30, "g"],
    ["huevos", "Huevo", 143, 12.6, 50, "g"],
    ["huevo", "Huevo", 143, 12.6, 50, "g"],
    ["banana", "Banana", 89, 1.1, 120, "g"],
    ["manzana", "Manzana", 52, 0.3, 180, "g"],
    ["naranja", "Naranja", 47, 0.9, 140, "g"],
    ["yogur", "Yogur natural", 63, 3.5, 190, "g"],
    ["yogurt", "Yogur natural", 63, 3.5, 190, "g"],
    ["avena", "Avena seca", 389, 16.9, 40, "g"],
    ["atun", "Atún al natural", 116, 26, 120, "g"],
    ["atún", "Atún al natural", 116, 26, 120, "g"],
    ["lentejas", "Lentejas cocidas", 116, 9, 150, "g"],
    ["papa", "Papa cocida", 87, 1.9, 150, "g"],
    ["batata", "Batata cocida", 86, 1.6, 150, "g"],
    ["tomate", "Tomate", 18, 0.9, 100, "g"],
    ["lechuga", "Lechuga", 15, 1.4, 50, "g"],
    ["cebolla", "Cebolla", 40, 1.1, 80, "g"],
    ["zanahoria", "Zanahoria", 41, 0.9, 80, "g"],
    ["morron", "Morrón", 31, 1, 100, "g"],
    ["morrón", "Morrón", 31, 1, 100, "g"],
    ["palta", "Palta", 160, 2, 100, "g"],
    ["queso", "Queso semiduro", 350, 25, 30, "g"],
    ["aceite", "Aceite", 884, 0, 10, "g"],
    ["azucar", "Azúcar", 387, 0, 5, "g"],
    ["azúcar", "Azúcar", 387, 0, 5, "g"],
    ["manteca", "Manteca", 717, 0.9, 10, "g"],
    ["cafe", "Café negro", 1, 0.1, 200, "ml"],
    ["café", "Café negro", 1, 0.1, 200, "ml"],
    ["leche", "Leche", 61, 3.2, 200, "ml"],
    ["mate cocido", "Mate cocido", 1, 0, 200, "ml"],
    ["agua", "Agua", 0, 0, 250, "ml"]
  ].map(([alias, name, kcal, protein, serving, unit]) => ({
    alias: normalize(alias), name, kcal, protein, serving, unit
  })).sort((a,b) => b.alias.length - a.alias.length);

  const NUMBER_WORDS = {
    un:1, una:1, uno:1, dos:2, tres:3, cuatro:4, cinco:5,
    seis:6, siete:7, ocho:8, nueve:9, diez:10, media:0.5, medio:0.5
  };
  let phraseDraft = [];

  function interpretMealPhrase(text) {
    const cleaned = normalize(text)
      .replace(/\b(cafe con leche|mate cocido con leche)\b/g, m => m.replaceAll(" ", "_"))
      .replace(/\b(comi|comer|comimos|tome|tomo|desayune|merende|cene|almorce|prepare|me comi|me tome)\b/g, " ")
      .replace(/\b(y|con|mas|ademas|junto a)\b|[,;]+/g, "|")
      .replaceAll("_", " ");
    const parts = cleaned.split("|").map(x => x.trim()).filter(Boolean);
    const recognized = [], unknown = [];
    for (const part of parts) {
      const match = PHRASE_FOODS.find(food =>
        new RegExp(`(^|\\s)${food.alias.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(s)?(?=\\s|$)`).test(part)
      );
      if (!match) { unknown.push(part); continue; }
      const amountMatch = part.match(/(\d+(?:[.,]\d+)?)\s*(kg|gramos|gramo|gr|g|mililitros|ml|litros|litro|l)\b/);
      const numberMatch = part.match(/\b(\d+(?:[.,]\d+)?|un|una|uno|dos|tres|cuatro|cinco|seis|siete|ocho|nueve|diez|media|medio)\b/);
      let amount = match.serving;
      let assumed = true;
      if (amountMatch) {
        amount = Number(amountMatch[1].replace(",", "."));
        if (["kg","litros","litro","l"].includes(amountMatch[2])) amount *= 1000;
        assumed = false;
      } else if (numberMatch) {
        const count = NUMBER_WORDS[numberMatch[1]] ?? Number(numberMatch[1].replace(",", "."));
        if (Number.isFinite(count)) { amount = count * match.serving; assumed = false; }
      }
      recognized.push({id:uid(), name:match.name, amount, unit:match.unit,
        kcal:match.kcal, protein:match.protein, assumed});
    }
    return {recognized, unknown};
  }

  function renderPhraseAnalysis(unknown = []) {
    const root = $("phraseAnalysis");
    if (!root) return;
    root.hidden = false;
    root.replaceChildren();
    root.append(node("h3", "", "Ingredientes detectados"));
    root.append(node("p", "", "Estimaciones orientativas. Revisá los gramos o mililitros antes de registrar."));
    if (!phraseDraft.length) root.append(node("p", "phrase-warning", "No reconocimos alimentos de esta frase. Probá nombres más simples o usá el buscador."));
    phraseDraft.forEach(item => {
      const row = node("div", "phrase-item");
      const info = node("div");
      info.append(node("strong", "", item.name));
      const summary = node("small", "", "");
      const refresh = () => summary.textContent = `${fmt(item.kcal * item.amount/100)} kcal · ${fmt(item.protein * item.amount/100)} g proteína${item.assumed ? " · porción estimada" : ""}`;
      refresh(); info.append(summary);
      const amount = document.createElement("input");
      amount.type = "number"; amount.min = "0.1"; amount.step = "any";
      amount.value = String(item.amount);
      amount.setAttribute("aria-label", `Cantidad de ${item.name} en ${item.unit}`);
      amount.title = `Cantidad en ${item.unit}`;
      amount.addEventListener("input", () => {
        item.amount = num(amount.value);
        item.assumed = false;
        refresh(); updatePhraseTotal();
      });
      row.append(info, amount); root.append(row);
    });
    if (unknown.length) root.append(node("p", "phrase-warning", "Sin identificar: " + unknown.join(", ") + ". Agregalos manualmente si los consumiste."));
    const total = node("p", "phrase-total"); total.id = "phraseTotal"; root.append(total);
    if (phraseDraft.length) {
      const add = makeButton("＋ Agregar ingredientes detectados", "button button-primary", () => {
        if (phraseDraft.some(item => !positive(item.amount) || item.amount > 10000)) {
          setText("mealError", "Revisá las cantidades de los ingredientes."); return;
        }
        phraseDraft.forEach(item => mealProducts.push({
          id:uid(), name:item.name, productId:null, amount:item.amount, unit:item.unit,
          calories:item.kcal * item.amount / 100,
          protein:item.protein * item.amount / 100
        }));
        phraseDraft = []; root.hidden = true; root.replaceChildren();
        const description = $("mealDescription");
        if (description) description.value = "";
        $("instantFoodResults")?.replaceChildren();
        setText("mealError", ""); updatePreview();
      });
      root.append(add);
    }
    updatePhraseTotal();
  }

  function updatePhraseTotal() {
    const valid = phraseDraft.filter(item => positive(item.amount));
    setText("phraseTotal", `Total estimado: ${fmt(valid.reduce((s,i) => s+i.kcal*i.amount/100,0))} kcal · ${fmt(valid.reduce((s,i) => s+i.protein*i.amount/100,0))} g de proteínas`);
  }

  function analyzeFullMealPhrase() {
    const text = $("mealDescription")?.value.trim() || "";
    if (!text) { setText("mealError", "Primero escribí o dictá qué comiste."); return; }
    const parsed = interpretMealPhrase(text);
    phraseDraft = parsed.recognized;
    setText("mealError", "");
    renderPhraseAnalysis(parsed.unknown);
  }

  function initializePhraseAnalysis() {
    bindClick("analyzePhraseButton", analyzeFullMealPhrase);
    $("mealDescription")?.addEventListener("input", () => {
      // El análisis previo deja de ser válido si cambia la frase.
      phraseDraft = [];
      const root = $("phraseAnalysis");
      if (root) { root.hidden = true; root.replaceChildren(); }
    });
  }


  // Análisis avanzado mediante servidor local: la clave API nunca va en el navegador.
  let aiDraft = [];
  
  // Análisis de comidas mediante Gemini a través de Render.
 

  function showAIResult(data) {
    let root = $("aiAnalysis");

    if (!root) {
      root = node("div", "phrase-analysis");
      root.id = "aiAnalysis";

      const button = $("analyzeAIButton");
      if (!button || !button.parentElement) {
        throw new Error("No se encontró dónde mostrar el análisis.");
      }

      button.insertAdjacentElement("afterend", root);
    }

    if (!Array.isArray(data.ingredients) || !data.ingredients.length) {
      throw new Error("Gemini no devolvió ingredientes.");
    }

    aiDraft = data.ingredients.map(item => ({ ...item }));
    root.replaceChildren();
    root.hidden = false;

    root.append(
      node("h3", "", "Ingredientes identificados por IA"),
      node(
        "p",
        "helper-text",
        "Valores aproximados. Revisá las cantidades antes de guardar."
      )
    );

    if (data.notes) {
      root.append(node("p", "phrase-warning", data.notes));
    }

    // Crear el total ANTES de actualizarlo.
    const totalElement = node("p", "phrase-total", "");
    totalElement.id = "aiTotal";

    function updateTotal() {
      const totals = aiDraft.reduce(
        (acc, item) => {
          const amount = positive(item.amount) ? num(item.amount) : 0;
          const factor = amount / 100;

          acc.calories += num(item.kcal_per_100) * factor;
          acc.protein += num(item.protein_per_100) * factor;

          return acc;
        },
        { calories: 0, protein: 0 }
      );

      totalElement.textContent =
        `Total estimado: ${fmt(totals.calories)} kcal · ` +
        `${fmt(totals.protein)} g proteínas`;
    }

    aiDraft.forEach(item => {
      const row = node("div", "phrase-item");
      const info = node("div");

      info.append(
        node(
          "strong",
          "",
          item.name + (item.brand ? ` (${item.brand})` : "")
        )
      );

      const summary = node("small", "", "");

      const input = document.createElement("input");
      input.type = "number";
      input.min = "0.1";
      input.step = "any";
      input.value = String(item.amount);
      input.setAttribute(
        "aria-label",
        `Cantidad en ${item.unit} de ${item.name}`
      );

      function updateItem() {
        const amount = positive(item.amount) ? num(item.amount) : 0;
        const factor = amount / 100;

        summary.textContent =
          `${fmt(num(item.kcal_per_100) * factor)} kcal · ` +
          `${fmt(num(item.protein_per_100) * factor)} g proteínas` +
          (item.assumed ? " · cantidad estimada" : "");

        updateTotal();
      }

      input.addEventListener("input", () => {
        item.amount = num(input.value);
        item.assumed = false;
        updateItem();
      });

      info.append(summary);
      row.append(info, input);
      root.append(row);

      updateItem();
    });

    root.append(totalElement);
    updateTotal();

    root.append(
      makeButton(
        "＋ Agregar ingredientes al registro",
        "button button-primary",
        () => {
          if (
            aiDraft.some(item =>
              !positive(item.amount) ||
              num(item.amount) > 10000
            )
          ) {
            setText(
              "mealError",
              "Revisá las cantidades antes de agregarlas."
            );
            return;
          }

          const newProducts = aiDraft.map(item => {
            const factor = num(item.amount) / 100;

            return {
              id: uid(),
              productId: null,
              name: item.name +
                (item.brand ? ` (${item.brand})` : ""),
              amount: num(item.amount),
              unit: item.unit,
              calories: num(item.kcal_per_100) * factor,
              protein: num(item.protein_per_100) * factor,
              carbs: nonnegative(item.carbs_per_100)
                ? num(item.carbs_per_100) * factor
                : null,
              fats: nonnegative(item.fats_per_100)
                ? num(item.fats_per_100) * factor
                : null
            };
          });

          mealProducts.push(...newProducts);
          aiDraft = [];

          root.replaceChildren();
          root.hidden = true;

          const description = $("mealDescription");
          if (description) description.value = "";

          $("instantFoodResults")?.replaceChildren();
          setText("mealError", "");
          updatePreview();
        }
      )
    );
  }

  async function analyzeMealWithAI() {
    const description = $("mealDescription")?.value.trim();

    if (!description || description.length < 3) {
      setText("mealError", "Primero describí tu comida.");
      return;
    }

    if (description.length > 1200) {
      setText("mealError", "La descripción es demasiado larga.");
      return;
    }

    const button = $("analyzeAIButton");

    if (button) {
      button.disabled = true;
      button.textContent = "Analizando receta...";
    }

    setText("mealError", "");

    try {
      const response = await fetch(`${AI_API}/api/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ description })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || `Error del servidor: ${response.status}`
        );
      }

      if (!Array.isArray(data.ingredients) ||
          !data.ingredients.length) {
        throw new Error(
          "No se identificaron ingredientes. Probá con otra descripción."
        );
      }

      showAIResult(data);

    } catch (error) {
      console.error("Error al analizar comida:", error);

      setText(
        "mealError",
        error.message || "No se pudo analizar la comida."
      );

    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = "✨ Analizar con IA (marcas y recetas)";
      }
    }
  }

  // Macronutrientes: no inventar valores cuando la fuente no los informa.
  function renderMacroRings(totals = getDailyTotals()) {
    for (const item of [
      {key:"carbs",count:"carbCount",ring:"carbCircle",value:"totalCarbs",percent:"carbPercent",goal:"carbGoalLabel",ratio:.5,divisor:4},
      {key:"fats",count:"fatCount",ring:"fatCircle",value:"totalFats",percent:"fatPercent",goal:"fatGoalLabel",ratio:.3,divisor:9}
    ]) {
      const target = positive(goal[item.key]) ? num(goal[item.key]) : Math.round(getCalorieGoal() * item.ratio / item.divisor);
      const known = totals[item.count] > 0;
      const percentage = known ? calculateProgress(totals[item.key], target) : 0;
      const ring = $(item.ring);
      if (ring) { ring.style.setProperty("--progress", `${percentage}%`); ring.setAttribute("aria-label", `${item.key === 'carbs' ? 'Carbohidratos' : 'Grasas'}: ${known ? fmt(totals[item.key]) + ' gramos' : 'sin datos'}`); }
      setText(item.value, known ? fmt(totals[item.key]) : "—");
      setText(item.percent, known ? `${Math.round(percentage)}%` : "Sin datos");
      setText(item.goal, fmt(target));
    }
    const incomplete = totals.foodCount > 0 && (totals.carbCount < totals.foodCount || totals.fatCount < totals.foodCount);
    setText("macroDataNote", incomplete ? "Datos parciales: algunos alimentos no tienen carbohidratos o grasas informados. No se estiman automáticamente." : "Los carbohidratos y grasas se calculan a partir de los datos nutricionales disponibles.");
  }

  function renderSteps() {
    const value = stepsByDate[today()];
    const recorded = Number.isInteger(value) && value >= 0;
    setText("stepsResult", recorded ? `${fmt(value)} pasos registrados hoy` : "Todavía no registraste pasos hoy.");
    if ($("stepsInput")) $("stepsInput").value = recorded ? String(value) : "";
    if ($("stepsClear")) $("stepsClear").hidden = !recorded;
  }
  function initializeSteps() {
    $("stepsForm")?.addEventListener("submit", event => {
      event.preventDefault();
      const raw = $("stepsInput")?.value?.trim() || "";
      const value = Number(raw);
      if (raw === "" || !Number.isInteger(value) || value < 0 || value > 100000) {
        setText("stepsResult", "Ingresá un número entero entre 0 y 100.000."); return;
      }
      const previous = {...stepsByDate};
      stepsByDate[today()] = value;
      if (!write(KEYS.steps, stepsByDate)) { stepsByDate = previous; return; }
      renderSteps();
      document.dispatchEvent(new Event("calorietrack:steps-updated"));
    });
    $("stepsClear")?.addEventListener("click", () => {
      const previous = {...stepsByDate};
      delete stepsByDate[today()];
      if (!write(KEYS.steps, stepsByDate)) { stepsByDate = previous; return; }
      renderSteps(); document.dispatchEvent(new Event("calorietrack:steps-updated"));
    });
    document.addEventListener("visibilitychange", () => { if (!document.hidden) renderSteps(); });
    renderSteps();
  }

  function initialize() {
    initializeSteps();
    /* ------------------------------------------
       ABRIR FORMULARIOS
    ------------------------------------------ */

    bindClick(
      "openMealModal",
      () => openModal("mealModal")
    );

    bindClick(
      "dashboardAddMeal",
      () => openModal("mealModal")
    );

    bindClick(
      "openGoalModal",
      () => {
        for (const [id, field] of Object.entries({
          goalWeight: "weight", goalHeight: "height", goalAge: "age",
          goalSex: "sex", goalActivity: "activity", goalType: "goalType"
        })) {
          const input = $(id);
          if (input && goal[field] !== undefined && goal[field] !== null) {
            input.value = String(goal[field]);
          }
        }
        openModal("goalModal");
      }
    );

    bindClick(
      "openProductModal",
      () => openProductForm()
    );

    /* ------------------------------------------
       CERRAR MODALES
    ------------------------------------------ */

   /* ============================================
   CERRAR VENTANAS EMERGENTES
============================================ */

document.addEventListener("click", event => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const closeButton = target.closest(
        '[data-close], [data-close-modal], .modal-close, .close-modal, .close-btn, .btn-close'
      );

      if (closeButton) {
        const modal = closeButton.closest(".modal");
        if (modal) {
          event.preventDefault();
          closeModal(modal.id);
        }
        return;
      }

      // Cerrar al pulsar el fondo oscuro del modal.
      const backdrop = target.closest(".modal-backdrop");
      if (backdrop) {
        const modal = backdrop.closest(".modal");
        if (modal) closeModal(modal.id);
      }
    });

    document.querySelectorAll(
      ".modal"
    ).forEach(modal => {
      modal.addEventListener(
        "click",
        event => {
          if (event.target === modal) {
            closeModal(modal.id);
          }
        }
      );
    });

    document.addEventListener(
      "keydown",
      event => {
        if (event.key !== "Escape") return;

        [
          "mealModal",
          "goalModal",
          "productModal"
        ].forEach(closeModal);
      }
    );

    /* ------------------------------------------
       BUSCADORES
    ------------------------------------------ */

    bindClick(
      "searchProductButton",
      () => searchProducts(false)
    );

    bindClick(
      "mealProductSearchButton",
      () => searchProducts(true)
    );

    const productSearch = $("productSearch");

    if (productSearch) {
      productSearch.addEventListener(
        "keydown",
        event => {
          if (event.key === "Enter") {
            event.preventDefault();
            searchProducts(false);
          }
        }
      );
    }

    const mealSearch = $("mealProductSearch");

    if (mealSearch) {
      mealSearch.addEventListener(
        "keydown",
        event => {
          if (event.key === "Enter") {
            event.preventDefault();
            searchProducts(true);
          }
        }
      );
    }

    initializeVoiceInput();
    initializePhraseAnalysis();
    bindClick("analyzeAIButton", analyzeMealWithAI);

    /* ------------------------------------------
       SUGERENCIAS DE ALIMENTOS
    ------------------------------------------ */

    const mealDescription = $("mealDescription");

    if (mealDescription) {
      mealDescription.addEventListener(
        "input",
        handleInstantInput
      );
    }

    /* ------------------------------------------
       PRODUCTO SELECCIONADO
    ------------------------------------------ */

    const selectedAmount = $(
      "selectedProductAmount"
    );

    if (selectedAmount) {
      selectedAmount.addEventListener(
        "input",
        () => {
          updateSelectedProductNutrition();
          updatePreview();
        }
      );
    }

    bindClick(
      "addSelectedProduct",
      addSelectedProductToMeal
    );

    /* ------------------------------------------
       FORMULARIOS
    ------------------------------------------ */

    bindSubmit(
      "mealForm",
      event => {
        saveMeal(event);
        refreshCircularDashboard();
      }
    );

    bindSubmit(
      "productForm",
      saveManualProduct
    );

    bindSubmit(
      "goalForm",
      event => {
        saveGoal(event);
        refreshCircularDashboard();
      }
    );

    const reference = $("newProductReference");

    if (reference) {
      reference.addEventListener(
        "change",
        updateReference
      );
    }

    /* ------------------------------------------
       ESCÁNER
    ------------------------------------------ */

    bindClick(
      "scanButton",
      startScanner
    );

    bindClick(
      "stopScanner",
      stopScanner
    );

    /* ------------------------------------------
       SEGUIMIENTO DE AGUA
    ------------------------------------------ */

    createWaterTracker();

    /* ------------------------------------------
       MOSTRAR DATOS GUARDADOS
    ------------------------------------------ */

    updateReference();

    refreshAll();

    console.log(
      "CalorieTrack: inicialización completada."
    );
  }

  /* ============================================
     INICIAR LA APLICACIÓN
  ============================================ */

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initialize,
      { once: true }
    );
  } else {
    initialize();
  }

})();
