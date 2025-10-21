import { useContext, useRef, useMemo } from 'react';
import { AppContext } from '../../AppContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Icons from '/src/assets/svg/icons.svg';

const GameSlideshow = ({ games, name, title, icon, onGameClick }) => {
    const { contextData } = useContext(AppContext);
    const swiperRef = useRef(null);
    const uniqueId = useMemo(() => `slideshow-${name}-${Math.random().toString(36).substr(2, 9)}`, [name]);

    const handleGameClick = (game, isDemo = false) => {
        if (onGameClick) {
            onGameClick(game, isDemo);
        }
    };

    const handleFavoriteClick = (game) => {
        console.log('Favorite clicked for:', game.name);
    };

    const handlePlayFreeClick = (game) => {
        handleGameClick(game, true);
    };

    return (
        <div className="content-tile">
            <div className="content-tile__header">
                {icon && (
                    <svg className="content-tile__ico">
                        <use xlinkHref={icon}></use>
                    </svg>
                )}
                {title ? (
                    <span className="content-tile__title">{title}</span>
                ) : (
                    <span className="content-tile__name">{name}</span>
                )}
            </div>
            <div className="content-tile__body">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    spaceBetween={3}
                    slidesPerView="auto"
                    navigation={{
                        prevEl: `.${uniqueId}-back`,
                        nextEl: `.${uniqueId}-next`,
                    }}
                    className="swiper-container"
                    style={{ width: '100%' }}
                >
                    {games?.map((game, index) => (
                        <SwiperSlide key={game.id || index} className="swiper-slide" style={{ width: '285.4px' }}>
                            <div className="slots-games__item-wrap">
                                <div className="slots-games__bg">
                                    <div
                                        className="slots-games__item"
                                        style={{
                                            backgroundImage: `url('${
                                                game.imageDataSrc ||
                                                (game.image_local !== null ? contextData.cdnUrl + game.image_local : game.image_url)
                                            }')`,
                                        }}
                                    >
                                        <div className="slots-games__overlay">
                                            <div className="slots-games__name">{game.name}</div>
                                            <div className="slots-games__buttons">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="slots-games__fav"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleFavoriteClick(game);
                                                    }}
                                                ></a>
                                                <div className="slots-games__play-wrap show">
                                                    <a
                                                        href="javascript:void(0)"
                                                        className="slots-games__play"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            handleGameClick(game);
                                                        }}
                                                    ></a>
                                                </div>
                                            </div>
                                            <div className="slots-games__playfree-wrap">
                                                <a
                                                    href="javascript:void(0)"
                                                    className="slots-games__playfree"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handlePlayFreeClick(game);
                                                    }}
                                                >
                                                    Play for free
                                                </a>
                                            </div>
                                        </div>
                                        <div className="slots-games__ribbons">
                                            {game.promoted && (
                                                <div className="slots-games__ribbon slots-games__ribbon--orange">
                                                    Promo
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                    <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
                </Swiper>
                <div className="content-tile__arrows">
                    <div
                        className={`content-tile__arrow ${uniqueId}-back content-tile__back`}
                        tabIndex={0}
                        role="button"
                        aria-label="Previous slide"
                    >
                        <svg className="content-tile__ico">
                            <use xlinkHref={`${Icons}#arrow-left`}></use>
                        </svg>
                    </div>
                    <div
                        className={`content-tile__arrow ${uniqueId}-next content-tile__next`}
                        tabIndex={0}
                        role="button"
                        aria-label="Next slide"
                    >
                        <svg className="content-tile__ico">
                            <use xlinkHref={`${Icons}#arrow-right`}></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSlideshow;