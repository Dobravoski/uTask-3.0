import React, { useState } from "react"
import Header from "../../components/Header"
import "./register.css"

import illustration from "../../assets/register-illustration.svg"
import eyeOpen from "../../assets/eye-open.svg"
import eyeClosed from "../../assets/eye-closed.svg"

function Register() {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const passwordsDoNotMatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(passwordsDoNotMatch) {
            return
        }
    }

    return (
        <>
        <Header />

        <main className="register-container">
            <div className="register-content">

                <div className="register-form">
                    <h1>uTask 3.0</h1>

                    <div className="register-title-divider"></div>

                    <div className="register-form-wrapper">

                        <form onSubmit={handleSubmit}>

                            <h2>Crie uma conta</h2>

                            <div className="register-input-group">
                                <label htmlFor="username">Nome de usuário</label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Seu nome de usuário"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="register-input"
                                />
                            </div>

                            <div className="register-input-group">
                                <label htmlFor="register-email">E-mail</label>
                                <input
                                    id="register-email"
                                    type="email"
                                    placeholder="Endereço de e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="register-input"
                                />
                            </div>

                            <div className="register-input-group">
                                <label htmlFor="register-password">Senha</label>
                                <div className={passwordsDoNotMatch ? "register-password-field error" : "register-password-field"}>
                                    <input
                                        id="register-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Senha secreta"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="register-input"
                                    />
                                    <button
                                        type="button"
                                        className="register-password-toggle"
                                        onClick={() => setShowPassword((currentValue) => !currentValue)}
                                        aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        <img src={showPassword ? eyeOpen : eyeClosed} alt="" />
                                    </button>
                                </div>
                            </div>

                            <div className="register-input-group">
                                <label htmlFor="confirm-password">Confirme a senha</label>
                                <div className={passwordsDoNotMatch ? "register-password-field error" : "register-password-field"}>
                                    <input
                                        id="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Senha secreta"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="register-input"
                                    />
                                    <button
                                        type="button"
                                        className="register-password-toggle"
                                        onClick={() => setShowConfirmPassword((currentValue) => !currentValue)}
                                        aria-label={showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                                    >
                                        <img src={showConfirmPassword ? eyeOpen : eyeClosed} alt="" />
                                    </button>
                                </div>
                            </div>

                            {passwordsDoNotMatch && (<p className="register-error-message">Senhas não combinam, tente novamente.</p>)}

                            <button type="submit" className="register-button">Criar Cadastro</button>

                        </form>

                    </div>
                </div>

                <div className="register-divider"></div>

                <div className="register-image">
                    <img src={illustration} alt="Ilustração de cadastro" />
                </div>
            </div>
        </main>
        </>
    )
}

export default Register
