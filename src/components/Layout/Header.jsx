import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "./LayoutContext";
import LoadApi from "../Loading/LoadApi";
import ImgLogo from "/src/assets/svg/logo.svg";
import IconClose from "/src/assets/svg/close.svg";

const Header = ({
    isLogin,
    isMobile,
    userBalance,
    handleLoginClick,
    handleLogoutClick
}) => {
    const { isSidebarExpanded } = useContext(LayoutContext);
    const navigate = useNavigate();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLanguageMenu, setShowLanguageMenu] = useState(false);
    const [showMenuContainer, setShowMenuContainer] = useState(false);
    const [showMobileMenuContainer, setShowMobileMenuContainer] = useState(false);
    const [isLogoutLoading, setIsLogoutLoading] = useState(false);

    const closeUserMenu = () => {
        setShowUserMenu(false);
    };

    const toggleMenuContainer = () => {
        setShowMenuContainer(!showMenuContainer);
    };

    const toggleMobileMenuContainer = () => {
        setShowMobileMenuContainer(!showMobileMenuContainer);
    };

    const closeMenuContainer = () => {
        setShowMenuContainer(false);
    };

    const toggleLanguageMenu = () => {
        setShowLanguageMenu(!showLanguageMenu);
    };

    const closeLanguageMenu = () => {
        setShowLanguageMenu(false);
    };

    const handleLanguageSelect = () => {
        closeLanguageMenu();
    };

    const handleClickOutside = (event) => {
        if (!event.target.closest('.dropdown') && !event.target.closest('.user-menu-container') && !event.target.closest('.account-button') && !event.target.closest('.menuContainer')) {
            closeLanguageMenu();
            closeUserMenu();
            closeMenuContainer();
        }
    };

    useState(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

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
        <div className="headerWrapper">
            <div className="header-container">
                <div className="headerLeft">
                    <a aria-current="page" className="linkCss active" onClick={() => navigate("/")}>
                        <img alt="logo" className="logo light-logo" src={ImgLogo} width={100} />
                    </a>
                </div>
                <div className="headerRight">
                    {
                        isLogin ? <div className="loggedin">
                            <div className="loggedinContainer">
                                <div
                                    className="mobile-account-button"
                                    onClick={toggleMobileMenuContainer}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <i className="material-icons">account_circle</i>
                                </div>
                                {
                                    showMobileMenuContainer && <div className="menuContainer">
                                        <div className="menu">
                                            <div className="menu-title"></div>
                                            <div className="menu-close" onClick={toggleMobileMenuContainer}>
                                                <img src={IconClose} style={{ filter: 'invert(1)', width: '20px' }} />
                                            </div>
                                            <nav className="menuButtonWrapper">
                                                {menuItems.map((item, index) => (
                                                    <a 
                                                        key={index}
                                                        className={item.className}
                                                        onClick={() => {
                                                            if (item.link === "") {
                                                                setIsLogoutLoading(true);
                                                                handleLogoutClick();
                                                            } else {
                                                                navigate(item.link);
                                                                toggleMobileMenuContainer();
                                                            }
                                                        }}
                                                        style={{ position: 'relative' }}
                                                    >
                                                        <span className="icon">
                                                            {item.link === "" && isLogoutLoading ? "" : <i className="material-icons">{item.icon}</i> }
                                                        </span>
                                                        <span className="title">
                                                            {item.link === "" && isLogoutLoading ? <LoadApi /> : item.title}
                                                        </span>
                                                    </a>
                                                ))}
                                            </nav>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div> : <>
                            <i className="material-icons">search</i>
                            <i className="material-icons">account_circle</i>
                        </>
                    }
                </div>
            </div>
            <div className="login-container">
                <button className="login-btn">Acceso</button>
            </div>
        </div>
    );
};

export default Header;
