// index.js

import apiClient from "./httpClients";

export function createUser(data) {
  return apiClient.post("/api/user", data);
}
export function getUserList() {
  return apiClient.get("/api/user/list");
}
export function getUserById(id) {
  return apiClient.get("/api/user/" + id);
}
export function updateUserById(id, data) {
  return apiClient.patch("/api/user/" + id, data);
}
export function deleteUserById(id) {
  return apiClient.delete("/api/user/" + id);
}
