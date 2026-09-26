/**
 * Type definitions for Cardamom House restaurant menu
 */

export type DietaryTag = "V" | "GF" | "spicy";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface Hours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface Restaurant {
  name: string;
  tagline: string;
  address: string;
  hours: Hours;
  brand_color: string;
  phone: string;
  instagram: string;
}

export interface TodaySpecial {
  item_id: string;
  blurb: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags?: DietaryTag[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface MenuData {
  restaurant: Restaurant;
  today_special: TodaySpecial;
  categories: MenuCategory[];
}
