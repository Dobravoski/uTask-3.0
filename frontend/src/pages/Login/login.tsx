import React, { useState, useEffect } from "react"
import Header from "../../components/Header"
import "./login.css"
import { useAuth } from "../../contexts/useAuth"
import { Link, useNavigate } from "react-router-dom"

import illustration from "../../assets/login-illustration.svg"
import eyeOpen from "../../assets/eye-open.svg"
import eyeClosed from "../../assets/eye-closed.svg"

function Login() {
    useEffect(() => {document.title = "uTask 3.0 | Login"}, [])

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const {login} = useAuth();
    const navigate = useNavigate()

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setPasswordError(false)

        try {
            await login(email, password)
            navigate("/kanban")
        } catch(error) {
            setPasswordError(true)
            console.error(error)
        }
    }

    return (
        <>
        <Header />

        <main className="login-container">
            <div className="login-content">

                <div className="login-image">
                    <img
                        src={illustration}
                        alt="Ilustração de login"
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>

                <div className="divider"></div>

                <div className="login-form">
                    <h1>uTask 3.0</h1>

                    <div className="form-wrapper">

                        <form onSubmit={handleSubmit}>

                            <div className="input-group">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Endereço de e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password">Senha</label>
                                <div className={passwordError ? "password-field error" : "password-field"}>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha secreta"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="input"
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword((currentValue) => !currentValue)}
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        <img src={showPassword ? eyeOpen : eyeClosed} alt="" />
                                    </button>
                                </div>
                            </div>

                            {passwordError && (<p className="error-message">Senha incorreta, tente novamente.</p>)}

                            <button type="button" className="forgot-password">Esqueceu a senha?</button>

                            <button type="submit" className="login-button">Entrar</button>

                            <div className="form-divider"></div>

                            <Link to="/register" className="register-link">Não tem cadastro? Crie uma conta</Link>

                        </form>

                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default Login
