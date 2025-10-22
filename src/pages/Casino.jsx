import { useContext, useState, useEffect, useRef } from "react";
import { useLocation, useOutletContext, useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { LayoutContext } from "../components/Layout/LayoutContext";
import { NavigationContext } from "../components/Layout/NavigationContext";
import { callApi } from "../utils/Utils";
import MenuContainer from "../components/Casino/MenuContainer";
import Slideshow from "../components/Casino/Slideshow";
import GameSlideshow from "../components/Home/GameSlideshow";
import GameCard from "/src/components/GameCard";
import CategoryContainer from "../components/CategoryContainer";
import GameModal from "../components/Modal/GameModal";
import Footer from "../components/Layout/Footer";
import LoadGames from "../components/Loading/LoadGames";
import SearchInput from "../components/SearchInput";
import SearchSelect from "../components/SearchSelect";
import LoginModal from "../components/Modal/LoginModal";
import Icons from '/src/assets/svg/icons.svg';
import "animate.css";

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
  const [showLoginModal, setShowLoginModal] = useState(false);
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

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleLoginConfirm = () => {
    setShowLoginModal(false);
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
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onConfirm={handleLoginConfirm}
        />
      )}
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
        <>
          <div className="slots-wrapper">
            <MenuContainer />
            <Slideshow />
            <section className="slots-main">
              <section className="slots-filter">
                <form className="slots-filter__form">
                  <button className="slots-filter__clear" onClick={clearSearch}>
                    Borrar filtro
                  </button>
                  <div className="slots-filter__container">
                    <div className="slots-filter__block slots-filter__block--one">
                      <section className={`slots-filter__category ${isCollectionsOpen ? 'slots-filter__category--is-opened' : ''}`}>
                        <button type="button" className="slots-filter__title" onClick={toggleCollections}>
                          Colecciones
                          <svg className="slots-filter__ico">
                            <use xlinkHref={`${Icons}#arrow-bottom`}></use>
                          </svg>
                        </button>
                        <div className="slots-filter__list">
                          {tags.map((tag, index) => (
                            <label className={`slots-filter__label ${selectedCategoryIndex === index ? 'active' : ''}`} key={tag.code}>
                              <input
                                type="radio"
                                name="games-category"
                                className="slots-filter__radio"
                                checked={selectedCategoryIndex === index}
                                onChange={() => handleCategorySelect(tag, index)}
                              />
                              <span className="slots-filter__radio-desc">{tag.name}</span>
                            </label>
                          ))}
                        </div>
                      </section>
                    </div>
                    <div className="slots-filter__block slots-filter__block--two" searchstring={providerSearch}>
                      <section className={`slots-filter__providers providers ${isProvidersOpen ? 'slots-filter__category--is-opened' : ''}`}>
                        <div className="slots-filter__title" onClick={toggleProviders}>
                          Proveedores
                          <svg className="slots-filter__ico">
                            <use xlinkHref={`${Icons}#arrow-bottom`}></use>
                          </svg>
                        </div>
                        {
                          isProvidersOpen &&
                          <>
                            <div className="providers__wrap">
                              <div className="field">
                                <input
                                  placeholder="Búsqueda por proveedor"
                                  type="text"
                                  className="field__input"
                                  value={providerSearch}
                                  onChange={handleProviderSearch}
                                />
                                <svg className="field__ico">
                                  <use xlinkHref={`${Icons}#search`}></use>
                                </svg>
                              </div>
                            </div>
                            <section className="ps-container providers__scroll providers__scroll--categories ps ps--theme_default ps--active-y">
                              <div className="providers__list">
                                {filteredProviders.map((provider, index) => (
                                  <a
                                    key={provider.id}
                                    id={`product-zdrqv-${provider.id}`}
                                    title={provider.name}
                                    href="javascript:void(0)"
                                    className={`providers__item ${selectedProvider?.id === provider.id ? 'active' : ''}`}
                                    onClick={() => handleProviderSelect(provider, index)}
                                  >
                                    <img
                                      src={provider.image_local ? `${contextData.cdnUrl}${provider.image_local}` : provider.image_url}
                                      alt={provider.name}
                                      className="providers__img"
                                    />
                                  </a>
                                ))}
                              </div>
                            </section>
                          </>
                        }
                      </section>
                    </div>
                  </div>
                </form>
              </section>
              <div className="slots-content">
                <SearchInput
                  txtSearch={txtSearch}
                  setTxtSearch={setTxtSearch}
                  searchRef={searchRef}
                  search={search}
                  clearSearch={clearSearch}
                  isMobile={isMobile}
                />
                <div className="slots-games">
                  {(txtSearch || selectedProvider || isSingleCategoryView || isExplicitSingleCategoryView) ? (
                    <>
                      <div className="slots-games__wrap">
                        <div className="slots-games__list">
                          {games.map((game) => (
                            <GameCard
                              key={game.id}
                              id={game.id}
                              provider={activeCategory?.name || 'Casino'}
                              title={game.name}
                              imageSrc={game.imageDataSrc || game.image_url}
                              mobileShowMore={mobileShowMore}
                              onClick={() => (isLogin ? launchGame(game, "slot", "tab") : handleLoginClick())}
                            />
                          ))}
                        </div>
                      </div>
                      {isLoadingGames && <LoadGames />}
                      {hasMoreGames && (
                        <div className="slots-games-list__controls">
                          <button className="slots-games__button slots-games-list__btn" onClick={loadMoreGames}>
                            Mostrar más
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {firstFiveCategoriesGames.map((entry, catIndex) => {
                        if (!entry || !entry.games) return null;
                        const categoryKey = entry.category?.id || `cat-${catIndex}`;

                        return (
                          <div className="slots-games__wrap" key={categoryKey}>
                            <div className="slots-games__nav">
                              <h2 className="slots-games__title">
                                {entry?.category?.name || ''}
                              </h2>
                              <div className="slots-games__nav-wrap">
                                <a className="slots-games__button" onClick={() => loadMoreContent(entry.category, catIndex)}>Mostrar todo</a>
                              </div>
                            </div>
                            <div className="slots-games__list">
                              {
                                <GameSlideshow games={entry.games.slice(0, 10)} name="casino" title="Tragamonedas Destacadas" icon="/src/assets/svg/players_choice.svg" onGameClick={(game) => {
                                if (isLogin) {
                                  launchGame(game, "slot", "tab");
                                } else {
                                  setShowLoginModal(true);
                                }
                              }} />}
                            </div>
                          </div>
                        );
                      })}
                      {isLoadingGames && <LoadGames />}
                    </>
                  )}
                </div>
              </div>
            </section>
            <Footer isSlotsOnly={isSlotsOnly} />
          </div>
        </>
      )}
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