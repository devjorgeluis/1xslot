import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const providerLogos = [
    {
        href: "slots/?products=%5B323%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/140599367e25275c31b876fa5394b211/Pragmatic-Play_Dropdown.png",
        alt: "Pragmatic Play",
    },
    {
        href: "slots/?products=%5B314%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/d50e374b371a2be15b10ff783e11046e/140.png",
        alt: "PG Soft",
    },
    {
        href: "slots/?products=%5B128%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/brands/thumb/3_Oaks/Dropdown.png",
        alt: "3 Oaks",
    },
    {
        href: "slots/?products=%5B183%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/ab10afe0f655e7394715c4d6696ca08d/Hacksaw-DropDown.png",
        alt: "Hacksaw Gaming",
    },
    {
        href: "slots/?products=%5B317%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/a6e0d54671c14f400096ba0c257f76f2/Playn-Go-dropdwon.png",
        alt: "Play'n Go",
    },
    {
        href: "slots/?products=%5B376%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/0afd55eafd54c85963fce782b1894311/Amusnet_Dropdown.png",
        alt: "Amusnet",
    },
    {
        href: "slots/?products=%5B6%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/e7858e0c8ed1bfc826130d11bc70a9e1/Endorphina_Dropdown.png",
        alt: "Endorphina",
    },
    {
        href: "slots/?products=%5B203%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/brands/thumb/Belatra/Dropdown2.png",
        alt: "Belatra",
    },
    {
        href: "slots/?products=%5B319%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/brands/thumb/Playson/Dropdown.png",
        alt: "Playson",
    },
    {
        href: "slots/?products=%5B112%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/ff031aa4f5b9c45eb5167a3fe81141a4/Fazi_Dropdown.png",
        alt: "Fazi",
    },
    {
        href: "slots/?products=%5B476%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/0bf485e989e45152e84458d35342f31b/Voltent_Dropdown.png",
        alt: "VoltEnt",
    },
    {
        href: "slots/?products=%5B226%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/brands/thumb/BGaming/Dropdown.png",
        alt: "BGaming",
    },
    {
        href: "slots/?products=%5B304%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/851e6fbcbb72cc5feba74aa6a2ae537d/NoLimit_City_Slots_Ireland_Dropdown.png",
        alt: "Nolimit City",
    },
    {
        href: "slots/?products=%5B49%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/99f7b120d9a0daeb0e442e9bc7e99860/Aviator_Dropdown.png",
        alt: "Aviator",
    },
    {
        href: "slots/?products=%5B337%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/8fe3663d015c674c40313f25c991e7fc/Red_Tiger_Dropdown.png",
        alt: "Red Tiger",
    },
    {
        href: "slots/?products=%5B223%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/brands/thumb/KA_Gaming/Dropdown.png",
        alt: "KA Gaming",
    },
    {
        href: "slots/?products=%5B35%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/7c82502ad859d4a17edf8b7f3a13d59a/140.png",
        alt: "Smartsoft",
    },
    {
        href: "slots/?products=%5B298%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/7eff773bde1724f226f1a23a1fe80615/Netent-Ireland-DropDown.png",
        alt: "NetEnt",
    },
    {
        href: "slots/?products=%5B299%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/161396a7ab0784a96c70a7c3ac200edd/140.png",
        alt: "Netgame",
    },
    {
        href: "slots/?products=%5B10%5D",
        src: "https://v2l.traincdn.com/genfiles/third-party-files/4cfa9d12e94ea336e27a0491a158e226/140.png",
        alt: "Ruby Play",
    },
];

const paymentLogos = [
    { icon: "astropay" },
    { icon: "visa" },
    { icon: "mastercard" },
    { icon: "maestro" },
    { icon: "piastrix" },
    { icon: "moneygo" },
    { icon: "sbp" },
    { icon: "pix" },
    { icon: "vodafone" },
    { icon: "tetherontron" },
];

