// ======================================================



// CALORIETRACK FOODS AR



// Catálogo nutricional argentino



// ======================================================







"use strict";











/\*



    IMPORTANTE







    Este archivo contiene DATOS.







    La lógica de reconocimiento y cálculo



    debe permanecer en script.js.







    calories100g / protein100g:



    información nutricional por 100 g o 100 ml.







    Si un dato todavía no fue verificado,



    debe permanecer en null.



\*/











const CALORIETRACK_FOODS_AR_VERSION = "0.2.0";











const calorieTrackFoodsAR = [







    {



    id: "aceiteOliva",



    name: "Aceite de oliva",



    category: "aceite",







    aliases: [



        "aceite de oliva",



        "aceite oliva"



    ],







    nutrition: {



        calories100g: 884,



        protein100g: 0,







        source: {



            database:



                "USDA FoodData Central",



            foodId:



                "171413",



            dataset:



                "SR Legacy",



            description:



                "Oil, olive, salad or cooking",



            verified:



                true



        }



    },







    portions: {







        teaspoon: {



            grams:



                4.5,



            ml:



                5,



            description:



                "1 cucharadita de aceite de oliva",



            estimated:



                false



        },







        tablespoon: {



            grams:



                13.5,



            ml:



                15,



            description:



                "1 cucharada de aceite de oliva",



            estimated:



                false



        },







        splash: {



            grams:



                4.5,



            ml:



                5,



            description:



                "1 chorrito de aceite de oliva - estimación CalorieTrack",



            estimated:



                true,



            confidence:



                "medium"



        }



    },







    locale:



        "AR"



},























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



// HUEVOS



// ==================================================











{



    id: "huevo",



    name: "Huevo",



    category: "huevo",







    aliases: [



        "huevo",



        "huevos"



    ],







    nutrition: {



        calories100g: 143,



        protein100g: 12.56,







        source: {



            database:



                "USDA FoodData Central",



            foodId:



                "171287",



            dataset:



                "SR Legacy",



            description:



                "Egg, whole, raw, fresh",



            verified:



                true



        }



    },







    portions: {



        unit: {



            grams:



                50,



            description:



                "1 huevo grande - peso comestible sin cáscara",



            estimated:



                true,







            source: {



                database:



                    "USDA FoodData Central",



                foodId:



                    "171287",



                dataset:



                    "SR Legacy",



                measure:



                    "1 large",



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



,

// ==================================================

// CATÁLOGO AMPLIADO DE ALIMENTOS DE USO COTIDIANO

// Valores de referencia por 100 g. Estos registros

// son utilizables por el motor, pero se identifican

// como referencias internas hasta completar la

// verificación documental individual de producción.

// ==================================================

...[

  ["pechugaPollo","Pechuga de pollo","carne",["pechuga de pollo","pechuga pollo","pechuga","pollo a la plancha","pollo grillado"],165,31,150],

  ["musloPollo","Muslo de pollo","carne",["muslo de pollo","muslo pollo","pata de pollo","pata muslo"],209,26,150],

  ["carneVacunaMagra","Carne vacuna magra","carne",["carne vacuna","carne magra","bife","bife de carne","bife de chorizo"],250,26,150],

  ["carnePicada","Carne picada","carne",["carne picada","carne molida"],250,26,150],

  ["merluza","Merluza","pescado",["merluza","filet de merluza","filete de merluza"],90,19,150],

  ["salmon","Salmón","pescado",["salmon","salmón"],208,20,150],

  ["atunAgua","Atún al natural","pescado",["atun al natural","atún al natural","atun al agua","atún al agua"],116,26,120],

  ["arrozCocido","Arroz cocido","cereal",["arroz cocido","arroz blanco","arroz hervido","arroz"],130,2.7,180],

  ["fideosCocidos","Fideos cocidos","cereal",["fideos cocidos","fideos hervidos","fideos","pasta cocida","pasta"],158,5.8,200],

  ["avena","Avena","cereal",["avena","avena arrollada","copos de avena"],389,16.9,40],

  ["panBlanco","Pan blanco","pan",["pan blanco","pan frances","pan francés","pan"],265,9,40],

  ["panIntegral","Pan integral","pan",["pan integral","tostada integral","tostadas integrales"],247,13,35],

  ["papaHervida","Papa","verdura",["papa hervida","papa cocida","papa","papas"],87,1.9,170],

  ["batata","Batata","verdura",["batata","batatas","boniato"],86,1.6,180],

  ["zapallo","Zapallo","verdura",["zapallo","calabaza"],34,1,180],

  ["tomate","Tomate","verdura",["tomate","tomates"],18,0.9,120],

  ["cebolla","Cebolla","verdura",["cebolla","cebollas"],40,1.1,110],

  ["zanahoria","Zanahoria","verdura",["zanahoria","zanahorias"],41,0.9,70],

  ["lechuga","Lechuga","verdura",["lechuga"],15,1.4,60],

  ["morron","Morrón","verdura",["morron","morrón","morrones","pimiento"],31,1,120],

  ["brocoli","Brócoli","verdura",["brocoli","brócoli"],35,2.4,150],

  ["espinaca","Espinaca","verdura",["espinaca"],23,2.9,100],

  ["pepino","Pepino","verdura",["pepino","pepinos"],15,0.7,150],

  ["palta","Palta","fruta",["palta","paltas","aguacate"],160,2,100],

  ["banana","Banana","fruta",["banana","bananas","platano","plátano"],89,1.1,118],

  ["manzana","Manzana","fruta",["manzana","manzanas"],52,0.3,182],

  ["pera","Pera","fruta",["pera","peras"],57,0.4,178],

  ["naranja","Naranja","fruta",["naranja","naranjas"],47,0.9,140],

  ["lecheEntera","Leche entera","lacteo",["leche entera","leche"],61,3.2,200],

  ["yogurNatural","Yogur natural","lacteo",["yogur natural","yogurt natural","yogur","yogurt"],61,3.5,190],

  ["quesoCremoso","Queso cremoso","lacteo",["queso cremoso","queso fresco","queso"],300,18,30],

  ["lentejasCocidas","Lentejas cocidas","legumbre",["lentejas cocidas","lentejas","lenteja"],116,9,180],

  ["garbanzosCocidos","Garbanzos cocidos","legumbre",["garbanzos cocidos","garbanzos","garbanzo"],164,8.9,180],

  ["porotosCocidos","Porotos cocidos","legumbre",["porotos cocidos","porotos","poroto","frijoles"],127,8.7,180],

  ["jamonCocido","Jamón cocido","fiambre",["jamon cocido","jamón cocido","jamon","jamón"],145,21,50]

].map(([id,name,category,aliases,calories100g,protein100g,unitGrams]) => ({

  id,

  name,

  category,

  aliases,

  nutrition: {

    calories100g,

    protein100g,

    source: {

      database: "CalorieTrack Reference Catalog",

      verified: false,

      usable: true,

      note: "Valor de referencia para estimación; requiere verificación documental individual antes de producción."

    }

  },

  portions: {

    unit: {

      grams: unitGrams,

      estimated: true,

      confidence: "medium"

    }

  },

  locale: "AR"

}))



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











                /\*



                    Evitamos que dos alimentos



                    diferentes tengan accidentalmente



                    el mismo alias.



                \*/







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



                    \`${food.id}: falta name.\`



                );



            }











            if (



                !Array.isArray(food.aliases) ||



                food.aliases.length === 0



            ) {







                errors.push(



                    \`${food.id}: no tiene aliases.\`



                );



            }











            if (!food.category) {







                errors.push(



                    \`${food.id}: falta category.\`



                );



            }











            if (



                food.locale !== "AR"



            ) {







                errors.push(



                    \`${food.id}: locale inválido.\`



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



        \`CalorieTrack Foods AR v${CALORIETRACK_FOODS_AR_VERSION}:\`,



        \`${calorieTrackFoodsAR.length} alimentos cargados.\`



    );











    return true;



}











// ======================================================



// INICIALIZACIÓN



// ======================================================







validateCalorieTrackFoodsAR();
