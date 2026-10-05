// ======================================================
// CALORIETRACK FOODS AR
// Catálogo nutricional argentino
// ======================================================

"use strict";


/*
    IMPORTANTE

    Este archivo contiene DATOS.

    La lógica de reconocimiento y cálculo
    debe permanecer en script.js.

    calories100g / protein100g:
    información nutricional por 100 g o 100 ml.

    Si un dato todavía no fue verificado,
    debe permanecer en null.
*/


const CALORIETRACK_FOODS_AR_VERSION = "0.1.0";


const calorieTrackFoodsAR = [

    // ==================================================
    // FRUTAS
    // ==================================================


    {
    id: "mandarina",

    name: "Mandarina",

    category: "fruta",

    aliases: [
        "mandarina",
        "mandarinas"
    ],

    nutrition: {

        calories100g: 55.6,

        protein100g: 1.04,

        energyMethod:
            "Atwater Specific Factors",

        source: {

            database:
                "USDA FoodData Central",

            foodId:
                "2710832",

            dataset:
                "Foundation Foods",

            description:
                "Mandarin, seedless, peeled, raw",

            verified:
                true
        }
    },

    portions: {

        reference: {

            grams:
                140,

            description:
                "USDA reference measure",

            estimated:
                true,

            source: {

                database:
                    "USDA FoodData Central",

                foodId:
                    "2710832",

                verified:
                    true
            }
        },

        unit: {
    grams:
        88,
    description:
        "1 mandarina mediana - peso comestible estimado",
    estimated:
        true,
    source: {
        database:
            "USDA FoodData Central",
        dataset:
            "SR Legacy",
        foodId:
            "169105",
        measure:
            "1 medium fruit",
        verified:
            true
    }
}
    },

    locale:
        "AR"
},


    // ==================================================
    // INFUSIONES
    // ==================================================

    {
        id: "mateCocido",

        name: "Mate cocido",

        category: "infusion",

        aliases: [
            "mate cocido",
            "matecocido"
        ],

        nutrition: {
            calories100g: null,
            protein100g: null
        },

        portions: {
            cup: {
                ml: 200
            }
        },

        source: {
            name: null,
            id: null,
            verified: false
        },

        locale: "AR"
    },


    // ==================================================
    // PREPARACIONES ARGENTINAS
    // ==================================================

    {
        id: "empanadaCarne",

        name: "Empanada de carne",

        category: "preparacion",

        aliases: [
            "empanada de carne",
            "empanadas de carne"
        ],

        nutrition: {
            calories100g: null,
            protein100g: null
        },

        portions: {
            unit: {
                grams: null
            }
        },

        source: {
            name: null,
            id: null,
            verified: false
        },

        locale: "AR"
    },


    {
        id: "milanesaPollo",

        name: "Milanesa de pollo",

        category: "preparacion",

        aliases: [
            "milanesa de pollo",
            "milanesas de pollo",
            "mila de pollo"
        ],

        nutrition: {
            calories100g: null,
            protein100g: null
        },

        portions: {
            unit: {
                grams: null
            }
        },

        source: {
            name: null,
            id: null,
            verified: false
        },

        locale: "AR"
    },


    {
        id: "tortillaPapa",

        name: "Tortilla de papa",

        category: "preparacion",

        aliases: [
            "tortilla de papa",
            "tortilla de papas"
        ],

        nutrition: {
            calories100g: null,
            protein100g: null
        },

        portions: {
            portion: {
                grams: null
            }
        },

        source: {
            name: null,
            id: null,
            verified: false
        },

        locale: "AR"
    }
];


// ======================================================
// ÍNDICE POR ID
// ======================================================

const calorieTrackFoodsARById =
    new Map(
        calorieTrackFoodsAR.map(
            food => [
                food.id,
                food
            ]
        )
    );


// ======================================================
// ÍNDICE DE ALIAS
// ======================================================

const calorieTrackFoodsARAliasIndex =
    new Map();


calorieTrackFoodsAR.forEach(
    food => {

        food.aliases.forEach(
            alias => {

                const normalizedAlias =
                    String(alias)
                        .toLowerCase()
                        .normalize("NFD")
                        .replace(
                            /[\u0300-\u036f]/g,
                            ""
                        )
                        .trim();


                /*
                    Evitamos que dos alimentos
                    diferentes tengan accidentalmente
                    el mismo alias.
                */

                if (
                    calorieTrackFoodsARAliasIndex
                        .has(normalizedAlias)
                ) {

                    console.warn(
                        "CalorieTrack Foods AR: alias duplicado:",
                        normalizedAlias
                    );

                    return;
                }


                calorieTrackFoodsARAliasIndex.set(
                    normalizedAlias,
                    food.id
                );
            }
        );
    }
);


// ======================================================
// OBTENER ALIMENTO POR ID
// ======================================================

function getCalorieTrackFoodById(
    id
) {

    return (
        calorieTrackFoodsARById.get(id) ||
        null
    );
}


// ======================================================
// OBTENER ALIMENTO POR ALIAS EXACTO
// ======================================================

function getCalorieTrackFoodByAlias(
    text
) {

    if (!text) {
        return null;
    }


    const normalized =
        String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();


    const foodId =
        calorieTrackFoodsARAliasIndex.get(
            normalized
        );


    if (!foodId) {
        return null;
    }


    return (
        getCalorieTrackFoodById(
            foodId
        )
    );
}


// ======================================================
// VALIDACIÓN DEL CATÁLOGO
// ======================================================

function validateCalorieTrackFoodsAR() {

    const errors = [];


    calorieTrackFoodsAR.forEach(
        food => {

            if (!food.id) {
                errors.push(
                    "Alimento sin id."
                );
            }


            if (!food.name) {
                errors.push(
                    `${food.id}: falta name.`
                );
            }


            if (
                !Array.isArray(food.aliases) ||
                food.aliases.length === 0
            ) {

                errors.push(
                    `${food.id}: no tiene aliases.`
                );
            }


            if (!food.category) {

                errors.push(
                    `${food.id}: falta category.`
                );
            }


            if (
                food.locale !== "AR"
            ) {

                errors.push(
                    `${food.id}: locale inválido.`
                );
            }
        }
    );


    if (errors.length > 0) {

        console.error(
            "CalorieTrack Foods AR contiene errores:",
            errors
        );

        return false;
    }


    console.info(
        `CalorieTrack Foods AR v${CALORIETRACK_FOODS_AR_VERSION}:`,
        `${calorieTrackFoodsAR.length} alimentos cargados.`
    );


    return true;
}


// ======================================================
// INICIALIZACIÓN
// ======================================================

validateCalorieTrackFoodsAR();