import { Order } from "@/types/interfaces";

function formatOrderTime(date: Date): string {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);

  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
  }).format(date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${time}, ${weekday}, ${day}/${month}/${year}`;
}

export const orders: Order[] = [
  {
    orderId: 101,
    orderStatus: "Pending",
    orderTime: new Date(2025, 7, 20, 9, 20),
    formattedTime: formatOrderTime(new Date(2025, 7, 20, 9, 20)),
    locationBought: "Jollibee SM Downtown",
    specification: "2pc Chickenjoy with Spaghetti Combo",
    instructions: "Extra gravy, less ice on drink",
    placeDelivered: "Ateneo Dormitory, Room 204",
    fee: 75,
  },
  {
    orderId: 102,
    orderStatus: "Delivered",
    orderTime: new Date(2025, 7, 21, 14, 35),
    formattedTime: formatOrderTime(new Date(2025, 7, 21, 14, 35)),
    locationBought: "7-Eleven Loyola Street",
    specification: "Bottled water, sandwich, and chips",
    instructions: "Leave at front desk if no answer",
    placeDelivered: "Loyola Hall, Room 310",
    fee: 45,
  },
  {
    orderId: 103,
    orderStatus: "In Transit",
    orderTime: new Date(2025, 7, 22, 11, 50),
    formattedTime: formatOrderTime(new Date(2025, 7, 22, 11, 50)),
    locationBought: "McDonald's Katipunan",
    specification: "McChicken Meal, Coke Zero",
    instructions: "Knock twice before handing over",
    placeDelivered: "Blue Residences Tower 2, Unit 1801",
    fee: 65,
  },
  {
    orderId: 104,
    orderStatus: "Cancelled",
    orderTime: new Date(2025, 7, 22, 18, 10),
    formattedTime: formatOrderTime(new Date(2025, 7, 22, 18, 10)),
    locationBought: "Watsons Gateway Mall",
    specification: "Vitamin C tablets and face mask pack",
    instructions: "Cancel if not available in stock",
    placeDelivered: "One Katipunan Apartments, Room 302",
    fee: 50,
  },
  {
    orderId: 105,
    orderStatus: "Delivered",
    orderTime: new Date(2025, 7, 23, 8, 45),
    formattedTime: formatOrderTime(new Date(2025, 7, 23, 8, 45)),
    locationBought: "Starbucks Katipunan",
    specification: "Iced Caramel Macchiato, Grande",
    instructions: "No whipped cream, paper straw only",
    placeDelivered: "Ateneo Library Lobby",
    fee: 60,
  },
];
