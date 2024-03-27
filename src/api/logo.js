import apiClient from "./httpClients";
export function signIn(data) {
  return apiClient.post("/api/auth/sign-in", data);
}
