export interface NavbarProps {
  logo: string;
}

export type FoodItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  _id?: string;
}
export type SubSection = {
    id: string;
    name: string;
    foodItems: FoodItem[];
    _id?: string;
}

export type Section = {
    id: string;
    name: string;
    description?: string;
    foodItems: FoodItem[];
    subSections: SubSection[];
    _id?: string;
    __v?: number;
}
