const GameCard = (props) => {
  return (
    <div className={`slots-games__item-wrap ${props.mobileShowMore ? 'mobile' : ''}`} onClick={props.onClick} data-game-id={props.id || props.gameId}>
      <div className="slots-games__bg">
        <div className="slots-games__item" style={{ backgroundImage: `url(${props.imageSrc})` }}>
          <div className="slots-games__overlay">
            
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
