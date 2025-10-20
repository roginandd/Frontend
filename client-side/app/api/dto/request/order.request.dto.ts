export interface PostOrderRequestDTO {
  customerId: number;
  request: string;
  tipFee: number;
  status: "Pending";
  priority: number;
  locationLatitude: number;
  locationLongitude: number;
  customerLatitude: number;
  customerLongitude: number;
  deliveryDistance: number;
  deliveryNotes: string;
}

export interface AcceptOrderRequestDTO {
  courierId: number;
  courierLatitude: number;
  courierLongitude: number;
}
