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

const fakeUser: User = {
    id: "1",
    name: "Dobravoski",
    email: "test@test.com"
}

export async function login(data: LoginData) : Promise<AuthResponse> {
    const {email, password} = data

    await new Promise((resolve) => {setTimeout(resolve, 1000)})

    if(email === "test@test.com" && password === "123456") {
        return {
            token: "fake-jwt-token",
            user: fakeUser
        }
    }

    throw new Error("Email ou senha inválidos")
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
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const email = data.email.trim().toLowerCase()

    if(email === "exists@test.com") {
        throw new RegisterError("EMAIL_ALREADY_EXISTS", "E-mail já cadastrado")
    }

    if(email === "network@test.com") {
        throw new RegisterError("NETWORK_ERROR", "Erro de conexão")
    }

    if(data.password.length < 6) {
        throw new RegisterError("WEAK_PASSWORD", "Senha inválida")
    }

    return {
        token: "fake-jwt-token",
        user: {
            id: "1",
            name: data.name.trim(),
            email
        }
    }
}
