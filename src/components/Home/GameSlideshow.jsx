import { useContext, useRef } from 'react';
import { AppContext } from '../../AppContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const GameSlideshow = ({ games, name, title, icon, link, onGameClick }) => {
    const { contextData } = useContext(AppContext);
    const swiperRef = useRef(null);

    const handleGameClick = (game) => {
        if (onGameClick) {
            onGameClick(game);
        }
    };

    const handleFavoriteClick = (game) => {
        console.log('Favorite clicked for:', game.name);
    };

    const handlePlayFreeClick = (game) => {
        console.log('Play free clicked for:', game.name);
    };

    return (
        <div className="content-tile">
            <div className="content-tile__header">
                {icon && <svg className="content-tile__ico"><use xlinkHref={icon}></use></svg>}
                {title || name}
                {link && <a href={link} className="content-tile__link">{name}</a>}
            </div>
            <div className="content-tile__body">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    spaceBetween={3}
                    slidesPerView="auto"
                    navigation={{
                        prevEl: '.content-tile__back',
                        nextEl: '.content-tile__next',
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
                                            backgroundImage: `url('${game.imageDataSrc || (contextData.cdnUrl + game.image_local)}')`,
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
                        className="content-tile__arrow content-tile__back"
                        tabIndex={0}
                        role="button"
                        aria-label="Previous slide"
                    >
                        <svg className="content-tile__ico">
                            <use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#arrow-left"></use>
                        </svg>
                    </div>
                    <div
                        className="content-tile__arrow content-tile__next"
                        tabIndex={0}
                        role="button"
                        aria-label="Next slide"
                    >
                        <svg className="content-tile__ico">
                            <use xlinkHref="/genfiles/cms/99-61/desktop/media_asset/icons.svg#arrow-right"></use>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameSlideshow;