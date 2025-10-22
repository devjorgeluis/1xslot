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
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="slots-games__wrap">
            <div className="slots-games__list">
                {Array.from({ length: 5 }, (_, index) => (
                    <GameSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default LoadGames;