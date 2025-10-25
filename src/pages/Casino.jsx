import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { LayoutContext } from "../components/Layout/LayoutContext";
import { NavigationContext } from "../components/Layout/NavigationContext";
import { callApi } from "../utils/Utils";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Slideshow from "../components/Home/Slideshow";
import MenuContainer from "../components/Casino/MenuContainer";
import GameSlideshow from "../components/Home/GameSlideshow";
import GameCard from "/src/components/GameCard";
import CategoryContainer from "../components/CategoryContainer";
import GameModal from "../components/Modal/GameModal";
import LoadGames from "../components/Loading/LoadGames";
import SearchInput from "../components/SearchInput";
import SearchSelect from "../components/SearchSelect";
import Icons from '/src/assets/svg/icons.svg';
import "animate.css";
import ProviderModal from "../components/Modal/ProviderModal";

let selectedGameId = null;
let selectedGameType = null;
let selectedGameLauncher = null;
let selectedGameName = null;
let selectedGameImg = null;
let pageCurrent = 0;

const Casino = () => {
  const pageTitle = "Casino";
  const { contextData } = useContext(AppContext);
  const { isLogin } = useContext(LayoutContext);
  const { setShowFullDivLoading } = useContext(NavigationContext);
  const navigate = useNavigate();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [games, setGames] = useState([]);
  const [firstFiveCategoriesGames, setFirstFiveCategoriesGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState({});
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState(false);
  const [pageData, setPageData] = useState({});
  const [gameUrl, setGameUrl] = useState("");
  const [isLoadingGames, setIsLoadingGames] = useState(false);
  const [txtSearch, setTxtSearch] = useState("");
  const [searchDelayTimer, setSearchDelayTimer] = useState();
  const [shouldShowGameModal, setShouldShowGameModal] = useState(false);
  const [isGameLoadingError, setIsGameLoadingError] = useState(false);
  const [mobileShowMore, setMobileShowMore] = useState(false);
  const [isSingleCategoryView, setIsSingleCategoryView] = useState(false);
  const [isExplicitSingleCategoryView, setIsExplicitSingleCategoryView] = useState(false);
  const [hasMoreGames, setHasMoreGames] = useState(true);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(true); // Accordion state for Colecciones
  const [isProvidersOpen, setIsProvidersOpen] = useState(true); // Accordion state for Proveedores
  const [providerSearch, setProviderSearch] = useState(""); // Search input for providers
  const [showProviderModal, setShowProviderModal] = useState(false);
  const refGameModal = useRef();
  const location = useLocation();
  const searchRef = useRef(null);
  const { isSlotsOnly, isMobile } = useOutletContext();
  const lastLoadedTagRef = useRef("");
  const pendingCategoryFetchesRef = useRef(0);

  useEffect(() => {
    if (!location.hash || tags.length === 0) return;
    const hashCode = location.hash.replace('#', '');
    const tagIndex = tags.findIndex(t => t.code === hashCode);

    if (tagIndex !== -1 && selectedCategoryIndex !== tagIndex) {
      setSelectedCategoryIndex(tagIndex);
      setIsSingleCategoryView(false);
      setIsExplicitSingleCategoryView(false);
      getPage(hashCode);
    }
  }, [location.hash, tags]);

  useEffect(() => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    selectedGameName = null;
    selectedGameImg = null;
    setGameUrl("");
    setShouldShowGameModal(false);
    setActiveCategory({});
    setIsSingleCategoryView(false);
    setIsExplicitSingleCategoryView(false);
    setProviderSearch("");
    getPage("casino");
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const isSlotsOnlyFalse = isSlotsOnly === false || isSlotsOnly === "false";
    let tmpTags = isSlotsOnlyFalse
      ? [
        { name: "Lobby", code: "home" },
        { name: "Hot", code: "hot" },
        { name: "Jokers", code: "joker" },
        { name: "Juegos de crash", code: "arcade" },
        { name: "Megaways", code: "megaways" },
        { name: "Ruletas", code: "roulette" },
      ]
      : [
        { name: "Lobby", code: "home" },
        { name: "Hot", code: "hot" },
        { name: "Jokers", code: "joker" },
        { name: "Megaways", code: "megaways" },
      ];

    setTags(tmpTags);
  }, [isSlotsOnly]);

  const getPage = (page) => {
    setIsLoadingGames(true);
    setGames([]);
    setFirstFiveCategoriesGames([]);
    setIsSingleCategoryView(false);
    setIsExplicitSingleCategoryView(false);
    callApi(contextData, "GET", "/get-page?page=" + page, (result) => callbackGetPage(result, page), null);
  };

  const callbackGetPage = (result, page) => {
    if (result.status === 500 || result.status === 422) {
      setIsLoadingGames(false);
    } else {
      setSelectedProvider(null);
      setPageData(result.data);

      const hashCode = location.hash.replace('#', '');
      const tagIndex = tags.findIndex(t => t.code === hashCode);
      setSelectedCategoryIndex(tagIndex !== -1 ? tagIndex : 0);

      if (result.data && result.data.page_group_type === "categories" && result.data.categories && result.data.categories.length > 0) {
        setCategories(result.data.categories);
        if (page === "casino") {
          setMainCategories(result.data.categories);
        }
        const firstCategory = result.data.categories[0];
        setActiveCategory(firstCategory);

        const firstFiveCategories = result.data.categories.slice(0, 5);
        if (firstFiveCategories.length > 0) {
          setFirstFiveCategoriesGames([]);
          pendingCategoryFetchesRef.current = firstFiveCategories.length;
          setIsLoadingGames(true);
          firstFiveCategories.forEach((item, index) => {
            fetchContentForCategory(item, item.id, item.table_name, index, true, result.data.page_group_code);
          });
        }
      } else if (result.data && result.data.page_group_type === "games") {
        setIsSingleCategoryView(true);
        setIsExplicitSingleCategoryView(false);
        setCategories(mainCategories.length > 0 ? mainCategories : []);
        configureImageSrc(result);
        setGames(result.data.categories || []);
        setActiveCategory(tags[tagIndex] || { name: page });
        setHasMoreGames(result.data.categories && result.data.categories.length === 30);
        pageCurrent = 1;
      }

      setIsLoadingGames(false);
    }
  };

  const fetchContentForCategory = (category, categoryId, tableName, categoryIndex, resetCurrentPage, pageGroupCode = null) => {
    const pageSize = 10;
    const groupCode = pageGroupCode || pageData.page_group_code;
    const apiUrl =
      "/get-content?page_group_type=categories&page_group_code=" +
      groupCode +
      "&table_name=" +
      tableName +
      "&apigames_category_id=" +
      categoryId +
      "&page=0&length=" +
      pageSize +
      (selectedProvider && selectedProvider.id ? "&provider=" + selectedProvider.id : "");

    callApi(contextData, "GET", apiUrl, (result) => callbackFetchContentForCategory(result, category, categoryIndex), null);
  };

  const callbackFetchContentForCategory = (result, category, categoryIndex) => {
    if (result.status === 500 || result.status === 422) {
      pendingCategoryFetchesRef.current = Math.max(0, pendingCategoryFetchesRef.current - 1);
      if (pendingCategoryFetchesRef.current === 0) {
        setIsLoadingGames(false);
      }
    } else {
      const content = result.content || [];
      configureImageSrc(result);

      const gamesWithImages = content.map((game) => ({
        ...game,
        imageDataSrc: game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url,
      }));

      const categoryGames = {
        category: category,
        games: gamesWithImages,
      };

      setFirstFiveCategoriesGames((prev) => {
        const updated = [...prev];
        updated[categoryIndex] = categoryGames;
        return updated;
      });

      pendingCategoryFetchesRef.current = Math.max(0, pendingCategoryFetchesRef.current - 1);
      if (pendingCategoryFetchesRef.current === 0) {
        setIsLoadingGames(false);
      }
    }
  };

  const loadMoreContent = (category, categoryIndex) => {
    if (!category) return;
    if (isMobile) {
      setMobileShowMore(true);
    }
    setIsSingleCategoryView(true);
    setIsExplicitSingleCategoryView(true);
    setSelectedCategoryIndex(categoryIndex);
    setActiveCategory(category);
    fetchContent(category, category.id, category.table_name, categoryIndex, true);
    lastLoadedTagRef.current = category.code || "";
    window.scrollTo(0, 0);
  };

  const loadMoreGames = () => {
    if (!activeCategory) return;
    fetchContent(activeCategory, activeCategory.id, activeCategory.table_name, selectedCategoryIndex, false);
  };

  const fetchContent = (category, categoryId, tableName, categoryIndex, resetCurrentPage, pageGroupCode) => {
    let pageSize = 30;
    setIsLoadingGames(true);

    if (resetCurrentPage) {
      pageCurrent = 0;
      setGames([]);
    }

    setActiveCategory(category);
    setSelectedCategoryIndex(categoryIndex);

    const groupCode = pageGroupCode || pageData.page_group_code;

    let apiUrl =
      "/get-content?page_group_type=categories&page_group_code=" +
      groupCode +
      "&table_name=" +
      tableName +
      "&apigames_category_id=" +
      categoryId +
      "&page=" +
      pageCurrent +
      "&length=" +
      pageSize;

    if (selectedProvider && selectedProvider.id) {
      apiUrl += "&provider=" + selectedProvider.id;
    }

    callApi(contextData, "GET", apiUrl, callbackFetchContent, null);
  };

  const callbackFetchContent = (result) => {
    if (result.status === 500 || result.status === 422) {
      setHasMoreGames(false);
      setIsLoadingGames(false);
    } else {
      if (pageCurrent == 0) {
        configureImageSrc(result);
        setGames(result.content);
      } else {
        configureImageSrc(result);
        setGames([...games, ...result.content]);
      }
      setHasMoreGames(result.content.length === 30);
      pageCurrent += 1;
    }
    setIsLoadingGames(false);
  };

  const configureImageSrc = (result) => {
    (result.content || []).forEach((element) => {
      element.imageDataSrc = element.image_local !== null ? contextData.cdnUrl + element.image_local : element.image_url;
    });
  };

  const launchGame = (game, type, launcher) => {
    setShouldShowGameModal(true);
    setShowFullDivLoading(true);
    selectedGameId = game.id != null ? game.id : selectedGameId;
    selectedGameType = type != null ? type : selectedGameType;
    selectedGameLauncher = launcher != null ? launcher : selectedGameLauncher;
    selectedGameName = game?.name;
    selectedGameImg = game?.image_local != null ? contextData.cdnUrl + game.image_local : game.image_url;
    callApi(contextData, "GET", "/get-game-url?game_id=" + selectedGameId, callbackLaunchGame, null);
  };

  const callbackLaunchGame = (result) => {
    setShowFullDivLoading(false);
    if (result.status == "0") {
      switch (selectedGameLauncher) {
        case "modal":
        case "tab":
          setGameUrl(result.url);
          break;
      }
    } else {
      setIsGameLoadingError(true);
    }
  };

  const closeGameModal = () => {
    selectedGameId = null;
    selectedGameType = null;
    selectedGameLauncher = null;
    selectedGameName = null;
    selectedGameImg = null;
    setGameUrl("");
    setShouldShowGameModal(false);
  };

  const handleCategorySelect = (category, index) => {
    setActiveCategory(category);
    setSelectedProvider(null);
    setTxtSearch("");
    setSelectedCategoryIndex(index);
    setIsSingleCategoryView(true);
    setIsExplicitSingleCategoryView(true);
    if (category.code === "home") {
      setIsSingleCategoryView(false);
      setIsExplicitSingleCategoryView(false);
      setGames([]);
      setFirstFiveCategoriesGames([]);
      const firstFiveCategories = categories.slice(0, 5);
      if (firstFiveCategories.length > 0) {
        pendingCategoryFetchesRef.current = firstFiveCategories.length;
        setIsLoadingGames(true);
        firstFiveCategories.forEach((item, index) => {
          fetchContentForCategory(item, item.id, item.table_name, index, true, pageData.page_group_code);
        });
      } else {
        setIsLoadingGames(false);
      }
      navigate("/casino");
      lastLoadedTagRef.current = "";
    } else {
      fetchContent(category, category.id, category.table_name, index, true);
      lastLoadedTagRef.current = category.code;
    }
  };

  const handleProviderSelect = (provider, index = 0) => {
    setSelectedProvider(provider);
    setIsProviderDropdownOpen(false);
    setTxtSearch("");
    setProviderSearch("");
    setIsExplicitSingleCategoryView(true);
    setIsSingleCategoryView(true);
    if (categories.length > 0 && provider) {
      setActiveCategory(provider);
      setSelectedCategoryIndex(index);
      fetchContent(provider, provider.id, provider.table_name, index, true);
      lastLoadedTagRef.current = provider.code;
      if (isMobile) {
        setMobileShowMore(true);
      }
    } else if (!provider && categories.length > 0) {
      const firstCategory = categories[0];
      setActiveCategory(firstCategory);
      setSelectedCategoryIndex(0);
      setIsSingleCategoryView(false);
      setIsExplicitSingleCategoryView(false);
      setGames([]);
      setFirstFiveCategoriesGames([]);
      const firstFiveCategories = categories.slice(0, 5);
      if (firstFiveCategories.length > 0) {
        pendingCategoryFetchesRef.current = firstFiveCategories.length;
        setIsLoadingGames(true);
        firstFiveCategories.forEach((item, index) => {
          fetchContentForCategory(item, item.id, item.table_name, index, true, pageData.page_group_code);
        });
      } else {
        setIsLoadingGames(false);
      }
      navigate("/casino");
      lastLoadedTagRef.current = "";
    }
  };

  const search = (e) => {
    let keyword = e.target.value;
    setTxtSearch(keyword);
    setIsExplicitSingleCategoryView(true);
    setIsSingleCategoryView(true);
    lastLoadedTagRef.current = "";

    if (keyword === "") {
      clearSearch();
      return;
    }

    do_search(keyword);
  };

  const do_search = (keyword) => {
    clearTimeout(searchDelayTimer);

    setGames([]);
    setIsLoadingGames(true);

    let pageSize = 20;

    let searchDelayTimerTmp = setTimeout(function () {
      callApi(
        contextData,
        "GET",
        "/search-content?keyword=" + keyword + "&page_group_code=" + pageData.page_group_code + "&length=" + pageSize,
        callbackSearch,
        null
      );
    }, 1000);

    setSearchDelayTimer(searchDelayTimerTmp);
  };

  const callbackSearch = (result) => {
    if (result.status === 500 || result.status === 422) {
      setIsLoadingGames(false);
    } else {
      configureImageSrc(result);
      setGames(result.content);
      pageCurrent = 0;
      lastLoadedTagRef.current = "";
    }
    setIsLoadingGames(false);
  };

  const clearSearch = () => {
    setTxtSearch("");
    setProviderSearch("");
    setSelectedProvider(null);
    setIsSingleCategoryView(false);
    setIsExplicitSingleCategoryView(false);
    navigate("/casino");
    lastLoadedTagRef.current = "";
    if (categories.length > 0) {
      const firstCategory = categories[0];
      setActiveCategory(firstCategory);
      setSelectedCategoryIndex(0);
      setGames([]);
      setFirstFiveCategoriesGames([]);
      const firstFiveCategories = categories.slice(0, 5);
      if (firstFiveCategories.length > 0) {
        pendingCategoryFetchesRef.current = firstFiveCategories.length;
        setIsLoadingGames(true);
        firstFiveCategories.forEach((item, index) => {
          fetchContentForCategory(item, item.id, item.table_name, index, true, pageData.page_group_code);
        });
      } else {
        setIsLoadingGames(false);
      }
      if (isMobile) {
        setMobileShowMore(false);
      }
    } else {
      getPage("casino");
    }
  };

  const handleProviderSearch = (e) => {
    setProviderSearch(e.target.value.toLowerCase());
  };

  const toggleCollections = () => {
    setIsCollectionsOpen((prev) => !prev);
  };

  const toggleProviders = () => {
    setIsProvidersOpen((prev) => !prev);
  };

  // Filter providers based on search input
  const filteredProviders = categories.filter((provider) =>
    provider.name.toLowerCase().includes(providerSearch)
  );

  return (
    <>
      {shouldShowGameModal && selectedGameId !== null ? (
        <GameModal
          gameUrl={gameUrl}
          gameName={selectedGameName}
          gameImg={selectedGameImg}
          reload={launchGame}
          launchInNewTab={() => launchGame(null, null, "tab")}
          ref={refGameModal}
          onClose={closeGameModal}
          isMobile={isMobile}
        />
      ) : (
        <div className="casino">
          <Header isLogin={isLogin} isMobile={isMobile} link="/casino" onOpenProviders={() => setShowProviderModal(true)} />
          <div className="main-content">
            <div className="page__row">
              <Slideshow />
            </div>
            {firstFiveCategoriesGames.map((entry, catIndex) => {
              if (!entry || !entry.games) return null;
              return (
                <GameSlideshow
                  key={entry?.category?.id || catIndex}
                  games={entry.games.slice(0, 10)}
                  name={entry?.category?.name}
                  title={entry?.category?.name}
                  icon=""
                  slideshowKey={entry?.category?.id}
                  onGameClick={(game) => {
                    if (isLogin) {
                      launchGame(game, "slot", "tab");
                    } else {
                      navigate("/login");
                    }
                  }}
                />
              );
            })}
          </div>
          <Footer isLogin={isLogin} isSlotsOnly={isSlotsOnly} />
        </div>
      )}
      {/* Provider modal (opened from Header filter icon) */}
      <ProviderModal
        isOpen={showProviderModal}
        onClose={() => setShowProviderModal(false)}
        onSelect={(p) => {
          handleProviderSelect(p);
          setShowProviderModal(false);
        }}
        contextData={contextData}
        initialProviders={categories}
        searchText={providerSearch}
      />
      {isGameLoadingError && (
        <div className="container">
          <div className="row">
            <div className="col-md-6 error-loading-game">
              <div className="alert alert-warning">Error al cargar el juego. Inténtalo de nuevo o ponte en contacto con el equipo de soporte.</div>
              <a className="btn btn-primary" onClick={() => window.location.reload()}>
                Volver a la página principal
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Casino;