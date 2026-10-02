// ==========================================
// ESCÁNER DE PRODUCTOS
// ==========================================

const scanButton = document.getElementById("scanButton");
const scannerContainer = document.getElementById("scannerContainer");
const scannerStatus = document.getElementById("scannerStatus");

const scannedProductContainer =
    document.getElementById("scannedProductContainer");

const scannedProductName =
    document.getElementById("scannedProductName");

const scannedProductBrand =
    document.getElementById("scannedProductBrand");

const scannedProductCalories =
    document.getElementById("scannedProductCalories");

const scannedProductProtein =
    document.getElementById("scannedProductProtein");

const productAmount =
    document.getElementById("productAmount");

const productUnit =
    document.getElementById("productUnit");

const productConversionInfo =
    document.getElementById("productConversionInfo");

const scannedProductResult =
    document.getElementById("scannedProductResult");

const useScannedProduct =
    document.getElementById("useScannedProduct");

let html5QrCode = null;
let scannedProduct = null;


// ==========================================
// EQUIVALENCIAS DE PRODUCTOS
// ==========================================

function getProductUnitGrams(product, unit) {

    const texto = (
        (product.product_name || "") +
        " " +
        (product.brands || "") +
        " " +
        (product.categories || "")
    ).toLowerCase();


    // AVENA
    if (
        texto.includes("avena") ||
        texto.includes("oat")
    ) {

        if (unit === "tbsp") return 10;
        if (unit === "tsp") return 3.3;
        if (unit === "unit") return 40;
        if (unit === "portion") return 40;

    }


    // AZÚCAR
    if (
        texto.includes("azucar") ||
        texto.includes("azúcar") ||
        texto.includes("sugar")
    ) {

        if (unit === "tbsp") return 12;
        if (unit === "tsp") return 4;
        if (unit === "unit") return 100;
        if (unit === "portion") return 12;

    }


    // HARINA
    if (
        texto.includes("harina") ||
        texto.includes("flour")
    ) {

        if (unit === "tbsp") return 8;
        if (unit === "tsp") return 2.7;
        if (unit === "unit") return 100;
        if (unit === "portion") return 30;

    }


    // ACEITE
    if (
        texto.includes("aceite") ||
        texto.includes("oil")
    ) {

        if (unit === "tbsp") return 13.5;
        if (unit === "tsp") return 4.5;
        if (unit === "unit") return 13.5;
        if (unit === "portion") return 13.5;

    }


    // LECHE
    if (
        texto.includes("leche") ||
        texto.includes("milk")
    ) {

        if (unit === "tbsp") return 15;
        if (unit === "tsp") return 5;
        if (unit === "unit") return 200;
        if (unit === "portion") return 200;

    }


    // YOGUR
    if (
        texto.includes("yogur") ||
        texto.includes("yogurt")
    ) {

        if (unit === "tbsp") return 15;
        if (unit === "tsp") return 5;
        if (unit === "unit") return 125;
        if (unit === "portion") return 125;

    }


    // GALLETITAS
    if (
        texto.includes("galleta") ||
        texto.includes("cookie")
    ) {

        if (unit === "unit") return 10;
        if (unit === "portion") return 30;

    }


    // DEFAULT
    // Si no conocemos el producto,
    // usamos equivalencias aproximadas.

    if (unit === "tbsp") return 10;
    if (unit === "tsp") return 3.3;
    if (unit === "unit") return 30;
    if (unit === "portion") return 30;

    return 1;
}


// ==========================================
// CALCULAR PRODUCTO ESCANEADO
// ==========================================

function calculateScannedProduct() {

    if (!scannedProduct) return;


    const cantidad =
        parseFloat(productAmount.value) || 0;

    const unidad =
        productUnit.value;


    const gramosPorUnidad =
        getProductUnitGrams(
            scannedProduct,
            unidad
        );


    let gramos = 0;

    if (unidad === "g") {

        gramos = cantidad;

    } else {

        gramos =
            cantidad *
            gramosPorUnidad;

    }


    const calorias100 =
        scannedProduct.nutriments?.["energy-kcal_100g"] || 0;

    const proteinas100 =
        scannedProduct.nutriments?.proteins_100g || 0;


    const calorias =
        (calorias100 * gramos) / 100;

    const proteinas =
        (proteinas100 * gramos) / 100;


    scannedProductResult.innerHTML = `
        <strong>${Math.round(calorias)} kcal</strong>
        <br>
        <span>${proteinas.toFixed(1)} g de proteína</span>
    `;


    if (unidad === "g") {

        productConversionInfo.textContent =
            `${gramos.toFixed(0)} g`;

    } else {

        productConversionInfo.textContent =
            `≈ ${gramos.toFixed(1)} g (${gramosPorUnidad} g por ${getUnitName(unidad)})`;

    }


    // Guardamos el cálculo
    window.scannedProductResult = {
        nombre: scannedProduct.product_name || "Producto",
        marca: scannedProduct.brands || "",
        gramos: gramos,
        calorias: calorias,
        proteinas: proteinas
    };
}


