import axios from "axios";
import {
  SignInRequestDTO,
  UserRequestDTO,
} from "./dto/request/auth.request.dto";
import {
  TokenResponseDTO,
  UserResponseDTO,
} from "./dto/response/auth.response.dto";
import { Platform } from "react-native";
import { API_BASE_URL } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "./store/auth_store";

const getMimeType = (filename: string) => {
  const ext = filename.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    default:
      return "application/octet-stream";
  }
};

const BASE_URL = `${API_BASE_URL}/Users`;
/** Create User */
export const createUser = async (
  userRequest: UserRequestDTO
): Promise<UserResponseDTO> => {
  const formData = new FormData();
  formData.append("Email", userRequest.email);
  formData.append("Username", userRequest.firstName);
  formData.append("Password", userRequest.password);
  formData.append("FirstName", userRequest.firstName);
  formData.append("MiddleName", userRequest.middleName ?? "");
  formData.append("LastName", userRequest.lastName);
  formData.append("Phone", userRequest.phone);
  formData.append("Birthday", userRequest.birthday);

  if (userRequest.frontId) {
    formData.append("FrontId", {
      uri: userRequest.frontId.uri,
      name: userRequest.frontId.name,
      type: getMimeType(userRequest.frontId.name),
    } as any);
  }
  if (userRequest.backId) {
    formData.append("BackId", {
      uri: userRequest.backId.uri,
      name: userRequest.backId.name,
      type: getMimeType(userRequest.backId.name),
    } as any);
  }
  if (userRequest.insurance) {
    formData.append("Insurance", {
      uri: userRequest.insurance.uri,
      name: userRequest.insurance.name,
      type: getMimeType(userRequest.insurance.name),
    } as any);
  }

  console.log(`Form Data Contents: ${JSON.stringify(formData)}`);
  console.log(`URL: ${BASE_URL}`);
  try {
    const response = await axios.post<UserResponseDTO>(
      `${BASE_URL}`, // ✅ Correct endpoint for user creation
      formData,
      {
        headers: {
          Accept: "text/plain",
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ User created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

export const getCurrentProfile = async (): Promise<UserResponseDTO> => {
  try {
    // get the current token
    const authToken = useAuthStore.getState().token;

    if (!authToken) {
      throw new Error("No authentication token found. Please log in again.");
    }

    const response = await axios.get<UserResponseDTO>(`${BASE_URL}/profile`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    console.log("✅ Profile retrieved:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("❌ Failed to fetch profile:", err);
    throw new Error(err.response?.data || "Failed to fetch profile");
  }
};
