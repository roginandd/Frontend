import axios from "axios";
import { API_BASE_URL } from "./config";
import { PostOrderRequestDTO } from "./dto/request/order.request.dto";
import { useAuthStore } from "./store/auth_store";

const BASE_URL = `${API_BASE_URL}/Orders`;
export const getOrders = async (): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: { Accept: "application/json" },
    });

    return response.data;
  } catch (error: any) {
    console.log("URL:", API_BASE_URL);
    if (error.response) {
      console.error("❌ Server responded with:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("❌ No response received:", error.request);
    } else {
      console.error("❌ Axios error:", error.message);
    }
    throw error;
  }
};

export const postOrder = async (
  orderRequestDTO: PostOrderRequestDTO
): Promise<any> => {
  const token = useAuthStore.getState().token;

  try {
    const payload = {
      customerId: orderRequestDTO.customerId,
      request: orderRequestDTO.request, 
      tipFee: orderRequestDTO.tipFee ?? 0,
      status: 0, // ✅ send string, not number
      priority: 0,
      locationLatitude: orderRequestDTO.locationLatitude,
      locationLongitude: orderRequestDTO.locationLongitude,
      customerLatitude: orderRequestDTO.customerLatitude,
      customerLongitude: orderRequestDTO.customerLongitude,
      deliveryDistance: orderRequestDTO.deliveryDistance,
      deliveryNotes: orderRequestDTO.deliveryNotes,
    };

    Object.entries(payload).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    const response = await axios.post(`${BASE_URL}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (err: any) {
    const apiError = err.response?.data;

    console.error(
      "Error posting order:",
      apiError || err.message || "Unknown error"
    );

    // More descriptive error for UI
    const message =
      apiError?.title ||
      apiError?.error ||
      err.response?.statusText ||
      "An unexpected error occurred while creating the order.";

    throw new Error(message);
  }
};
