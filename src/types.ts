export interface Drink {
  id: number;
  name: string;
  price: number;
  calories: number;
  abv: number;
  packSize: number;
  packPrice: number;
}

export interface User {
  id: number;
  name: string;
  drinks: Drink[];
}