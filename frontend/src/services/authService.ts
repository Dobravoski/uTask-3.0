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