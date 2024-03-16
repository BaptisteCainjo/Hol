import ShopList from "../components/ShopList/ShopList";
import { useDispatch } from "react-redux";
import { useEffect, useRef, useState } from 'react';
import { loadShops } from "../features/shop/shopAction";
import MarketplaceStyle from "../scss/pages/Marketplace.module.scss";
import "../scss/global.scss"
import iconSettings from "../assets/svg/icons/settings.svg"
import { LuEuro, LuSend } from "react-icons/lu";
import { IoIosArrowUp } from "react-icons/io";
import { TbStarFilled } from "react-icons/tb";

import { useSelector } from "react-redux";
import { selectShops } from "../features/shop/shopSelector";

const Marketplace = () => {
    const dispatch = useDispatch();
    const shops = useSelector(selectShops);
    const [inputValues, setInputValues] = useState({ min: '', max: '' });
    const [intervalPrice, setIntervalPrice] = useState([1, 1000]);
    const [numberStars, setNumberStars] = useState(0)
    const [listTags, setListTags] = useState([]);

    useEffect(() => {
        dispatch(loadShops());
    }, [dispatch]);

    const handleMinPriceChange = (event) => {
        const newMinPrice = parseFloat(event.target.value);
        setInputValues({ ...inputValues, min: event.target.value });

        if (isNaN(newMinPrice) || newMinPrice > intervalPrice[1]) {
            setIntervalPrice([intervalPrice[1], intervalPrice[1]]);
        } else if (newMinPrice < 1) {
            setIntervalPrice([1, intervalPrice[1]]);
        } else {
            setIntervalPrice([newMinPrice, intervalPrice[1] < newMinPrice ? newMinPrice : intervalPrice[1]]);
        }
    };

    const handleMaxPriceChange = (event) => {
        const newMaxPrice = parseFloat(event.target.value);
        setInputValues({ ...inputValues, max: event.target.value });

        if (isNaN(newMaxPrice) || newMaxPrice < intervalPrice[0]) {
            setIntervalPrice([intervalPrice[0], intervalPrice[0]]);
        } else if (newMaxPrice > 1000) {
            setIntervalPrice([intervalPrice[0], 1000]);
        } else {
            setIntervalPrice([intervalPrice[0] > newMaxPrice ? newMaxPrice : intervalPrice[0], newMaxPrice]);
        }
    };

    useEffect(() => {
        // Filtrer les magasins en fonction des critères de prix
        const filteredShops = shops.filter(shop => {
            const price = parseFloat(shop.price); // Supposons que shop.price contient le prix du magasin

            return price >= intervalPrice[0] && price <= intervalPrice[1];
        });
        // Mettre à jour les magasins filtrés dans le composant ShopList
        // en utilisant une action Redux ou en passant les magasins filtrés directement
        // à la place de shops dans ShopList
        // Exemple avec une action Redux : dispatch(updateFilteredShops(filteredShops));

    }, [intervalPrice, shops]);

    const inputRef = useRef(null);

    const handleClickTags = () => {
        const tagValue = inputRef.current.value.trim();
        if (tagValue !== '' && listTags.length < 4) {
            setListTags([...listTags, tagValue]);
            inputRef.current.value = '';
        }
    }

    const handleDeleteTag = (index) => {
        const updatedTags = [...listTags];
        updatedTags.splice(index, 1);
        setListTags(updatedTags);
    };

    return (
        <section id="pageContainer" className={MarketplaceStyle.containerMarketplace} data-scroll-section>
            {/*V2 FILTRES */}
            {/*<div className={MarketplaceStyle.containerFilters}>
                <div className={MarketplaceStyle.titleContainer}><h2>Filtres</h2><IoIosArrowUp className={MarketplaceStyle.arrow}/></div>
                <div className={MarketplaceStyle.allFilters}>
                    <div className={MarketplaceStyle.priceFilter}>
                        <h3>Prix</h3>
                        <div className={MarketplaceStyle.alignInputs}>
                            <div className={MarketplaceStyle.inputWrapper}>
                                <input
                                    className={MarketplaceStyle.min}
                                    onChange={handleMinPriceChange}
                                    placeholder="Prix mini."
                                    value={inputValues.min}
                                    step="0.1" />
                                <LuEuro />
                            </div>
                            <div className={MarketplaceStyle.line}></div>
                            <div className={MarketplaceStyle.inputWrapper}>
                                <input
                                    className={MarketplaceStyle.max}
                                    onChange={handleMaxPriceChange}
                                    placeholder="Prix max."
                                    value={inputValues.max}
                                    step="0.1"
                                />
                                <LuEuro />
                            </div>
                        </div>
                    </div>
                    <div className={MarketplaceStyle.advises}>
                        <h3>Avis</h3>
                        <div className={MarketplaceStyle.containerStars}>
                            <button onClick={() => { setNumberStars(1) }}>
                                <TbStarFilled className={`${MarketplaceStyle.star} ${numberStars >= 1 ? MarketplaceStyle.colored : ""}`} />
                            </button>
                            <button onClick={() => { setNumberStars(2) }}>
                                <TbStarFilled className={`${MarketplaceStyle.star} ${numberStars >= 2 ? MarketplaceStyle.colored : ""}`} />
                            </button>
                            <button onClick={() => { setNumberStars(3) }}>
                                <TbStarFilled className={`${MarketplaceStyle.star} ${numberStars >= 3 ? MarketplaceStyle.colored : ""}`} />
                            </button>
                            <button onClick={() => { setNumberStars(4) }}>
                                <TbStarFilled className={`${MarketplaceStyle.star} ${numberStars >= 4 ? MarketplaceStyle.colored : ""}`} />
                            </button>
                            <button onClick={() => { setNumberStars(5) }}>
                                <TbStarFilled className={`${MarketplaceStyle.star} ${numberStars === 5 ? MarketplaceStyle.colored : ""}`} />
                            </button>
                            <span>{numberStars} étoiles</span>
                        </div>
                        {numberStars > 0 && <button onClick={() => { setNumberStars(0) }} className={MarketplaceStyle.cancelStars}>annuler</button>}
                    </div>
                    <div className={MarketplaceStyle.tags}>
                        <h3>Tags</h3>
                        <div className={MarketplaceStyle.alignTagsInput}>
                            <input ref={inputRef} className={MarketplaceStyle.searchTags} placeholder={"rechercher par tags..."} />
                            <button className={MarketplaceStyle.iconSubmitTag} onClick={handleClickTags}><LuSend /></button>
                        </div>
                        <div className={MarketplaceStyle.wrapperTags}>
                            {listTags !== undefined && listTags !== null && listTags.map((tag, index) => {
                                return (
                                    <div key={index} className={MarketplaceStyle.tag}>
                                        <span>{tag}</span>
                                        <button className={MarketplaceStyle.deleteTag} onClick={() => handleDeleteTag(index)}>
                                            supprimer
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <img src={iconSettings} className={MarketplaceStyle.iconSettings} alt="Icônes settings"></img>
                        </div>*/}
            <div className={MarketplaceStyle.containerShops}>
                <ShopList shops={shops} />
            </div>
        </section>
    );
}

export default Marketplace;