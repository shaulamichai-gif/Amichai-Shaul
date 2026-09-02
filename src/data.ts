import { MenuItem } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // SHARING-KARTE
  {
    id: 'brotzeit',
    name: 'Brotzeit',
    description: 'Knoblauch-Aioli / Tomaten-Chili-Salsa',
    price: 7.50,
    category: 'sharing',
    cuisine: 'mittelmeer',
    isVegetarian: true,
    ingredients: ['Knoblauch-Aioli', 'Tomaten-Chili-Salsa', 'Hausbrot'],
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'thunfisch_tartar',
    name: 'Thunfisch Tartar',
    description: 'Rotes Thai Curry / Wakame Algen / Mango / Limette / Kokos',
    price: 13.50,
    category: 'sharing',
    cuisine: 'asien',
    ingredients: ['Thunfisch', 'Rotes Thai Curry', 'Wakame Algen', 'Mango', 'Limette', 'Kokos'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    accentNote: 'Scharf & Fruchtig'
  },
  {
    id: 'riesengarnele',
    name: 'Riesengarnele',
    description: 'Burrata / Kirschtomate / Olive / Basilikum Pesto',
    price: 14.90,
    category: 'sharing',
    cuisine: 'mittelmeer',
    ingredients: ['Riesengarnele', 'Burrata', 'Kirschtomate', 'Olive', 'Basilikum Pesto'],
    imageUrl: 'https://images.unsplash.com/photo-1559742811-82410b510405?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'dorschfilet_schleieck',
    name: 'Dorschfilet à la Schleieck',
    description: 'Remoulade / Kartoffeln / Salat',
    price: 13.90,
    category: 'sharing',
    cuisine: 'ostsee',
    ingredients: ['Dorschfilet', 'Remoulade', 'Kartoffeln', 'Salat'],
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80',
    accentNote: 'Direkt aus der Region'
  },
  {
    id: 'piccata_milanese',
    name: 'Piccata Milanese von Dorsch & Garnele',
    description: 'Kirschtomatenragout / geriebener Hartkäse',
    price: 14.90,
    category: 'sharing',
    cuisine: 'mittelmeer',
    ingredients: ['Dorsch', 'Garnele', 'Kirschtomatenragout', 'Hartkäse'],
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
    accentNote: 'Italienische Panade'
  },
  {
    id: 'loup_de_mer',
    name: 'Filet vom Loup de Mer',
    description: 'Kirschtomatenragout / Chilibohne / Olive / Schafskäse',
    price: 13.90,
    category: 'sharing',
    cuisine: 'mittelmeer',
    ingredients: ['Loup de Mer', 'Kirschtomatenragout', 'Chilibohne', 'Olive', 'Schafskäse'],
    imageUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'sardinen_geroestet',
    name: 'Sardinen',
    description: 'Kräuteröl / Meersalz / Zitrone / Knoblauch',
    price: 12.50,
    category: 'sharing',
    cuisine: 'mittelmeer',
    ingredients: ['Sardinen', 'Kräuteröl', 'Meersalz', 'Zitrone', 'Knoblauch'],
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'schollenfilet',
    name: 'Schollenfilet',
    description: 'Limetten-Buttersauce / Blattspinat / Kartoffeln',
    price: 14.50,
    category: 'sharing',
    cuisine: 'ostsee',
    ingredients: ['Schollenfilet', 'Limetten-Buttersauce', 'Blattspinat', 'Kartoffeln'],
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'ribeye_spiess',
    name: 'Ribeye-Spieß',
    description: 'SH-Färse / Sauerrahm / Kartoffeln / Chilibohne',
    price: 14.90,
    category: 'sharing',
    cuisine: 'ostsee',
    ingredients: ['Schleswig-Holstein Färse Rind', 'Sauerrahm', 'Kartoffeln', 'Chilibohne'],
    imageUrl: 'https://lh3.googleusercontent.com/d/1rPq3kpkGMFxEGiX3ORn2Ey4x6RrlrqA7',
    accentNote: 'Regional-Herzhaft'
  },
  {
    id: 'crispyhuhn',
    name: 'Würziges Crispyhuhn',
    description: 'Nam Pla* / Mango / Limette / Rote Chili / Sesam',
    price: 13.50,
    category: 'sharing',
    cuisine: 'asien',
    ingredients: ['Hähnchenbrust knusprig', 'Nam Pla (Asiatische Fischsauce)', 'Mango', 'Limette', 'Rote Chili', 'Sesam'],
    imageUrl: '/assets/IMG_1795.PNG',
    accentNote: 'Knusprig-Feurig'
  },
  {
    id: 'spitzkohl_ofen',
    name: 'Spitzkohl aus dem Ofen',
    description: 'Nam Pla* / Mango / Limette / Rote Chili / Sesam',
    price: 13.50,
    category: 'sharing',
    cuisine: 'asien',
    isVegan: true,
    isVegetarian: true,
    ingredients: ['Spitzkohl', 'Miso (Japanische Sojabohnenpaste)', 'Sesampaste', 'Falafel', 'Mango-Chutney', 'Geröstete Mandel'],
    imageUrl: 'https://lh3.googleusercontent.com/d/1h-j8XoTZpKFjQJ7RRTtMYvQqujcze4bp',
    accentNote: 'Veganes Highlight'
  },
  {
    id: 'fetakaese_geroestet',
    name: 'Gerösteter Fetakäse',
    description: 'Filoteig / Harissa* / Kirschtomate / Blattspinat / Olive / Zitrone',
    price: 13.50,
    category: 'sharing',
    cuisine: 'mittelmeer',
    isVegetarian: true,
    ingredients: ['Fetakäse', 'Filoteig', 'Harissa (Gewürzpaste)', 'Kirschtomate', 'Blattspinat', 'Olive', 'Zitrone'],
    imageUrl: 'https://images.unsplash.com/photo-1511018556340-d16986a1c194?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'falafelteller',
    name: 'Mediterraner Falafelteller',
    description: 'Mandelknoblauch-Creme / Chili-Salsa / Sumak Salat',
    price: 13.50,
    category: 'sharing',
    cuisine: 'mittelmeer',
    isVegan: true,
    isVegetarian: true,
    ingredients: ['Falafel', 'Mandelknoblauch-Creme', 'Chili-Salsa', 'Sumak Salat'],
    imageUrl: 'https://images.unsplash.com/photo-1547058886-ee8edd367dfd?auto=format&fit=crop&w=600&q=80'
  },

  // KIDS-KARTE
  {
    id: 'neptun_teller',
    name: 'Neptun-Teller',
    description: 'Kleines Dorschfilet / Röstkartoffeln / Salatgarnitur',
    price: 7.90,
    category: 'kids',
    cuisine: 'ostsee',
    ingredients: ['Dorschfilet klein', 'Röstkartoffeln', 'Salatgarnitur'],
    imageUrl: 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'chip_chap',
    name: 'Chip & Chap',
    description: 'Chicken-Nuggets / Pommes-frites / Salatgarnitur',
    price: 7.90,
    category: 'kids',
    cuisine: 'all',
    ingredients: ['Chicken Nuggets', 'Pommes Frites', 'Salatgarnitur'],
    imageUrl: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80'
  },

  // DESSERTS
  {
    id: 'eis_mohn',
    name: 'Hausgemachtes Weiße Schokoladen-Mohn-Eis (1 Kugel)',
    description: 'Serviert mit Roter Grütze',
    price: 4.50,
    category: 'dessert',
    cuisine: 'all',
    isVegetarian: true,
    ingredients: ['Weiße Schokolade', 'Mohn', 'Rote Grütze'],
    imageUrl: 'https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'pistazienparfait',
    name: 'Nougat-Pistazienparfait',
    description: 'Karamell-Feigensauce / Biskuit-Nuss Crumble',
    price: 9.80,
    category: 'dessert',
    cuisine: 'mittelmeer',
    isVegetarian: true,
    ingredients: ['Nougat', 'Pistazien', 'Karamell-Feigensauce', 'Biskuit-Nuss Crumble'],
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'tiramisu_kugeln',
    name: 'Schokoladen Tiramisu-Kugeln',
    description: 'Mascarpone / Vanille / Madagaskar Kakao',
    price: 10.50,
    category: 'dessert',
    cuisine: 'mittelmeer',
    isVegetarian: true,
    ingredients: ['Mascarpone', 'Löffelbiskuit', 'Madagaskar Kakao', 'Espresso'],
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80'
  }
];

