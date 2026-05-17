import axios from "axios"
import { api } from "./api"

interface LoginData {
    email: string,
    password: string
}

interface User {
    id: string,
    name: string,
    email: string
}

interface AuthResponse {
    token: string,
    user: User
}

export async function login(
  data: LoginData
): Promise<AuthResponse> {
  try {
    const response = await api.post("/auth/login", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Erro ao fazer login", {cause: error});
    }

    throw new Error("Erro inesperado", {cause: error});
  }
}

interface RegisterData{
    name: string
    email: string
    password: string
}

export type RegisterErrorCode = "EMAIL_ALREADY_EXISTS" | "WEAK_PASSWORD" | "NETWORK_ERROR"

export class RegisterError extends Error {
    code: RegisterErrorCode

    constructor(code: RegisterErrorCode, message: string) {
        super(message)
        this.name = "RegisterError"
        this.code = code
    }
}
export async function register(data: RegisterData) {
  try {
    const response = await api.post("/auth/register", data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message;

      if (message === "Email already exists") {
        throw new RegisterError("EMAIL_ALREADY_EXISTS", "E-mail já cadastrado");
      }

      throw new RegisterError("NETWORK_ERROR", "Erro ao cadastrar usuário");
    }

    throw new RegisterError("NETWORK_ERROR", "Erro inesperado");
  }
}
