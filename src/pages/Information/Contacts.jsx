import ImgContact1 from "/src/assets/img/phone-contacts.webp";
import ImgContact2 from "/src/assets/img/phone-contacts.png";

const Contacts = () => {
    return <div class="information-contacts">
        <div class="information-contacts__col">
            <div class="information-contacts__box">
                <h2 class="information__title">
                    Contacto
                </h2>
                <div class="information-contacts__item">
                    <p class="information-contacts__title">
                        Soporte Técnico
                    </p>
                    <a href="mailto:support@1xslot.com" class="information-contacts__text">
                        support@1xslot.com
                    </a>
                </div>
                <div class="information-contacts__item">
                    <p class="information-contacts__title">
                        Reclamaciones y sugerencias
                    </p>
                    <a href="mailto:complaints@1xslot.com" class="information-contacts__text">
                        complaints@1xslot.com
                    </a>
                </div>
                <div class="information-contacts__item">
                    <p class="information-contacts__title">
                        Consultas sobre cooperación
                    </p>
                    <a href="mailto:support@partners1xslot.com" class="information-contacts__text">
                        support@partners1xslot.com
                    </a>
                </div>
                <div class="information-contacts__item">
                    <p class="information-contacts__title">
                        Hacerse agente de pagos
                    </p>
                    <a href="mailto:agentsbtmk@1xslot.com" class="information-contacts__text">
                        agentsbtmk@1xslot.com
                    </a>
                </div>
            </div>
        </div>
        <div class="information-contacts__wrap">
            <picture class="information-contacts__picture">
                <source src={ImgContact1} type="image/webp" />
                <img src={ImgContact2} alt="phone" class="information-contacts__img" />
            </picture>
        </div>
    </div>

}

export default Contacts;