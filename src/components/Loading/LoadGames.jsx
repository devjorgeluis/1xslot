import ImgCasino from "/src/assets/img/casino.jpg";

const LoadGames = () => {
    const GameSkeleton = () => (
        <div className="slots-games__item-wrap">
            <div className="slots-games__bg">
                <div className="slots-games__item">
                    <div className="thumbnail thumb-bg">
                        <div className="slots-games__overlay">
                            <div className="slots-games__name"></div>
                            <div className="slots-games__buttons">
                                <a href="javascript:void(0)" className="slots-games__fav"></a>
                                <div className="slots-games__play-wrap show">
                                    <a href="javascript:void(0)" className="slots-games__play"></a>
                                </div>
                            </div>
                            <div className="slots-games__playfree-wrap">
                                <a href="javascript:void(0)" className="slots-games__playfree"></a>
                            </div>
                        </div>
                        <div className="slots-games__ribbons"></div>
                        <div className="mobile-slots-game">
                            <img src={ImgCasino} alt="casino" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        Array.from({ length: 8 }, (_, index) => (
            <GameSkeleton key={index} />
        ))
    );
};

export default LoadGames;