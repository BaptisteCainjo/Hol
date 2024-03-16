import { useState, useEffect } from "react";
import ShopThumbnail from "../ShopThumbnail/ShopThumbnail";
import ShopListStyle from "./Shoplist.module.scss"
import { IoIosArrowUp } from "react-icons/io";
import { LuX } from "react-icons/lu"
import SearchBar from "../SearchBar/SearchBar";
import Carousel from "../Carousel/Carousel";
import Pagination from "../Pagination/Pagination";

const maxPerPage = 8;

const ShopList = ({ shops }) => {
    const [isOpenSort, setOpenSort] = useState(false)
    const [currentSort, setCurrentSort] = useState("");
    const [shopList, setShopList] = useState([]);
    const [currentShopList, setCurrentShopList] = useState([]);
    const [itemOffset, setItemOffset] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const updateSearchTerm = (element) => {
        setSearchTerm(element);
    }

    console.log(shopList);

    const handleClickSort = () => {
        setOpenSort(!isOpenSort);
    }

    const responsive = {
        0: {
            items: 1,
        },
        665: {
            items: 2,
        },
        1300: {
            items: 3,
        },
        1720: {
            items: 4,
        }
    };

    useEffect(() => {
        if (shops !== undefined && shops !== null && shops.length > 0) {
            const cloneShops = [...shops];
            setShopList(cloneShops.slice(3, cloneShops.length));
        }
    }, [shops])


    useEffect(() => {
        let filteredShops = [...shops];

        if (searchTerm.trim() !== "") {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filteredShops = filteredShops.filter(
                (shop) =>
                    shop.name.toLowerCase().includes(lowerCaseSearchTerm)
                //||shop.tags.some((tag) => tag.toLowerCase().includes(lowerCaseSearchTerm))
            );
        }
        setShopList(filteredShops);
        setMaxPage(Math.ceil(filteredShops.length / maxPerPage));
    }, [currentSort, shops, searchTerm]);

    useEffect(() => {
        let sortedShops = [...shops];

        switch (currentSort) {
            case "Nouveauté":
                sortedShops = sortedShops.sort(
                    (shopOne, shopTwo) =>
                        new Date(shopTwo.createdAt).getTime() -
                        new Date(shopOne.createdAt).getTime()
                );
                break;
            case "Prix croissant":
                sortedShops = sortedShops.sort(
                    (shopOne, shopTwo) => shopOne.price - shopTwo.price
                );
                break;
            case "Prix décroissant":
                sortedShops = sortedShops.sort(
                    (shopOne, shopTwo) => shopTwo.price - shopOne.price
                );
                break;
            default:
                sortedShops = shops;
        }
        setShopList(sortedShops);
        setMaxPage(Math.ceil(sortedShops.length / maxPerPage));
    }, [currentSort, shops]);

    const handlePageClick = (evt) => {
        const newOffset = evt.selected * maxPerPage;
        setItemOffset(newOffset);
    };

    const renderShopThumbnails = () => {
        const startIdx = itemOffset;
        const endIdx = Math.min(itemOffset + maxPerPage, shopList.length);

        return shopList.slice(startIdx, endIdx).map((shop) => (
            <ShopThumbnail shop={shop} key={shop._id} />
        ));
    };

    return (
        <div className={ShopListStyle.shopList}>
            <h1 className={ShopListStyle.title}>Les halles virtuelles de Laval.</h1>
            <div className={ShopListStyle.wrapperHeaderMarketplace}>
                <div className={`${isOpenSort ? ShopListStyle.open : ""} ${ShopListStyle.sortBy}`}>
                    <button onClick={handleClickSort} className={ShopListStyle.sortByInit}>
                        <span>{currentSort !== "" ? currentSort : "Trier par"}</span>
                        <IoIosArrowUp className={isOpenSort ? ShopListStyle.opened : ""} />
                    </button>
                    {isOpenSort && <div className={`${ShopListStyle.choices}`}>
                        {currentSort !== "Nouveauté" && <button className={`${ShopListStyle.choice}`} onClick={() => { setCurrentSort("Nouveauté"); setOpenSort(false); }}>
                            Nouveauté
                        </button>}
                        {/*currentSort !== "Prix croissant" && <button className={`${ShopListStyle.choice}`} onClick={() => { setCurrentSort("Prix croissant"); setOpenSort(false); }}>
                            Prix croissant
                        </button>}
                        {currentSort !== "Prix décroissant" && <button className={`${ShopListStyle.choice}`} onClick={() => { setCurrentSort("Prix décroissant"); setOpenSort(false); }}>
                            Prix décroissant
                        </button>*/}
                    </div>}
                    {currentSort !== "" && <button className={`${ShopListStyle.crossBtn}`} onClick={() => { setCurrentSort(""); setOpenSort(false) }}>
                        <LuX className={ShopListStyle.cross} />
                    </button>}
                </div>
                <SearchBar updateSearchTerm={updateSearchTerm} />
            </div>
            <h2 className={ShopListStyle.titleH2}>Les boutiques <span className={`${ShopListStyle.gradient} ${ShopListStyle.gradientOrange}`}>tendances</span></h2>
            <div className={ShopListStyle.wrapperCarousel}>
                <Carousel isDotsDisplay={false} isInfosDisplay={false} responsive={responsive} items={shops.map(shop => <ShopThumbnail shop={shop} key={shop._id} />)} />
            </div>
            <h2 className={ShopListStyle.h2Paging}>Les boutiques <span className={`${ShopListStyle.gradient} ${ShopListStyle.gradientBlue}`}>lavalloises</span></h2>
            <div className={ShopListStyle.paging}>{renderShopThumbnails()}</div>
            <Pagination maxPerPage={maxPerPage} handlePageClick={handlePageClick} maxPage={maxPage} />
        </div >
    );
}

export default ShopList;