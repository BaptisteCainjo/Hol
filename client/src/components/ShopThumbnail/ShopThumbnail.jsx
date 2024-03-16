import { Link } from "react-router-dom";
import ShopThumbnailStyle from "./ShopThumbnail.module.scss"
import { LuArrowDown, LuMapPin } from "react-icons/lu";
import thumbnailShape from "../../assets/images/thumbnail.svg"

const ShopThumbnail = ({ shop }) => {
    const { name, slug, address: { city }, images: { thumbnail } } = shop;

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Link onClick={scrollToTop} to={`/boutique/${slug}`}>
            <div className={ShopThumbnailStyle.containerThumbnail}>
                <div className={ShopThumbnailStyle.containerImage} style={{ backgroundImage: `url(${thumbnail})` }}>
                    <div className={ShopThumbnailStyle.shadow}></div>
                    <div className={ShopThumbnailStyle.name}><LuMapPin /><span>{`${name}, ${city}`}</span></div>
                </div>
                <div className={ShopThumbnailStyle.containerProducts}>
                    <div className={ShopThumbnailStyle.product}></div>
                    <div className={ShopThumbnailStyle.product}></div>
                </div>
                <img className={ShopThumbnailStyle.thumbnail} src={thumbnailShape} alt="" />
                <div className={ShopThumbnailStyle.more}><LuArrowDown />Voir plus</div>
            </div>
        </Link>
    );
}

export default ShopThumbnail;