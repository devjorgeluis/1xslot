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
                                    Play at 1xSlots
                                </p>
                                <p className="footer-info__text">
                                    Our <strong>online casino</strong> offers over 11,000 games from 100 popular providers. Enjoy a fantastic time at our <strong>live casino</strong>, whether playing
                                    <strong>slots with juicy jackpots</strong>, poker, or trying your luck at other <strong>table games</strong>. Looking for a convenient and accessible mobile gaming experience? Download our Android app. Sign up at 1xSlots and claim a generous welcome bonus and <strong>free spins</strong>!
                                </p>
                            </div>
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    1xSlots Live Casino
                                </p>
                                <p className="footer-info__text">
                                    Discover our Live Casino and immerse yourself in its thrilling gameplay. Friendly dealers are ready to play poker, blackjack, baccarat, or roulette with you. Try your luck with Wheel of Fortune and other exciting TV games. Enjoy the 1xSlots experience: claim bonuses, place bets, and win!
                                </p>
                            </div>
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    1xSlots Slots
                                </p>
                                <p className="footer-info__text">
                                    1xSlots offers classic <strong>online slots</strong> and new games from industry leaders. Everyone can taste victory with a high RTP (return to player) of up to 96%.
                                    Play exciting slots to win the jackpot!
                                </p>
                            </div>
                            <div className="footer-info__col">
                                <p className="footer-info__title">
                                    Responsible Gaming
                                </p>
                                <p className="footer-info__text">
                                    Gambling can be harmful if not controlled. Visit the <a href="information/rules/10">Responsible Gaming</a> page for more information and tools for responsible gaming.<br />
                                    18+ Play responsibly: <a href="http://www.gamblersanonymous.org/">www.gamblersanonymous.org</a>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="footer__col">
                        <div className="footer-menu footer__item">
                            <div className="footer-menu__col">
                                <p className="footer-menu__title">
                                    Promotions
                                </p>
                                <ul className="footer-menu__list">
                                    <li className="footer-menu__item"><a href="bonus/rules" target="_self" className="footer-menu__link">Special Offers</a></li>
                                    <li className="footer-menu__item"><a href="bonus/casino/tournaments" target="_self" className="footer-menu__link">Tournaments</a></li>
                                    <li className="footer-menu__item"><a href="bonus/casino/tasks-app" target="_self" className="footer-menu__link">App Tasks</a></li>
                                </ul>
                            </div>
                            <div className="footer-menu__col">
                                <p className="footer-menu__title">
                                    Live Casino
                                </p>
                                <ul className="footer-menu__list">
                                    <li className="footer-menu__item"><a href="casino/roulette" target="_self" className="footer-menu__link">Roulette</a></li>
                                    <li className="footer-menu__item"><a href="casino/blackjack" target="_self" className="footer-menu__link">Blackjack</a></li>
                                    <li className="footer-menu__item"><a href="casino/poker" target="_self" className="footer-menu__link">Poker</a></li>
                                    <li className="footer-menu__item"><a href="casino/baccarat" target="_self" className="footer-menu__link">Baccarat</a></li>
                                    <li className="footer-menu__item"><a href="casino/other" target="_self" className="footer-menu__link">Other</a></li>
                                </ul>
                            </div>
                            <div className="footer-menu__col">
                                <p className="footer-menu__title">
                                    Slots
                                </p>
                                <ul className="footer-menu__list">
                                    <li className="footer-menu__item"><a href="slots/new" target="_self" className="footer-menu__link">New</a></li>
                                    <li className="footer-menu__item"><a href="slots/popular" target="_self" className="footer-menu__link">Popular</a></li>
                                    <li className="footer-menu__item"><a href="slots/feature-buy-bonus" target="_self" className="footer-menu__link">Buy Bonus</a></li>
                                    <li className="footer-menu__item"><a href="slots/mechanics-megaways" target="_self" className="footer-menu__link">Megaways</a></li>
                                    <li className="footer-menu__item"><a href="slots/feature-jackpot" target="_self" className="footer-menu__link">Jackpot</a></li>
                                    <li className="footer-menu__item"><a href="slots/exclusive-99" target="_self" className="footer-menu__link">Exclusive</a></li>
                                </ul>
                            </div>
                            <div className="footer-menu__col">
                                <p className="footer-menu__title">
                                    Information
                                </p>
                                <ul className="footer-menu__list">
                                    <li className="footer-menu__item"><a href="information/about" target="_self" className="footer-menu__link">About Us</a></li>
                                    <li className="footer-menu__item"><a href="information/contacts" target="_self" className="footer-menu__link">Contact</a></li>
                                    <li className="footer-menu__item"><a href="information/rules" target="_self" className="footer-menu__link">Terms and Conditions</a></li>
                                    <li className="footer-menu__item"><a href="information/rules/9" target="_self" className="footer-menu__link">Bonus Terms and Conditions</a></li>
                                    <li className="footer-menu__item"><a href="information/rules/10" target="_self" className="footer-menu__link">Responsible Gaming</a></li>
                                    <li className="footer-menu__item"><a href="https://1xslotspartners.com" target="_self" className="footer-menu__link">Affiliate Program</a></li>
                                    <li className="footer-menu__item"><a href="https://1xslotsagent.shop" target="_self" className="footer-menu__link">Become a Payment Agent</a></li>
                                    <li className="footer-menu__item"><a href="information/rules/6" target="_self" className="footer-menu__link">Privacy Policy</a></li>
                                    <li className="footer-menu__item"><a href="/?platform_type=mobile" target="_self" className="footer-menu__link">Mobile Version</a></li>
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