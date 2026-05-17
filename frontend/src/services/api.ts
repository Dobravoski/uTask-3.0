import axios from "axios";

export const api = axios.create({baseURL: "http://localhost:3333"});

const TOKEN_STORAGE_KEY = "@utask:token"

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})