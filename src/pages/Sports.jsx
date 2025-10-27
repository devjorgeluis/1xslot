import { useContext, useState, useEffect } from "react";
import { useLocation, useOutletContext } from "react-router-dom";
import { AppContext } from "../AppContext";
import { callApi } from "../utils/Utils";
import Header from "../components/Layout/Header";
import LoadApi from "../components/Loading/LoadApi";
import "animate.css";

const Sports = () => {
    const pageTitle = "Sports";
    const { contextData } = useContext(AppContext);
    const [sportsEmbedUrl, setSportsEmbedUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const { isLogin, isMobile } = useOutletContext();

    useEffect(() => {
        loadSportsPage();
    }, [location.pathname]);

    const loadSportsPage = () => {
        setIsLoading(true);
        callApi(contextData, "GET", "/get-page?page=sports", callbackGetPage, null);
    };

    const callbackGetPage = (result) => {        
        if (result.status === 500 || result.status === 422) {
        } else {
            setSportsEmbedUrl(result.data.url_embed);
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="loading-page">
                    <LoadApi />
                </div>
            ) : sportsEmbedUrl ? (
                <>
                    <div className="game-iframe-view_gameIframeWrapper game-iframe-view_sportbook">
                        <iframe
                            src={sportsEmbedUrl}
                            title="Sportsbook"
                            className="game-iframe-view_gameIframe game-iframe-view_sportbook"
                            allowFullScreen
                            loading="lazy"
                            style={{ border: 'none' }}
                        />
                    </div>
                    <Header isLogin={isLogin} isMobile={isMobile} link="/" />
                </>
            ) : (
                <div className="game-iframe-view_gameIframeWrapper game-iframe-view_sportbook">
                    <div className="no-game">
                        <div className="leftWrapper">
                            <p className="forbiddenNumber">
                                403
                            </p>
                            <p className="forbiddenText">
                                Forbidden: Access is denied.
                                Sorry, your location is not covered by our service.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Sports;