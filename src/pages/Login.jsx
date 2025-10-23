import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import LoadApi from "../components/Loading/LoadApi";
import BackButton from "../components/BackButton";
import ImgLogo from "/src/assets/svg/logo.svg";
import "../css/Login.css";

const Login = () => {
    const { contextData, updateSession } = useContext(AppContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity()) {
            setIsLoading(true);

            let body = {
                username: username,
                password: password,
            };
            callApi(
                contextData,
                "POST",
                "/login/",
                callbackSubmitLogin,
                JSON.stringify(body)
            );
        }
        setErrorMsg("Invalid credentials");
    };

    const callbackSubmitLogin = (result) => {
        setIsLoading(false);
        if (result.status === "success") {
            localStorage.setItem("session", JSON.stringify(result));
            updateSession(result);

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            setErrorMsg("Correo electrónico o contraseña no válidos");
        }
    };

    useEffect(() => {
        const passwordInput = document.getElementById("password");
        if (passwordInput) {
            passwordInput.setAttribute("type", showPassword ? "text" : "password");
        }
    }, [showPassword]);

    return (
        <div className="login-container">
            <BackButton className="login-back-button" link="/" />
            {isLoading && <LoadApi isLoading={isLoading} />}
            
            <div className="login-form-container">
                <img src={ImgLogo} alt="1xSlot Logo" className="login-logo" />
                
                <form onSubmit={handleSubmit} className="login-form">
                    <h1 className="login-title">Acceso</h1>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Nombre de usuario"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="form-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-input"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <span className="material-icons">visibility_off</span> : <span className="material-icons">visibility</span>}
                        </button>
                    </div>
                    
                    <button type="submit" className="login-button">
                        Acceso
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;