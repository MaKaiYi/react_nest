// index.js

import axios from "axios";

export function createUser(data) {
  return axios.post("/api/user", data);
}
export function getUserList() {
  return axios.get("/api/user/list");
}
export function getUserById(id) {
  return axios.get("/api/user/" + id);
}
export function updateUserById(id, data) {
  return axios.patch("/api/user/" + id, data);
}
export function deleteUserById(id) {
  return axios.delete("/api/user/" + id);
}
