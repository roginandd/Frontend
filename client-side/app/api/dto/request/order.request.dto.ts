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
