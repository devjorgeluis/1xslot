const GameCard = (props) => {
  return (
    <div className={`slots-games__item-wrap ${props.mobileShowMore ? 'mobile' : ''}`} onClick={props.onClick} data-game-id={props.id || props.gameId}>
      <div className="slots-games__bg">
        <div className="slots-games__item" style={{ backgroundImage: `url(${props.imageSrc})` }}>
          <div className="slots-games__overlay">
            <div className="slots-games__name">{props.title}</div>
            <div className="slots-games__buttons">
              <a href="javascript:void(0)" className="slots-games__fav"></a>
              <div className="slots-games__play-wrap show">
                <a href="javascript:void(0)" className="slots-games__play"></a>
              </div>
            </div>
            <div className="slots-games__playfree-wrap">
              <a href="javascript:void(0)" className="slots-games__playfree">{props.provider}</a>
            </div>
          </div>
          <div className="slots-games__ribbons"></div>
          <div className="mobile-slots-game">
            <img src={props.imageSrc} alt={props.title} />
            <div className="slots-games-description">
              <div className="slots-games-name">{props.title}</div>
              <div className="slots-games-provider">{props.provider}</div>
              <div className="more-icon">
                <i className="material-icons">more_horiz</i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