export const TIME_SLOTS = [
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00'
];

export const INITIAL_RESERVATIONS = [
  {
    id: 'res-1',
    date: '2026-09-02',
    time: '18:00',
    guests: 4,
    name: 'Familie Sörensen',
    email: 'soerensen.maasholm@web.de',
    phone: '04642-123456',
    wishes: 'Gerne einen Tisch am Fenster mit Blick auf den Schlei-Winkel. 2 Personen essen vegan.',
    status: 'bestaetigt' as const,
    createdAt: '2026-08-30T14:30:00Z',
    selectedDishes: [
      { menuItemId: 'spitzkohl_ofen', quantity: 2 },
      { menuItemId: 'ribeye_spiess', quantity: 2 },
      { menuItemId: 'riesengarnele', quantity: 1 },
      { menuItemId: 'thunfisch_tartar', quantity: 1 }
    ]
  },
  {
    id: 'res-2',
    date: '2026-09-04',
    time: '19:30',
    guests: 2,
    name: 'Dr. Michael Müller',
    email: 'm.mueller@gmx.de',
    phone: '0171-88992211',
    wishes: 'Feiern Hochzeitstag, bitte eine schöne Flasche Weißwein einkühlen.',
    status: 'bestaetigt' as const,
    createdAt: '2026-08-31T09:15:00Z'
  }
];
