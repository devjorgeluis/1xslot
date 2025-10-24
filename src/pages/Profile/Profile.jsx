import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../../AppContext";
import Header from "../../components/Auth/Header";

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { contextData } = useContext(AppContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="container account-page-container">
            <Header title="Mi cuenta" link="/" />
            <div className="account-content-container">
                {!contextData?.session ? (
                    <>
                        <div className="account-unauth">
                            <div className="avatar-large"><i className="material-icons">account_circle</i></div>
                            <h2 className="unauth-title">No has iniciado sesión</h2>
                            <p className="unauth-sub">Inicia sesión para acceder a todas las funciones de la aplicación</p>
                            <button className="login-btn" onClick={() => navigate('/login')}>Iniciar sesión</button>
                        </div>

                        <h3 className="section-title">Extra</h3>
                        <ul className="profile-actions">
                            <li onClick={() => navigate('/terms')}>
                                <i className="material-icons">flag</i>
                                Términos y condiciones
                            </li>
                        </ul>
                    </>
                ) : (
                    <>
                        <div className="account-card">
                            <div className="account-card-left" onClick={() => navigate("/personal-profile")}>
                                <div className="account-title">Cuenta principal <span className="account-id">{contextData.session.user?.id}</span></div>
                                <div className="account-balance">{parseFloat(contextData.session.user.balance).toFixed(2) || '0'} $</div>
                                <div className="account-sub">Ir al perfil</div>
                            </div>
                            <div className="account-card-right">
                                <button className="mail-btn"><i className="material-icons">email</i></button>
                            </div>
                        </div>

                        <h3 className="section-title">Transacciones</h3>
                        <ul className="profile-actions">
                            <li onClick={() => navigate('/profile/history')}><i className="material-icons">history</i>Historial de transacciones</li>
                        </ul>

                        <h3 className="section-title">Extra</h3>
                        <ul className="profile-actions">
                            <li onClick={() => navigate('/terms')}>
                                <i className="material-icons">flag</i>
                                Términos y condiciones
                            </li>
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;