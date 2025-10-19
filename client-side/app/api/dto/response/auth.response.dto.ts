// api/dto/response/auth.response.dto.ts

import { Role } from "react-native";

// ---------------------------------------------------------
// ENUMS (mirror from PasabuyAPI.Enums)
// ---------------------------------------------------------
export enum VerificationInfoStatus {
  Pending = 0,
  Approved = 1,
  Rejected = 2,
}

export enum Roles {
  Admin = 0,
  Courier = 1,
  Customer = 2,
}

// ---------------------------------------------------------
// NESTED DTOs
// ---------------------------------------------------------
export interface VerificationInfoResponseDTO {
  verifiactionInfoId: number;
  userIdFK: number;
  frontIdPath: string;
  backIdPath: string;
  insurancePath: string;
  verificationInfoStatus: VerificationInfoStatus;
  createdAt: string; // DateTime -> ISO string
  updatedAt: string; // DateTime -> ISO string
}

export interface VerificationInfoPathsResponseDTO {
  frontIdFileName: string;
  backIdFileName: string;
  insuranceFileName: string;
}

// ---------------------------------------------------------
// MAIN DTO
// ---------------------------------------------------------
export interface UserResponseDTO {
  userIdPK: number;
  email: string;
  username: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  phone: string;
  birthday: string; // DateOnly -> ISO string
  ratingAverage: number;
  totalDeliveries: number;
  createdAt: string; // DateTime -> ISO string
  updatedAt: string; // DateTime -> ISO string
  currentRole: Roles;
  verifiactionInfoDTO: VerificationInfoResponseDTO;
}

export interface OrderResponseDTO {
  orderIdPK: number;
  customerId: number;
  courierId: number;
  request: string;
  status: number;
  priority: number;
  created_at: string;
  updated_at: string;
  deliveryDetailsDTO?: any;
  paymentsResponseDTO?: any;
}

export interface TokenResponseDTO {
  token: string;
}

export interface TokenClaims {
  userId: string | number;
  email: string;
  username: string;
  phone_number: string;
  role: Roles;
  verification_status: VerificationInfoStatus;
}