const Footer = ({ isSlotsOnly }) => {
    const navigate = useNavigate();

    return (
        <>
            <div id="footer">
                <div className="footer">
                    <div className="footer__col">
                        <div className="footer__info footer-info">
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    Juegue en 1xSlots
                                </p>
                                <p className="footer-info__text">
                                    Nuestro <strong>casino online</strong> ofrece más de 11 000 juegos de 100 proveedores populares. Pase un fantástico rato en nuestro <strong>casino en directo</strong>, ya sea jugando a las
                                    <strong>tragamonedas con jugosos jackpots</strong>, póker o probando suerte en otros <strong>juegos de mesa</strong>. ¿Busca una experiencia de juego móvil cómoda y accesible? Descárguese nuestra aplicación para Android.
                                    ¡Regístrese en 1xSlots y ¡consiga un generoso bono de bienvenida y <strong>giros gratis!</strong>!
                                </p>
                            </div>
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    Live Casino de 1xSlots
                                </p>
                                <p className="footer-info__text">
                                    Descubra nuestro Casino en Directo y sumérjase en su emocionante jugabilidad. Los amables crupieres estarán encantados de jugar con usted una partida de póker, blackjack, baccarat o ruleta. Pruebe suerte con la Ruleta de la
                                    Fortuna y otros fantásticos juegos de TV. Disfrute de la experiencia 1xSlots: ¡consiga bonos, haga apuestas y gane!
                                </p>
                            </div>
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    Tragamonedas de 1xSlots
                                </p>
                                <p className="footer-info__text">
                                    1xSlots ofrece clásicas <strong>tragamonedas online</strong> y nuevos juegos de los líderes de la industria. Todo el mundo puede saborear la victoria con un elevado RTP (retorno al jugador) de hasta el 96%. ¡Juegue a las
                                    excitantes tragamonedas para poder ganar el jackpot!
                                </p>
                            </div>
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    Juego Responsable
                                </p>
                                <p className="footer-info__text">
                                    El juego puede ser perjudicial si no está controlado. Consulte la página de <a href="/information/rules/10">Juego Responsable</a> para obtener más información y conocer las herramientas disponibles para el juego responsable.
                                    <br />
                                    18+ Juegue de manera responsable: <a href="http://www.gamblersanonymous.org/">www.gamblersanonymous.org</a>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="footer__col">
                        <div className="footer-menu footer__item">
                            <div className="footer-menu__col">
                                <p className="footer-menu__title">
                                    Juegos
                                </p>
                                <ul className="footer-menu__list">
                                    <li className="footer-menu__item"><a href="/casino" target="_self" className="footer-menu__link">Casino</a></li>
                                    <li className="footer-menu__item"><a href="/live-casino" target="_self" className="footer-menu__link">Casino en vivo</a></li>
                                    <li className="footer-menu__item"><a href="/sports" target="_self" className="footer-menu__link">Deportes</a></li>
                                    <li className="footer-menu__item"><a href="/live-sports" target="_self" className="footer-menu__link">Deportes en vivo</a></li>
                                </ul>
                            </div>
                            <div className="footer-menu__col">
                                <p className="footer-menu__title">
                                    Información
                                </p>
                                <ul className="footer-menu__list">
                                    <li className="footer-menu__item"><a href="/information/about" target="_self" className="footer-menu__link">Quiénes somos</a></li>
                                    <li className="footer-menu__item"><a href="/information/contacts" target="_self" className="footer-menu__link">Contacto</a></li>
                                    <li className="footer-menu__item"><a href="/information/rules" target="_self" className="footer-menu__link">Términos y Condiciones</a></li>
                                    <li className="footer-menu__item"><a href="/information/rules/9" target="_self" className="footer-menu__link">Términos y condiciones de los bonos</a></li>
                                    <li className="footer-menu__item"><a href="/information/rules/10" target="_self" className="footer-menu__link">Juego Responsable</a></li>
                                    <li className="footer-menu__item"><a href="https://1xslotspartners.com" target="_self" className="footer-menu__link">Programa de Afiliados</a></li>
                                    <li className="footer-menu__item"><a href="https://1xslotsagent.shop" target="_self" className="footer-menu__link">Hacerse agente de pagos</a></li>
                                    <li className="footer-menu__item"><a href="/information/rules/6" target="_self" className="footer-menu__link">Política de privacidad</a></li>
                                    <li className="footer-menu__item"><a href="/?platform_type=mobile" target="_self" className="footer-menu__link">Versión móvil</a></li>
                                </ul>
                            </div>

                            <button tabIndex="-1" title="Back to top" aria-label="Back to top" className="footer-menu__btn footer-menu-btn">
                                <svg className="footer-menu-btn__ico"><use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#arrow-up"></use></svg>
                            </button>
                        </div>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={5}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            className="footer-logo footer__item footer__logo"
                        >
                            {providerLogos.map((logo, index) => (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <a href={logo.href} className="footer-logo__item">
                                        <img
                                            src={logo.src}
                                            alt={logo.alt}
                                            className="footer-logo__img"
                                        />
                                    </a>
                                </SwiperSlide>
                            ))}
                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                        </Swiper>
                        <Swiper
                            modules={[Pagination, Autoplay]}
                            spaceBetween={10}
                            slidesPerView={5}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            className="footer-logo footer__item footer__logo"
                        >
                            {paymentLogos.map((logo, index) => (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <svg className="footer-logo__svg">
                                        <use xlinkHref={`/genfiles/cms/99-61/desktop/media_asset/payments.svg#${logo.icon}`}></use>
                                    </svg>
                                </SwiperSlide>
                            ))}
                            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                        </Swiper>
                        <div className="footer-bottom">
                            <div className="footer-bottom__item footer-bottom__item--center">
                                <div className="footer-bottom__support">
                                    <span>
                                        Contact Information:
                                    </span>
                                    <a href="mailto:support@1xslot.com" className="footer-bottom__link">
                                        support@1xslot.com
                                    </a>
                                </div>
                                <div className="footer-bottom__text">
                                    <div className="footer-bottom__lists">
                                        <div className="footer-bottom__list">
                                            <div className="footer-bottom__license">
                                                <p>
                                                    <span style={{ fontSize: "14px", fontFamily: "Roboto", color: "rgba(214, 214, 214, 0.98)" }}>
                                                        1xslot.com is operated by Orakum N.V., a company incorporated under the laws of Curaçao with Company Number 141651, registered at Abraham Mendez Chumaceiro Boulevard 03, Willemstad, 4750,
                                                        Curaçao, and licensed by the Curaçao Gaming Authority to offer games of chance under license number OGL/2024/586/0786 in accordance with the National Ordinance on Games of Chance
                                                        (Landsverordening op de kansspelen, P.B. 2024, no. 157). The license was granted on March 28, 2025. Payments are processed by Zavbin LTD (registration number HE 400081, registered at Agias Zonis,
                                                        22B, Limassol, 3027, Cyprus) and Maira LTD (registration number HE 448572, registered at Vyzantiou 39, Flat/Office 31, Nicosia, Strovolos, 2064, Cyprus), acting as payment agents on behalf of Orakum
                                                        N.V. All rights reserved and protected by law.
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <span className="footer-bottom__copy">
                                        © 2025 1xSlots. All rights reserved.
                                    </span>
                                </div>
                            </div>
                            <div className="footer-bottom__item footer-bottom__item--line">
                                <div className="footer-bottom__title">
                                    Play Responsibly and in Moderation
                                </div>
                                <div className="footer-bottom__images">
                                    <div>
                                        <a
                                            href="https://cert.gcb.cw/certificate?id=ZXlKcGRpSTZJaXRrYm10V2VEbGtVWE41YjFsTVR6VktOVlI2YzBFOVBTSXNJblpoYkhWbElqb2lTblJVVHpoNlJtczJiVU5GZWxKdVZrTktSalp4ZHowOUlpd2liV0ZqSWpvaVptSXdPVEZoWmpsbE5tUXlZekZoT0dJM01XVTFOR001TmpabU1qZzJaV1UwT0RZMVpXUmpNVEprTWpJM09UZzBNbUUzTnpVeU5qRmpZbUZtWlRWaU1TSXNJblJoWnlJNklpSjk="
                                            className="footer-bottom__link"
                                        >
                                            <img src="https://v2l.traincdn.com/genfiles/license-images/2025-04-09_15-03-35_phpD6nGl8.svg" alt="GCB logo" width="150" height="85" className="footer-bottom__img" />
                                        </a>
                                    </div>
                                    <div className="footer-age">
                                        18+
                                    </div>
                                    <div id="apg-15ffe01c-a9d2-46f8-94f5-0142c261a191" data-apg-seal-id="15ffe01c-a9d2-46f8-94f5-0142c261a191" data-apg-image-size="70" data-apg-image-type="basic-small"></div>
                                    <img src="https://v2l.traincdn.com/genfiles/cms/desktop/all-types-images/visa_mastercard.png" alt="Visa and Mastercard" className="footer-bottom__img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Footer;