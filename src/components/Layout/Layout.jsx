import { useContext, useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../AppContext";
import { LayoutContext } from "./LayoutContext";
import { callApi } from "../../utils/Utils";
import Sidebar from "./Sidebar";
import SupportModal from "../Modal/SupportModal";
import { NavigationContext } from "./NavigationContext";

const Layout = () => {
    const { contextData } = useContext(AppContext);
    const [selectedPage, setSelectedPage] = useState("lobby");
    const [isLogin, setIsLogin] = useState(contextData.session !== null);
    const [isMobile, setIsMobile] = useState(false);
    const [userBalance, setUserBalance] = useState("");
    const [supportWhatsApp, setSupportWhatsApp] = useState("");
    const [supportTelegram, setSupportTelegram] = useState("");
    const [supportEmail, setSupportEmail] = useState("");
    const [supportParent, setSupportParent] = useState("");
    const [showSupportModal, setShowSupportModal] = useState(false);
    const [supportParentOnly, setSupportParentOnly] = useState(false);
    const [isSlotsOnly, setIsSlotsOnly] = useState("");
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    useEffect(() => {
        if (contextData.session != null) {
            setIsLogin(true);
            if (contextData.session.user && contextData.session.user.balance) {
                setUserBalance(contextData.session.user.balance);

                setSupportWhatsApp(contextData.session.support_whatsapp || "");
                setSupportTelegram(contextData.session.support_telegram || "");
                setSupportEmail(contextData.session.support_email || "");
                setSupportParent(contextData.session.support_parent || "");
            }

            refreshBalance();
        }
        getStatus();
    }, [contextData.session]);

    useEffect(() => {
        const checkIsMobile = () => {
            return window.innerWidth <= 767;
        };
        setIsMobile(checkIsMobile());

        const handleResize = () => {
            setIsMobile(checkIsMobile());
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const refreshBalance = () => {
        setUserBalance("");
        callApi(contextData, "GET", "/get-user-balance", callbackRefreshBalance, null);
    };

    const callbackRefreshBalance = (result) => {
        setUserBalance(result && result.balance);
    };

    const getStatus = () => {
        callApi(contextData, "GET", "/get-status", callbackGetStatus, null);
    };

    const getPage = (page) => {
        setSelectedPage(page);
        callApi(contextData, "GET", "/get-page?page=" + page, callbackGetPage, null);
        navigate("/" + (page === "home" ? "" : page));
    };

    const callbackGetPage = () => {
        
    };

    const callbackGetStatus = (result) => {
        if ((result && result.slots_only == null) || (result && result.slots_only == false)) {
            setIsSlotsOnly("false");
        } else {
            setIsSlotsOnly("true");
        }

        setSupportWhatsApp(result && result.support_whatsapp ? result.support_whatsapp : "");
        setSupportTelegram(result && result.support_telegram ? result.support_telegram : "");
        setSupportEmail(result && result.support_email ? result.support_email : "");
        setSupportParent(result && result.support_parent ? result.support_parent : "");

        if (result && result.user === null) {
            localStorage.removeItem("session");
        }
    };

    const handleLogoutClick = () => {
        callApi(contextData, "POST", "/logout", (result) => {
            if (result.status === "success") {
                setTimeout(() => {
                    localStorage.removeItem("session");
                    window.location.href = "/";
                }, 200);
            }
        }, null);
    };

    const openSupportModal = (parentOnly = false) => {
        setSupportParentOnly(Boolean(parentOnly));
        setShowSupportModal(true);
    };

    const closeSupportModal = () => {
        setShowSupportModal(false);
        setSupportParentOnly(false);
    };

    const layoutContextValue = {
        isLogin,
        userBalance,
        supportWhatsApp,
        supportTelegram,
        supportEmail,
        openSupportModal,
        handleLogoutClick,
        refreshBalance,
        isSidebarExpanded,
        toggleSidebar,
        showMobileSearch,
        setShowMobileSearch
    };

    return (
        <LayoutContext.Provider value={layoutContextValue}>
            <NavigationContext.Provider
                value={{ selectedPage, setSelectedPage, getPage }}
            >
                <>
                    <div className="page">
                        <Sidebar isSlotsOnly={isSlotsOnly} isMobile={isMobile} supportParent={supportParent}
                        openSupportModal={openSupportModal} />
                        <div className="page__wrap">
                            <main className="main">
                                <Outlet context={{ isSlotsOnly, isLogin, isMobile, supportParent, openSupportModal }} />
                            </main>
                            <SupportModal
                                isOpen={showSupportModal}
                                onClose={closeSupportModal}
                                supportWhatsApp={supportWhatsApp}
                                supportTelegram={supportTelegram}
                                supportEmail={supportEmail}
                                supportParentOnly={supportParentOnly}
                                supportParent={supportParent}
                            />
                        </div>
                    </div>
                </>
            </NavigationContext.Provider>
        </LayoutContext.Provider>
    );
};

export default Layout;