// ==========================================
// NOMBRE DE LA UNIDAD
// ==========================================

function getUnitName(unit) {

    if (unit === "tbsp") return "cucharada";
    if (unit === "tsp") return "cucharadita";
    if (unit === "unit") return "unidad";
    if (unit === "portion") return "porción";

    return "gramo";
}


// ==========================================
// CAMBIAR CANTIDAD / UNIDAD
// ==========================================

productAmount.addEventListener(
    "input",
    calculateScannedProduct
);

productUnit.addEventListener(
    "change",
    calculateScannedProduct
);


// ==========================================
// ESCANEAR
// ==========================================

scanButton.addEventListener("click", async () => {

    scannerContainer.style.display = "block";

    scannedProductContainer.style.display = "none";

    scannerStatus.textContent =
        "Solicitando acceso a la cámara...";


    try {

        html5QrCode =
            new Html5Qrcode("scannerVideo");


        await html5QrCode.start(

            {
                facingMode: "environment"
            },

            {
                fps: 10,

                qrbox: {
                    width: 300,
                    height: 150
                },

                formatsToSupport: [

                    Html5QrcodeSupportedFormats.EAN_13,

                    Html5QrcodeSupportedFormats.EAN_8,

                    Html5QrcodeSupportedFormats.UPC_A,

                    Html5QrcodeSupportedFormats.UPC_E

                ]
            },


            async (codigo) => {

                console.log(
                    "Código detectado:",
                    codigo
                );


                scannerStatus.textContent =
                    "Código detectado: " + codigo;


                try {

                    await html5QrCode.stop();

                } catch (e) {

                    console.log(e);

                }


                scannerContainer.style.display =
                    "none";


                scannerStatus.textContent =
                    "Buscando producto...";


                const producto =
                    await buscarProductoOpenFoodFacts(
                        codigo
                    );


                if (!producto) {

                    alert(
                        "No encontramos este producto en Open Food Facts."
                    );

                    return;
                }


                // Guardamos producto
                scannedProduct =
                    producto;


                // Mostrar información
                scannedProductName.textContent =
                    producto.product_name ||
                    "Producto sin nombre";


                scannedProductBrand.textContent =
                    producto.brands
                        ? "Marca: " + producto.brands
                        : "";


                scannedProductCalories.textContent =
                    producto.nutriments?.[
                        "energy-kcal_100g"
                    ] || 0;


                scannedProductProtein.textContent =
                    producto.nutriments?.[
                        "proteins_100g"
                    ] || 0;


                // Mostrar panel
                scannedProductContainer.style.display =
                    "block";


                // Valores iniciales
                productAmount.value = 1;

                productUnit.value = "g";


                calculateScannedProduct();

            },


            (errorMessage) => {

                // No hacemos nada con los errores
                // normales de lectura.

            }

        );


        scannerStatus.textContent =
            "📷 Cámara activa. Apuntá al código de barras.";


    } catch (error) {

        console.error(
            "Error iniciando cámara:",
            error
        );


        scannerStatus.textContent =
            "❌ No se pudo abrir la cámara: " +
            error.message;

    }

});


// ==========================================
// USAR PRODUCTO ESCANEADO
// ==========================================

useScannedProduct.addEventListener(
    "click",
    () => {

        if (!window.scannedProductResult) {

            alert(
                "Primero indicá cuánto consumiste."
            );

            return;
        }


        const producto =
            window.scannedProductResult;


        // Guardamos como comida actual
        window.currentMeal = {

            foods: [
                {
                    name: producto.nombre,
                    calories: producto.calorias,
                    protein: producto.proteinas
                }
            ],

            calories:
                producto.calorias,

            protein:
                producto.proteinas

        };


        // Mostrar el producto en el textarea
        document.getElementById(
            "mealDescription"
        ).value =
            `${producto.nombre} - ${producto.gramos.toFixed(0)} g`;


        // Mostrar resultado
        document.getElementById(
            "estimatedCalories"
        ).textContent =
            Math.round(producto.calorias);


        document.getElementById(
            "estimatedProtein"
        ).textContent =
            producto.proteinas.toFixed(1);


        // Mostrar sección de resultado
        const resultSection =
            document.getElementById(
                "resultSection"
            );

        if (resultSection) {

            resultSection.style.display =
                "block";

        }


        scannedProductContainer.style.display =
            "none";


        alert(
            "Producto agregado al análisis."
        );

    }
);
