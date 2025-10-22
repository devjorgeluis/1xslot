import { useContext } from "react";
import { LayoutContext } from "./Layout/LayoutContext";
import Icons from '/src/assets/svg/icons.svg';

const SearchInput = ({
    txtSearch,
    setTxtSearch,
    searchRef,
    search,
    isMobile
}) => {
    const { setShowMobileSearch } = useContext(LayoutContext);

    const handleChange = (event) => {
        const value = event.target.value;
        setTxtSearch(value);
        search({ target: { value }, key: event.key, keyCode: event.keyCode });
    };

    const handleFocus = () => {
        if (isMobile) {
            setShowMobileSearch(true);
        }
    };

    return (
        <div className="field">
            <input
                ref={searchRef}
                className="field__input"
                placeholder="Buscar"
                value={txtSearch}
                onChange={handleChange}
                onKeyUp={search}
                onFocus={handleFocus}
            />
            <svg className="field__ico">
                <use xlinkHref={`${Icons}#search`}></use>
            </svg>
        </div>
    );
};

export default SearchInput;