import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../../AppContext";
import { callApi } from "../../utils/Utils";
import LoadCasino from "../Loading/LoadCasino";
import LoadApi from "../Loading/LoadApi";
import IconEnlarge from "/src/assets/svg/enlarge.svg";
import IconClose from "/src/assets/svg/large-close.svg";

const GameModal = (props) => {
  const { contextData } = useContext(AppContext);
  const [url, setUrl] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isGameLoadingError, setIsGameLoadingError] = useState(false);
  const [games, setGames] = useState([]);
  const [searchDelayTimer, setSearchDelayTimer] = useState();
  const [txtSearch, setTxtSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (props.gameUrl !== null && props.gameUrl !== "") {
      if (props.isMobile) {
        window.location.href = props.gameUrl;
      } else {
        document
          .getElementsByClassName("game-view-container")[0]
          .classList.remove("d-none");
        setUrl(props.gameUrl);
      }
    }
  }, [props.gameUrl, props.isMobile]);

  const closeModal = () => {
    resetModal();
    document.getElementsByClassName("game-view-container")[0].classList.add("d-none");
    if (props.onClose) {
      props.onClose();
    }
  };

  const resetModal = () => {
    setUrl(null);
    setIframeLoaded(false);
    document.getElementById("game-window-iframe").classList.add("d-none");
  };

  const toggleFullScreen = () => {
    const gameWindow = document.getElementsByClassName("game-window")[0];

    if (!isFullscreen) {
      // Enter fullscreen
      if (gameWindow.requestFullscreen) {
        gameWindow.requestFullscreen();
      } else if (gameWindow.mozRequestFullScreen) {
        gameWindow.mozRequestFullScreen();
      } else if (gameWindow.webkitRequestFullscreen) {
        gameWindow.webkitRequestFullscreen();
      } else if (gameWindow.msRequestFullscreen) {
        gameWindow.msRequestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      // Exit fullscreen
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  const exitHandler = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      setIsFullscreen(false);
      document
        .getElementsByClassName("game-view-container")[0]
        .classList.remove("fullscreen");
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", exitHandler);
    document.addEventListener("webkitfullscreenchange", exitHandler);
    document.addEventListener("mozfullscreenchange", exitHandler);
    document.addEventListener("MSFullscreenChange", exitHandler);

    return () => {
      document.removeEventListener("fullscreenchange", exitHandler);
      document.removeEventListener("webkitfullscreenchange", exitHandler);
      document.removeEventListener("mozfullscreenchange", exitHandler);
      document.removeEventListener("MSFullscreenChange", exitHandler);
    };
  }, []);

  const handleIframeLoad = () => {
    if (url != null) {
      document.getElementById("game-window-iframe").classList.remove("d-none");
      setIframeLoaded(true);
    }
  };

  const handleIframeError = () => {
    console.error("Error loading game iframe");
    setIframeLoaded(false);
  }

  if (props.isMobile) {
    return null;
  }

  const launchGame = (game, type, launcher) => {
    setUrl(null);
    setIframeLoaded(false);
    setTxtSearch("");
    document.getElementById("game-window-iframe").classList.add("d-none");

    setTimeout(() => {
      callApi(contextData, "GET", "/get-game-url?game_id=" + game.id, callbackLaunchGame, null);
    }, 50);
  };

  const callbackLaunchGame = (result) => {
    if (result.status == "0") {
      setUrl(result.url);
    } else {
      setIsGameLoadingError(true);
    }
  };

  const configureImageSrc = (result) => {
    (result.content || []).forEach((element) => {
      let imageDataSrc = element.image_url;
      if (element.image_local != null) {
        imageDataSrc = contextData.cdnUrl + element.image_local;
      }
      element.imageDataSrc = imageDataSrc;
    });
  };

  return (
<>
      <div className="d-none game-container">
        {
          !isFullscreen && <div className="games-block-title_gamesBlockTitle">
            <div className="games-block-title_gamesBlockTitleSeparator games-block-title_gamesBlockTitleLeft"></div>
            <p className="games-block-title_gamesBlockTitleText">{props.gameName || "Joker's Jewels"}</p>
            <div className="games-block-title_gamesBlockTitleSeparator games-block-title_gamesBlockTitleRight"></div>
          </div>
        }
        <div className="game-window">
          <div className="game-window-header">
            <div className="game-window-header-item align-center close-window">
              <span className="close-button" onClick={closeModal} title="Close">
                <ImCross />
              </span>
            </div>
            <div className="game-window-header-item align-center reload-window">
              <span className="icon-reload" onClick={reload} title="Reload">
                <ImRedo />
              </span>
            </div>
            <div className="game-window-header-item align-center full-window">
              {isFullscreen ? (
                <span
                  className="icon-originscreen"
                  onClick={toggleFullScreen}
                  title="Exit Fullscreen"
                >
                  <img src={IconShrink} />
                </span>
              ) : (
                <span
                  className="icon-fullscreen"
                  onClick={toggleFullScreen}
                  title="Fullscreen"
                >
                  <img src={IconEnlarge} />
                </span>
              )}
            </div>
            <div className="game-window-header-item align-center new-window">
              <span
                className="icon-new-window"
                onClick={launchInNewTab}
                title="Open In New Window"
              >
                <ImNewTab />
              </span>
            </div>
          </div>

          {iframeLoaded}

          {iframeLoaded == false && (
            <div
              id="game-window-loading"
              className="game-window-iframe-wrapper"
            >
              <DivLoading />
            </div>
          )}

          <div
            id="game-window-iframe"
            className="game-window-iframe-wrapper d-none"
          >
            <iframe
              allow="camera;microphone;fullscreen *"
              src={url}
              onLoad={handleIframeLoad}
              onError={handleIframeError}
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameModal;