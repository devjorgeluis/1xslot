import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "./LayoutContext";
import LoadApi from "../Loading/LoadApi";
import FilterModal from "../Modal/filterModal";
import ImgLogo from "/src/assets/svg/logo.svg";
import IconClose from "/src/assets/svg/close.svg";

const Header = ({
    isLogin,
    isMobile,
    userBalance,
    handleLoginClick,
    handleLogoutClick
}) => {
    const [isShowFilter, setIsShowFilter] = useState(false);
    const navigate = useNavigate();
    const [showMobileMenuContainer, setShowMobileMenuContainer] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const toggleMobileMenuContainer = () => {
        setShowMobileMenuContainer(!showMobileMenuContainer);
    };

    const menuItems = [
        {
            className: "menu-button profile-button",
            link: "/profile",
            icon: "account_circle",
            title: "Perfil"
        },
        {
            className: "menu-button balances-button",
            link: "/profile/balance",
            icon: "account_balance_wallet",
            title: "Saldos de la cuenta"
        },
        {
            className: "menu-button transactions-button",
            link: "/profile/history",
            icon: "format_list_bulleted",
            title: "Transacciones"
        },
        {
            className: "menu-button logout-button",
            link: "",
            icon: "logout",
            title: "Cerrar sesión"
        }
    ];

    return (
        <>
            {showFilterModal && (
                <FilterModal
                    isMobile = {isMobile}
                    onClose={() => setShowFilterModal(false)}
                />
            )}
            <div className="header">
                <div className="header-container">
                    <div className="headerLeft">
                        <a aria-current="page" className="linkCss active" onClick={() => navigate("/")}>
                            <img alt="logo" className="logo light-logo" src={ImgLogo} width={100} />
                        </a>
                    </div>
                    <div className="headerRight">
                        <i className="material-icons" onClick={() => setShowFilterModal(true)}>search</i>
                        <i className="material-icons" onClick={() => navigate("/profile")}>account_circle</i>
                    </div>
                </div>
                {
                    !isLogin && <div className="login-header-container">
                        <button className="login-btn" onClick={() => navigate("/login")}>Acceso</button>
                    </div>
                }
            </div>
        </>
    );
};

export default Header;
