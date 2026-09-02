export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'sharing' | 'kids' | 'dessert';
  cuisine: 'ostsee' | 'mittelmeer' | 'asien' | 'all';
  isVegan?: boolean;
  isVegetarian?: boolean;
  ingredients?: string[];
  imageUrl?: string;
  accentNote?: string;
}

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  wishes?: string;
  status: 'angefragt' | 'bestaetigt' | 'storniert';
  createdAt: string;
  selectedDishes?: { menuItemId: string; quantity: number }[];
}
