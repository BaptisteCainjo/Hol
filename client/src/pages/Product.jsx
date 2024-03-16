import ShopList from "../components/ShopList/ShopList";
import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from 'react';
import ProductStyle from "../scss/pages/Product.module.scss";

import { useNavigate, useParams } from "react-router-dom";
import ButtonAddBasket from "../components/ButtonAddBasket/ButtonAddBasket";
import { useEffect, useState } from "react";
import axios from "../utils/net.js";
import { API_SHOPS } from "../utils/config";
import { selectWatchingShop } from "../features/shop/shopSelector";
import { selectShops } from '../features/shop/shopSelector';
import ButtonBack from "../components/ButtonBack/ButtonBack";
import ButtonOutStock from "../components/ButtonOutStock/ButtonOutStock.jsx";
import PopupChoice from "../components/PopupChoice/PopupChoice";
import useSession from "../utils/hooks/useSession.js";
import { createReservation } from "../features/reservation/reservationAction.js";

const Product = () => {
    const [product, setProduct] = useState();
    const [boutiqueName, setBoutiqueName] = useState("");
    const [popupReserv, setPopupReserv] = useState(false);
    const dispatch = useDispatch();
    const shopId = useSelector(selectWatchingShop);
    const navigate = useNavigate();

    const { productId } = useParams();

    const { user } = useSession();

    const shops = useSelector(selectShops);
    const watchingShop = shops.find(shop => shop._id === shopId);
    const watchingShopName = watchingShop?.name || 'Nom du Shop non trouvé';  // fonctionne pas

    const handleGoBack = () => {
        // Utilisez navigate pour revenir en arrière d'une page
        navigate(-1);
    };

    // useEffect(() => {
    //   dispatch(loadShops());
    // }, [dispatch]);

    useEffect(() => {
        setBoutiqueName(window.location.pathname.split('/')[2].split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" "));
    }, [watchingShopName]);

    useEffect(() => {
        async function getProduct() {
            const response = await axios.get(`${API_SHOPS}/${shopId}/products/${productId}`);
            console.log(response.data.stock)
            setProduct(response.data);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        getProduct();
    }, [productId]);

    const handleClickReserv = () => {
        setPopupReserv(true)
        console.log(popupReserv)
    }

    const handleReservation = () => {
        dispatch(createReservation({ userId: user._id, productId: productId }))
        setPopupReserv(false);
    }

    const handleNoReserv = () => {
        setPopupReserv(false);
    }

    return (
        <>
            <section className={ProductStyle.productContainer} data-scroll-section>
                <ButtonBack handleGoBack={handleGoBack} />
                <div className={ProductStyle.productTitre}>
                    <h2 className={ProductStyle.productTitreProduit}>{product?.name}</h2>
                    <p className={ProductStyle.productTitreBoutique}>{boutiqueName}</p>
                </div>
                <div className={ProductStyle.productPanel}>
                    <div className={ProductStyle.productPanelGalerie}>
                        <img src={product?.images?.thumbnail ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"} alt="iproduit sans image" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png" alt="produit sans image" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png" alt="produit sans image" />
                    </div>
                    <div className={ProductStyle.productPanelInfos}>
                        <h2>{product?.name}</h2>
                        {product?.stock ?
                            <p className={ProductStyle.productPanelInfosStock}>En stock ({product?.stock} {(product?.stock <= 1 ? 'restant' : 'restants')})</p>
                            :
                            <p className={ProductStyle.productPanelInfosStock}>Rupture de stock</p>
                        }
                        <p className={product?.stock ? ProductStyle.productPanelInfosPrice : ProductStyle.productOutStockInfosPrice}><span className={ProductStyle.productPanelInfosPriceValue}>{product?.price} €</span>/ par pièce</p>
                        <div className={ProductStyle.productPanelInfosButtonAddBasket}>
                            {product?.stock ? <ButtonAddBasket action={handleClickReserv} /> : <ButtonOutStock />}
                        </div>
                        <div className={ProductStyle.productPanelInfosDescription}>
                            <h4 className={ProductStyle.productPanelInfosDescriptionTitle}>Description du produit</h4>
                            <p className={ProductStyle.productPanelInfosDescriptionContain}>{product?.description}</p>
                        </div>
                        <div className={ProductStyle.productPanelInfosDetails}>
                            {product?.details && Object.entries(product.details).map(([key, value]) => (
                                <li key={key}><strong>{value.label} :</strong> {value.value}</li>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {popupReserv && <PopupChoice 
                                textButton1= {"Annuler"}
                                textButton2={"Confirmer la réservation"}
                                textTitle={"Confirmation de réservation"}
                                textQuestion={"Êtes-vous sûr de vouloir réserver ce produit ?"}
                                functionButton1={handleNoReserv}
                                functionButton2={handleReservation}
                            />
            }
        </>
    );
}

export default Product;