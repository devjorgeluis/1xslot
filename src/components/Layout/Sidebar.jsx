import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutContext } from "./LayoutContext";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import ImgLogo from "/src/assets/svg/logo.svg";

const Sidebar = ({ isSlotsOnly, isMobile }) => {
    const { isSidebarExpanded, toggleSidebar } = useContext(LayoutContext);
    const { contextData } = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const isSportsPage = location.pathname === "/sports" || location.pathname === "/live-sports";
    const [expandedMenus, setExpandedMenus] = useState([""]);
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const [currentLanguage, setCurrentLanguage] = useState({ code: "es", name: "Spanish" });
    const [liveCasinoMenus, setLiveCasinoMenus] = useState([]);
    const [hasFetchedLiveCasino, setHasFetchedLiveCasino] = useState(false);
    const [activeSubmenuItem, setActiveSubmenuItem] = useState("");

    const languages = [
        { code: "en", name: "English" },
        { code: "de", name: "German" },
        { code: "ja", name: "Japanese" },
        { code: "fr", name: "French" },
        { code: "nl", name: "Dutch" },
        { code: "pt", name: "Portuguese" },
        { code: "tr", name: "Turkish" },
        { code: "es", name: "Spanish" },
        { code: "ko", name: "Korean" },
        { code: "it", name: "Italian" },
        { code: "el", name: "Greek" },
        { code: "ar", name: "Arabic" },
        { code: "zh", name: "Chinese" },
        { code: "cs", name: "Czech" }
    ];

    const toggleMenu = (menuName) => {
        setExpandedMenus(prev =>
            prev.includes(menuName)
                ? prev.filter(item => item !== menuName)
                : [...prev, menuName]
        );
    };

    const isMenuExpanded = (menuName) => {
        return expandedMenus.includes(menuName);
    };

    const toggleLanguageDropdown = () => {
        setShowLanguageDropdown(!showLanguageDropdown);
    };

    const closeLanguageDropdown = () => {
        setShowLanguageDropdown(false);
    };

    const handleLanguageSelect = (languageCode) => {
        var language = languages.find(lang => lang.code === languageCode) || currentLanguage;
        setCurrentLanguage(language);
        closeLanguageDropdown();
    };

    useEffect(() => {
        if (!hasFetchedLiveCasino) {
            getPage("livecasino");
        }

        const hash = location.hash;
        if (hash && hash.startsWith('#')) {
            const categoryCode = hash.substring(1);
            setActiveSubmenuItem(categoryCode);

            if (location.pathname === '/live-casino' && !expandedMenus.includes('live-casino')) {
                setExpandedMenus(prev => [...prev, 'live-casino']);
            }
        } else {
            setActiveSubmenuItem("");
        }

        window.scrollTo(0, 0);
    }, [location.pathname, location.hash, hasFetchedLiveCasino]);

    const getPage = (page) => {
        callApi(contextData, "GET", "/get-page?page=" + page, callbackGetPage, null);
    };

    const callbackGetPage = (result) => {
        if (result.status === 500 || result.status === 422) {

        } else {
            let menus = [{
                name: "Home",
                code: "home",
                id: null,
                table_name: null,
                href: "/live-casino#home"
            }];
            result.data.categories.forEach(element => {
                menus.push({
                    name: element.name,
                    icon: element.image_local != null && element.image_local !== "" && contextData.cdnUrl + element.image_local,
                    href: "/live-casino#" + element.code
                })
            });
            setLiveCasinoMenus(menus);
            setHasFetchedLiveCasino(true);
        }
    };

    const isSlotsOnlyMode = isSlotsOnly === "true" || isSlotsOnly === true;

    const menuItems = !isSlotsOnlyMode ? [
        {
            id: 'casino',
            name: 'Casino',
            icon: 'custom-icon-bp-casino',
            href: '/casino',
            subItems: [
                { name: 'Lobby', icon: 'custom-icon-bp-home', href: '/casino#home' },
                { name: 'Hot', icon: 'custom-icon-bp-fire', href: '/casino#hot' },
                { name: 'Jokers', icon: 'custom-icon-spades', href: '/casino#joker' },
                { name: 'Juegos de crash', icon: 'custom-icon-scale', href: '/casino#arcade' },
                { name: 'Megaways', icon: 'custom-icon-bp-megaways', href: '/casino#megaways' },
                { name: 'Ruletas', icon: 'custom-icon-bingo', href: '/casino#roulette' },
            ]
        },
        {
            id: 'live-casino',
            name: 'Casino en Vivo',
            icon: 'custom-icon-bp-live-casino',
            href: '/live-casino',
            subItems: liveCasinoMenus
        },
        {
            id: 'sports',
            name: 'Deportes',
            icon: 'custom-icon-bp-sports',
            href: '/sports',
            subItems: [
                { name: 'Home', icon: 'custom-icon-bp-home', href: '/sports' },
                { name: 'Live', icon: 'custom-icon-bp-live', href: '/live-sports' }
            ]
        }
    ] : [
        {
            id: 'casino',
            name: 'Casino',
            icon: 'custom-icon-bp-casino',
            href: '/casino',
            subItems: [
                { name: 'Lobby', icon: 'custom-icon-bp-home', href: '/casino#home' },
                { name: 'Hot', icon: 'custom-icon-bp-fire', href: '/casino#hot' },
                { name: 'Jokers', icon: 'custom-icon-spades', href: '/casino#joker' },
                { name: 'Juegos de crash', icon: 'custom-icon-scale', href: '/casino#arcade' },
                { name: 'Megaways', icon: 'custom-icon-bp-megaways', href: '/casino#megaways' },
                { name: 'Ruletas', icon: 'custom-icon-bingo', href: '/casino#roulette' },
            ]
        }
    ];

    const collapsedMenuItems = !isSlotsOnlyMode ? [
        { name: 'casino', icon: 'custom-icon-bp-casino', href: '/casino' },
        { name: 'live-casino', icon: 'custom-icon-bp-live-casino', href: '/live-casino' },
        { name: 'sports', icon: 'custom-icon-bp-sports', href: '/sports' }
    ] : [
        { name: 'casino', icon: 'custom-icon-bp-casino', href: '/casino' }
    ];

    return (
        <>
            <div className="column">
                <div className="column__body">

                    <div className="column__header">
                        <a href="/" className="column__logo"><img src={ImgLogo} alt="Logo de la compañía" title="Ir a la página de Inicio" className="column__img" /></a>
                    </div>
                    <div className="column__action">
                        <button id="curLoginForm" className="btn btn--transparent curloginDropTop">
                            Iniciar sesión
                        </button>
                        <button className="btn btn--second register_button_main">
                            Registro
                        </button>
                    </div>
                    <div className="column-menu column__menu scrollbar">
                        <a href="/" className="column-menu__link active">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#home"></use></svg>
                            </div>

                            Página principal
                        </a>
                        <a href="slots/" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#cherry"></use></svg>
                            </div>

                            Tragamonedas
                        </a>
                        <a href="casino/" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#live_casino"></use></svg>
                            </div>

                            Casino en Directo
                        </a>
                        <a href="/games" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#games-left"></use></svg>
                            </div>

                            Games
                        </a>
                        <a href="bonus/rules" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#promo"></use></svg>
                            </div>

                            Promoción
                        </a>
                        <a href="/bonus/casino/tournaments" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#cup"></use></svg>
                            </div>

                            Torneos
                        </a>
                        <a href="bonus/casino/bonus-system-guide" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#bonus-system-guide"></use></svg>
                            </div>

                            Guía de bonos
                        </a>
                        <a href="bonus/casino/tasks-app" className="column-menu__link">
                            <div className="column-menu__item">
                                <svg className="column-menu__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#tasks-app"></use></svg>
                            </div>

                            Tareas en la aplicación
                        </a>
                    </div>
                </div>
                <div className="column-support">

                    <div className="time-block-gmt">
                        <p className="time-block-gmt__title">
                            Hora del casino:
                        </p>
                        <div className="time-block-gmt__value">
                            <span className="time-block-gmt__date">
                                Mon, Oct 20
                            </span>
                            <span className="time-block-gmt__time">
                                19:01(GMT)
                            </span>
                        </div>
                    </div>
                    <div className="column-support__row">
                        <a href="https://1xslot.com/downloads/androidclient/releases_android/1xSlots/site/1xSlots.apk" className="column-support__link">
                            <svg className="column-support__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#android"></use></svg>
                        </a>
                        <a href="/mobile" className="column-support__link">
                            <svg className="column-support__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#apple"></use></svg>
                        </a>
                    </div>
                    <div className="column-support__row">
                        <div className="column-support__link">
                            <div className="column-support__inner">
                                <svg className="column-support__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#support"></use></svg>
                            </div>

                        </div>
                        <div id="languages_block" className="column-support__link">
                            <div className="column-support__language">
                                <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#es"></use></svg>
                                <svg aria-hidden="true" className="column-support__arrow"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#arrow-bottom"></use></svg>
                            </div>
                            <div className="dropdown dropdown--lang dropdown-language d-none">
                                <a title="العربية" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#ar"></use></svg> <span className="dropdown-language__name">ar</span>
                                </a>
                                <a title="Azərbaycan dili" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#az"></use></svg> <span className="dropdown-language__name">az</span>
                                </a>
                                <a title="বাংলা" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#bn"></use></svg> <span className="dropdown-language__name">bd</span>
                                </a>
                                <a title="Português (Brasil)" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#br"></use></svg> <span className="dropdown-language__name">br</span>
                                </a>
                                <a title="汉语" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#cn"></use></svg> <span className="dropdown-language__name">cn</span>
                                </a>
                                <a title="Deutsch" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#de"></use></svg> <span className="dropdown-language__name">de</span>
                                </a>
                                <a title="English" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#en"></use></svg> <span className="dropdown-language__name">en</span>
                                </a>
                                <a title="Español" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#es"></use></svg> <span className="dropdown-language__name">es</span>
                                </a>
                                <a title="Français" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#fr"></use></svg> <span className="dropdown-language__name">fr</span>
                                </a>
                                <a title="עברית" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#he"></use></svg> <span className="dropdown-language__name">he</span>
                                </a>
                                <a title="हिन्दी" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#hi"></use></svg> <span className="dropdown-language__name">hi</span>
                                </a>
                                <a title="Magyar nyelv" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#hu"></use></svg> <span className="dropdown-language__name">hu</span>
                                </a>
                                <a title="Bahasa Indonesia" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#id"></use></svg> <span className="dropdown-language__name">id</span>
                                </a>
                                <a title="日本語" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#ja"></use></svg> <span className="dropdown-language__name">jp</span>
                                </a>
                                <a title="한국어" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#ko"></use></svg> <span className="dropdown-language__name">kr</span>
                                </a>
                                <a title="Bahasa Melayu" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#ms"></use></svg> <span className="dropdown-language__name">ms</span>
                                </a>
                                <a title="Español mexicano" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#mx"></use></svg> <span className="dropdown-language__name">mx</span>
                                </a>
                                <a title="Português" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#pt"></use></svg> <span className="dropdown-language__name">pt</span>
                                </a>
                                <a title="Русский" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#ru"></use></svg> <span className="dropdown-language__name">ru</span>
                                </a>
                                <a title="Somali - English" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#so"></use></svg> <span className="dropdown-language__name">so</span>
                                </a>
                                <a title="Tagalog" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#tl"></use></svg> <span className="dropdown-language__name">tl</span>
                                </a>
                                <a title="Türkçe" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#tr"></use></svg> <span className="dropdown-language__name">tr</span>
                                </a>
                                <a title="漢語" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#tw"></use></svg> <span className="dropdown-language__name">tw</span>
                                </a>
                                <a title="Українська мова" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#ua"></use></svg> <span className="dropdown-language__name">ua</span>
                                </a>
                                <a title="Oʻzbek tili" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#uz"></use></svg> <span className="dropdown-language__name">uz</span>
                                </a>
                                <a title="Tiếng Việt" className="dropdown-language__item">
                                    <svg aria-hidden="true" className="dropdown-language__ico"><use xlinkHref="/genfiles/cms/desktop/all-types-images/flags-sprite.svg#vi"></use></svg> <span className="dropdown-language__name">vi</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="column-support__row column-support-social">
                        <div className="column-support-social__content column-social-content">
                            <ul className="column-social-content__list">
                                <li className="column-social-content__item">
                                    <a target="_blank" href="https://t.me/+aC3UrOGZmANjY2Iy" className="column-social-content__link g-analytics-social--telegram">
                                        <svg className="column-social-content__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#tg"></use></svg>
                                    </a>
                                </li>
                                <li className="column-social-content__item">
                                    <a target="_blank" href="https://t.me/+Rp1KFRam2CxhZDky" className="column-social-content__link g-analytics-social--telegramchat">
                                        <svg className="column-social-content__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#telegramchat"></use></svg>
                                    </a>
                                </li>
                                <li className="column-social-content__item">
                                    <a target="_blank" href="https://www.instagram.com/1xslotslatam/" className="column-social-content__link g-analytics-social--instagram">
                                        <svg className="column-social-content__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#in"></use></svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
