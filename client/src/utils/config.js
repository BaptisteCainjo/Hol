import { v4 as uuidv4 } from "uuid";

export const REGISTER__TIME_AFTER_MAIL = 600;

export const BASE_URL = "http://localhost:5000";
export const API_SHOPS = `${BASE_URL}/api/shops`;
export const API_USERS = `${BASE_URL}/api/users`;
export const API_RESERVATIONS = `${BASE_URL}/api/reservations`;
export const VERIF_USERS = `${BASE_URL}/verified/user`;
export const VERIF_UPDATE = `${BASE_URL}/verified/update`;
export const SEND_EMAIL_TO_COMPANY = `${BASE_URL}/verified/send-mail-company`;
export const SEND_EMAIL_TO_ARTISAN = `${BASE_URL}/verified/send-mail-artisan`;
export const SEND_EMAIL = `${BASE_URL}/verified/send-mail`;
export const RESEND_EMAIL = `${BASE_URL}/verified/resend-mail`;
export const MODIF_SECRETKEY = `${BASE_URL}/verified/resend-secret-key`;

export function generateFormattedUUID() {
  const uuid = uuidv4();
  const formattedUUID = uuid.replace(/\D/g, "").substring(0, 6);
  return formattedUUID;
}