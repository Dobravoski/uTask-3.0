import axios from "axios";

export const api = axios.create({baseURL: "http://localhost:3333"});

const TOKEN_STORAGE_KEY = "@utask:token"

function getStoredToken() {
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY)

  if(!storedToken) {
    return null
  }

  try {
    const parsedToken = JSON.parse(storedToken)

    if(typeof parsedToken === "string") {
      return parsedToken
    }
  } catch {
    return storedToken
  }

  return storedToken
}

api.interceptors.request.use((config) => {
  const token = getStoredToken()

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
