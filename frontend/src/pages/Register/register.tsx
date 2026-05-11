import { useState, useEffect, type FormEvent } from "react"
import Header from "../../components/Header"
import "./register.css"
import { register, RegisterError } from "../../services/authService"
import { useNavigate } from "react-router-dom"
import { FeedbackModal } from "../../components/FeedbackModal/FeedbackModal"

import illustration from "../../assets/register-illustration.svg"
import eyeOpen from "../../assets/eye-open.svg"
import eyeClosed from "../../assets/eye-closed.svg"

function getRegisterErrorMessage(error: unknown) {
    if(error instanceof RegisterError) {
        const errorMessages = {
            EMAIL_ALREADY_EXISTS: "Este e-mail já está cadastrado",
            WEAK_PASSWORD: "A senha deve ter pelo menos 6 caracteres",
            NETWORK_ERROR: "Não foi possível conectar. Tente novamente em instantes."
        }

        return errorMessages[error.code]
    }

    return "Erro ao criar conta"
}


function Register() {
    useEffect(() => {document.title = "uTask 3.0 | Cadastro"}, [])

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [error, setError] = useState("")
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const passwordsDoNotMatch = password.length > 0 && confirmPassword.length > 0 && password !== confirmPassword
    const navigate = useNavigate()

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(isLoading) {
            return
        }

        setError("")
        const trimmedName = name.trim()
        const trimmedEmail = email.trim()

        if(!trimmedName || !trimmedEmail || !password.trim() || !confirmPassword.trim()) {
            setError("Preencha todos os campos")
            return
        }

        if(passwordsDoNotMatch) {
            setError("As senhas não coincidem")
            return
        }

        try {
            setIsLoading(true)
            await register({name: trimmedName, email: trimmedEmail, password})
            setShowSuccessModal(true)
        } catch(error) {
            setError(getRegisterErrorMessage(error))
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(!showSuccessModal) {
            return
        }

        const redirectTimeout = setTimeout(() => {
            setShowSuccessModal(false)
            navigate("/login")
        }, 3000);

        return () => {clearTimeout(redirectTimeout)}
    }, [showSuccessModal, navigate])

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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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

                            {error && (<p className="register-error-message">{error}</p>)}

                            <button type="submit" className="register-button" disabled={isLoading}>
                                {isLoading ? "Criando conta..." : "Criar cadastro"}
                            </button>

                        </form>

                    </div>
                </div>

                <div className="register-divider"></div>

                <div className="register-image">
                    <img
                        src={illustration}
                        alt="Ilustração de cadastro"
                        loading="eager"
                        fetchPriority="high"
                    />
                </div>
            </div>
        </main>

        {showSuccessModal && (<FeedbackModal
            title="Conta criada com sucesso"
            message="Um instante, iremos te redirecionar ao login!"
            type="success" />)}
        </>
    )
}

export default Register
