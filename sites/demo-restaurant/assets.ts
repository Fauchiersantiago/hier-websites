import restaurantDishUrl from "./assets/generated/restaurant-dish.jpg?url";
import restaurantHeroUrl from "./assets/generated/restaurant-hero.jpg?url";
import restaurantTableUrl from "./assets/generated/restaurant-table.jpg?url";
import restaurantPlatingPosterUrl from "./assets/stock/restaurant-plating-poster.jpg?url";
import restaurantPlatingMp4Url from "./assets/stock/restaurant-plating-preview.mp4?url";
import restaurantPlatingWebmUrl from "./assets/stock/restaurant-plating-preview.webm?url";

export const restaurantAssetUrls: Readonly<Record<string, string>> = {
  "restaurant-hero": restaurantHeroUrl,
  "restaurant-dish": restaurantDishUrl,
  "restaurant-table": restaurantTableUrl,
  "restaurant-plating-poster": restaurantPlatingPosterUrl,
  "restaurant-plating-video-mp4": restaurantPlatingMp4Url,
  "restaurant-plating-video-webm": restaurantPlatingWebmUrl,
};
