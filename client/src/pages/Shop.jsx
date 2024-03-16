import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../utils/net.js";
import { API_SHOPS } from "../utils/config";
import { ReactComponent as Basket } from "../assets/svg/icons/basket.svg";
import ShopStyle from "../scss/pages/shop.module.scss";
import {
  LuInstagram,
  LuMail,
  LuPhone,
  LuMapPin,
} from "react-icons/lu";
import { CgFacebook } from "react-icons/cg";
import { BiLogoLinkedin } from "react-icons/bi";
import limit from "../utils/functions/limit";
import { useDispatch } from "react-redux";
import { startWatch } from "../features/shop/shopSlice.js";
import LeafletMap from "../components/LeafletMap/LeaftletMap.jsx";
import Skeleton from "react-loading-skeleton";
import { formatOpeningHours, isShopOpenNow } from "../utils/functions/openingHours.js";
import { LuClock } from "react-icons/lu";
import ButtonBack from "../components/ButtonBack/ButtonBack.jsx";
import ButtonAddBasket from "../components/ButtonAddBasket/ButtonAddBasket.jsx";
import ButtonOutStock from "../components/ButtonOutStock/ButtonOutStock.jsx";
import PopupChoice from "../components/PopupChoice/PopupChoice.jsx";
import { createReservation } from "../features/reservation/reservationAction.js";
import useSession from "../utils/hooks/useSession.js";

const Shop = ({ userShop, admin }) => {
  const dispatch = useDispatch();
  const [shop, setShop] = useState({});
  const [popupReserv, setPopupReserv] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const { shopSlug } = useParams();
  const navigate = useNavigate();
  const sampleLocation = useLocation();

  const { user } = useSession();

  useEffect(() => {
    if (!admin) {
      async function getShop() {
        const response = await axios.get(`${API_SHOPS}/${shopSlug}`);
        setShop(response.data);
        dispatch(startWatch(response.data._id));
      }
      getShop();
    }

  }, [shopSlug, dispatch]);

  useEffect(() => {
    if (userShop != null) {
      setShop(userShop.userShop);
    }
  }, [userShop]);

  const handleGoBack = () => {
    // Utilisez navigate pour revenir en arrière d'une page
    navigate(-1);
  };

  const handleClickReserv = (productId) => {
    setPopupReserv(true)
    setCurrentProductId(productId);
  }

  const handleReservation = () => {
    dispatch(createReservation({ userId: user._id, productId: currentProductId }))
    setPopupReserv(false);
  }

  const handleNoReserv = () => {
    setPopupReserv(false);
  }

  return (
    <>
      <div className={`${ShopStyle.shopContainer} ${sampleLocation.pathname === "/admin" ? ShopStyle.admin : ""}`} data-scroll-section>
        <div className={ShopStyle.containerBtnBack}>
          <ButtonBack handleGoBack={handleGoBack} />
        </div>
        <div className={ShopStyle.shop}>
          <section id={ShopStyle.overview}>
            <div className={ShopStyle.shopInfos}>
              <h1>{shop.name || <Skeleton />}</h1>
              <span className={ShopStyle.line}>|</span>
              <span className={ShopStyle.openStatus}>
                <LuClock />
                {shop?.openingHours ? (isShopOpenNow(shop.openingHours) ? "Actuellement ouvert" : "Actuellement fermé") : null}
              </span>
            </div>
            <div className={ShopStyle.shopPhotos}>
              {shop?.images?.thumbnail ? (
                <img src={shop.images.thumbnail} alt="" />
              ) : (
                <Skeleton />
              )}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                alt=""
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                alt=""
              />
            </div>
            <div className={ShopStyle.shopDescription}>
              <h2>La boutique</h2>
              <p>{shop.description || <Skeleton count={5} />}</p>
            </div>
          </section>
          <section id={ShopStyle.products}>
            <h2>Les produits</h2>
            <div className={ShopStyle.productList}>
              {shop?.products?.map((product) => (
                <div className={ShopStyle.product} key={product._id}>
                  <div className={ShopStyle.productTop}>
                    <Link to={`/boutique/${shopSlug}/produits/${product._id}`}>
                      <img
                        src={product?.images?.thumbnail ?? "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className={ShopStyle.productBottom}>
                    <Link
                      className={ShopStyle.productPrice}
                      to={`/boutique/${shopSlug}/produits/${product._id}`}
                    >
                      {product.price} €
                    </Link>
                    <Link
                      className={ShopStyle.productName}
                      to={`/boutique/${shopSlug}/produits/${product._id}`}
                    >
                      {limit(product.name, 60) || (
                        <Skeleton height="100%" width="100%" />
                      )}
                    </Link>
                    <div className={ShopStyle.productActions}>
                      <Link
                        className={ShopStyle.discoverBtn}
                        to={`/boutique/${shopSlug}/produits/${product._id}`}
                      >
                        Découvrir
                      </Link>
                      {product?.stock ? <ButtonAddBasket action={() => handleClickReserv(product._id)} /> : <ButtonOutStock />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <hr className={ShopStyle.dashedSeparator} />
          <section id={ShopStyle.contact}>
            <div className={ShopStyle.location}>
              <h2>Localisation</h2>
              <div className={ShopStyle.mapContainer}>
                <LeafletMap
                  address={shop.address}
                  style={{
                    minHeight: "300px",
                    height: "100%",
                    borderRadius: "0.75rem",
                    zIndex: "-5",
                  }}
                />
              </div>
            </div>
            <div className={ShopStyle.artisan}>
              <h2>Artisan</h2>
              <div className={ShopStyle.artisanProfile}>
                <div className={ShopStyle.artisanAvatar}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
                    alt=""
                    width="128"
                    height="128"
                  />
                </div>
                <div className={ShopStyle.artisanInfos}>
                  <p className={ShopStyle.artisanName}>Prénom Nom</p>
                </div>
              </div>
              <div className={ShopStyle.artisanContact}>
                <a href={`mailto:${shop?.email}`}>
                  <LuMail />
                  <span>{shop?.email}</span>
                </a>
                <a href={`tel:${shop?.phoneNumber?.replace(/\s/g, "")}`}>
                  <LuPhone />
                  <span>{shop?.phoneNumber}</span>
                </a>
                <p>
                  <LuMapPin />
                  <span>{`${shop?.address?.street}, ${shop?.address?.city}, ${shop?.address?.country}`}</span>
                </p>
                <div className={ShopStyle.shopOpeningHours}>
                  <LuClock />
                  {
                    shop?.openingHours && shop.openingHours !== undefined && shop.openingHours !== null &&
                    <details>
                      <summary>Horaires d'ouverture</summary>
                      {shop?.openingHours && <pre>{formatOpeningHours(shop.openingHours)}</pre>}
                    </details>
                  }
                </div>
              </div>
              { /* <div className={ShopStyle.artisanSocials}>
                <Link>
                  <CgFacebook />
                </Link>
                <Link>
                  <LuInstagram />
                </Link>
                <Link>
                  <BiLogoLinkedin />
                </Link>
              </div>*/}
            </div>
          </section>
        </div>
      </div>
      {popupReserv && <PopupChoice
        textButton1={"Annuler"}
        textButton2={"Confirmer la réservation"}
        textTitle={"Confirmation de réservation"}
        textQuestion={"Êtes-vous sûr de vouloir réserver ce produit ?"}
        functionButton1={handleNoReserv}
        functionButton2={handleReservation}
      />
      }
    </>
  );
};

export default Shop;
