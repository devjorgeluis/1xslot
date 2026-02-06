import { useOutletContext } from "react-router-dom";

const MenuContainer = () => {
    const { isSlotsOnly } = useOutletContext();

    return <>
        <div className="content__row">
            <div id="main_menu" className="content-menu">
                <a href="/" className="content-menu__item">
                    Lobby
                </a>
                <a href="/casino" className="content-menu__item active">
                    Tragamonedas
                </a>
                {
                    isSlotsOnly === "false" && <>
                        <a href="/live-casino" className="content-menu__item">
                            Casino en Directo
                        </a>
                        <a href="/sports" className="content-menu__item">Deportes</a>
                    </>
                }
            </div>
        </div>
    </>
}

export default MenuContainer;