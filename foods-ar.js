
/*
 CalorieTrack
 Base de alimentos para Argentina

 Valores nutricionales aproximados por 100 g
 o 100 ml según la unidad indicada.

 Las porciones representan cantidades habituales.
 Para productos comerciales, usar la etiqueta.
*/

window.calorieTrackFoodsAR = [

  // CARNES
  {
    id: "asado",
    name: "Asado",
    aliases: ["asado", "tira de asado"],
    kcal: 290,
    protein: 24,
    unit: "g",
    portion: 200
  },
  {
    id: "carne_picada",
    name: "Carne picada",
    aliases: ["carne picada", "picada", "carne molida"],
    kcal: 250,
    protein: 26,
    unit: "g",
    portion: 150
  },
  {
    id: "vacio",
    name: "Vacío",
    aliases: ["vacio", "vacío"],
    kcal: 260,
    protein: 26,
    unit: "g",
    portion: 200
  },
  {
    id: "milanesa_carne",
    name: "Milanesa de carne",
    aliases: ["milanesa de carne", "milanesa vacuna"],
    kcal: 270,
    protein: 19,
    unit: "g",
    portion: 150
  },
  {
    id: "pollo",
    name: "Pollo",
    aliases: ["pollo", "pechuga de pollo", "pechuga"],
    kcal: 165,
    protein: 31,
    unit: "g",
    portion: 150
  },
  {
    id: "milanesa_pollo",
    name: "Milanesa de pollo",
    aliases: ["milanesa de pollo", "suprema rebozada"],
    kcal: 250,
    protein: 20,
    unit: "g",
    portion: 150
  },
  {
    id: "chorizo",
    name: "Chorizo",
    aliases: ["chorizo", "chorizos"],
    kcal: 330,
    protein: 14,
    unit: "g",
    portion: 100
  },

  // HUEVOS
  {
    id: "huevo",
    name: "Huevo",
    aliases: ["huevo", "huevos"],
    kcal: 143,
    protein: 13,
    unit: "g",
    portion: 50
  },

  // PANES Y TOSTADAS
  {
    id: "tostada",
    name: "Tostada de pan",
    aliases: [
      "tostada",
      "tostadas",
      "pan tostado",
      "tostada de pan",
      "tostadas de pan"
    ],
    kcal: 265,
    protein: 9,
    unit: "g",
    portion: 28
  },
  {
    id: "pan_lactal",
    name: "Pan lactal",
    aliases: [
      "pan lactal",
      "pan de molde",
      "pan lactal integral",
      "pan de molde integral"
    ],
    kcal: 265,
    protein: 9,
    unit: "g",
    portion: 25
  },
  {
    id: "pan",
    name: "Pan",
    aliases: [
      "pan",
      "pan frances",
      "pan francés"
    ],
    kcal: 265,
    protein: 9,
    unit: "g",
    portion: 50
  },
  {
    id: "rapiditas",
    name: "Tortilla tipo Rapiditas",
    aliases: [
      "rapiditas",
      "rapidita",
      "tortilla integral",
      "tortilla de trigo"
    ],
    kcal: 310,
    protein: 8,
    unit: "g",
    portion: 40
  },

  // CEREALES Y LEGUMBRES
  {
    id: "arroz",
    name: "Arroz cocido",
    aliases: ["arroz", "arroz blanco", "arroz cocido"],
    kcal: 130,
    protein: 2.7,
    unit: "g",
    portion: 150
  },
  {
    id: "fideos",
    name: "Fideos cocidos",
    aliases: ["fideos", "pasta", "tallarines"],
    kcal: 158,
    protein: 5.8,
    unit: "g",
    portion: 180
  },
  {
    id: "lentejas",
    name: "Lentejas cocidas",
    aliases: ["lentejas", "lenteja"],
    kcal: 116,
    protein: 9,
    unit: "g",
    portion: 150
  },
  {
    id: "avena",
    name: "Avena",
    aliases: ["avena", "copos de avena"],
    kcal: 389,
    protein: 16.9,
    unit: "g",
    portion: 40
  },

  // FRUTAS
  {
    id: "banana",
    name: "Banana",
    aliases: ["banana", "bananas"],
    kcal: 89,
    protein: 1.1,
    unit: "g",
    portion: 120
  },
  {
    id: "manzana",
    name: "Manzana",
    aliases: ["manzana", "manzanas"],
    kcal: 52,
    protein: 0.3,
    unit: "g",
    portion: 180
  },
  {
    id: "naranja",
    name: "Naranja",
    aliases: ["naranja", "naranjas"],
    kcal: 47,
    protein: 0.9,
    unit: "g",
    portion: 160
  },

  // VERDURAS
  {
    id: "papa",
    name: "Papa hervida",
    aliases: ["papa", "papas", "papa hervida"],
    kcal: 87,
    protein: 1.9,
    unit: "g",
    portion: 150
  },
  {
    id: "batata",
    name: "Batata",
    aliases: ["batata", "batatas"],
    kcal: 86,
    protein: 1.6,
    unit: "g",
    portion: 150
  },
  {
    id: "zapallo",
    name: "Zapallo",
    aliases: ["zapallo", "calabaza"],
    kcal: 35,
    protein: 1,
    unit: "g",
    portion: 150
  },
  {
    id: "tomate",
    name: "Tomate",
    aliases: ["tomate", "tomates"],
    kcal: 18,
    protein: 0.9,
    unit: "g",
    portion: 120
  },
  {
    id: "cebolla",
    name: "Cebolla",
    aliases: ["cebolla", "cebollas"],
    kcal: 40,
    protein: 1.1,
    unit: "g",
    portion: 100
  },
  {
    id: "zanahoria",
    name: "Zanahoria",
    aliases: ["zanahoria", "zanahorias"],
    kcal: 41,
    protein: 0.9,
    unit: "g",
    portion: 80
  },
  {
    id: "morron",
    name: "Morrón",
    aliases: ["morron", "morrón", "morrones"],
    kcal: 31,
    protein: 1,
    unit: "g",
    portion: 100
  },
  {
    id: "lechuga",
    name: "Lechuga",
    aliases: ["lechuga"],
    kcal: 15,
    protein: 1.4,
    unit: "g",
    portion: 50
  },

  // LÁCTEOS
  {
    id: "leche",
    name: "Leche",
    aliases: ["leche", "leche descremada", "leche entera"],
    kcal: 46,
    protein: 3.2,
    unit: "ml",
    portion: 200
  },
  {
    id: "yogur",
    name: "Yogur",
    aliases: ["yogur", "yogurt"],
    kcal: 95,
    protein: 4,
    unit: "g",
    portion: 190
  },
  {
    id: "queso",
    name: "Queso",
    aliases: ["queso", "queso cremoso"],
    kcal: 330,
    protein: 22,
    unit: "g",
    portion: 30
  },

  // OTROS ALIMENTOS
  {
    id: "atun",
    name: "Atún al natural",
    aliases: ["atun", "atún"],
    kcal: 116,
    protein: 26,
    unit: "g",
    portion: 120
  },
  {
    id: "aceite",
    name: "Aceite",
    aliases: ["aceite", "aceite de oliva", "aceite girasol"],
    kcal: 884,
    protein: 0,
    unit: "g",
    portion: 10
  },
  {
    id: "mayonesa",
    name: "Mayonesa",
    aliases: ["mayonesa"],
    kcal: 680,
    protein: 1,
    unit: "g",
    portion: 15
  },
  {
    id: "azucar",
    name: "Azúcar",
    aliases: ["azucar", "azúcar"],
    kcal: 400,
    protein: 0,
    unit: "g",
    portion: 5
  },
  {
    id: "galletitas",
    name: "Galletitas",
    aliases: ["galletitas", "galletita"],
    kcal: 450,
    protein: 7,
    unit: "g",
    portion: 30
  },
  {
    id: "cafe",
    name: "Café solo",
    aliases: ["cafe", "café"],
    kcal: 2,
    protein: 0.1,
    unit: "ml",
    portion: 200
  }
];
