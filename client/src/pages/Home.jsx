import React, { useEffect, useState } from 'react';
import HomeStyle from '../scss/pages/home.module.scss';
import { LuArrowRight } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import BoutonWithPoint from "../components/ButtonWithPoint/ButtonWithPoint";
import Img1Section2 from '../assets/images/img1.webp';
import Img2Section2 from '../assets/images/img2.webp';
import Img3Section3 from '../assets/images/img3.webp';
import ImgEngagement1 from '../assets/svg/icons/soutien.svg';
import ImgEngagement2 from '../assets/svg/icons/nationale.svg';
import ImgEngagement3 from '../assets/svg/icons/economie.svg';
import ImgEngagement4 from '../assets/svg/icons/eco-responsaibilite.svg';
import Carousel from "../components/Carousel/Carousel";
import ShopThumbnail from '../components/ShopThumbnail/ShopThumbnail';
import { useDispatch, useSelector } from 'react-redux';
import { selectShops } from '../features/shop/shopSelector';
import { loadShops } from "../features/shop/shopAction";
import PopupConnexion from '../components/PopupConnexion/PopupConnexion';
import { NavLink, useNavigate } from 'react-router-dom';


function App() {
  const shops = useSelector(selectShops);
  const dispatch = useDispatch();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    dispatch(loadShops());
  }, [dispatch]);

  const navigate = useNavigate();

  const handleOpenConnexion = () => {
    navigate('/marketplace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // setIsPopupOpen(!isPopupOpen);
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // const handlePopupClose = () => {
  //   setIsPopupOpen(false);
  // };

  const responsive = {
    0: {
      items: 1,
    },
    667: {
      items: 2,
    },
    1400: {
      items: 3,
    },
    1720: {
      items: 4,
    }
  };

  return (
    <div className={`data-scroll-section ${HomeStyle.HomePageContainer}`}>
      {/* {isPopupOpen && <PopupConnexion onClose={handlePopupClose} />} */}
      <section className={HomeStyle.HomePageSection1}>
        <div className={HomeStyle.HomePageBandeau}>
          <div className={HomeStyle.HomePageBandeauContent}>
            <h1 className={HomeStyle.HomePageBandeauTitle}>Laissez place <br />au partage artisanal</h1>
            <NavLink to={"/marketplace"} refresh="true" onClick={scrollToTop}>
              <button className={HomeStyle.HomePageBandeauBtn}><span>Visitez les halles</span><LuArrowRight /></button>
            </NavLink>
          </div>
        </div>

        <div className={HomeStyle.HomePageScroll}>
          <p>Scroll pour explorer</p>
        </div>
      </section>

      <section className={HomeStyle.HomePageSection2}>
        <div className={HomeStyle.HomePageDiscoverText}>
          <div className={HomeStyle.HomePageDiscoverTextContent}>
            <div className={HomeStyle.HomePageDiscoverTextLine}></div>
            <div>
              <h3>Découvre des produits faits-mains autour de toi ! <span><LuMapPin /></span></h3>
              <p>De la fabrication à l’alimentaire,
                Holl permet aux artisans locaux de partager
                leur savoir faire et de développer leur boutique
                numérique. Tu es artisan ? rejoins-nous !
              </p>
            </div>
          </div>
          <BoutonWithPoint
            color={"BLACK"}
            text="Devenir artisan"
            onClick={handleOpenConnexion}
          />
        </div>
        <div className={HomeStyle.HomePageDiscoverImg}>
          <div className={HomeStyle.HomePageDiscoverImg1}>
            <img src={Img1Section2} alt="" />
          </div>
          <div className={HomeStyle.HomePageDiscoverImg2}>
            <img src={Img2Section2} alt="" />
          </div>
        </div>
      </section>

      <section className={HomeStyle.HomePageSection3}>
        <div className={HomeStyle.HomePageJoinImg}>
          <img src={Img3Section3} alt="" />
        </div>
        <div className={HomeStyle.HomePageJoinText}>
          <div className={HomeStyle.HomePageJoinTextContent}>
            <div>
              <h3>Rejoins une communauté dynamique réunissant les artisans et les clients.</h3>
              <p>La plateforme Holl porte ses valeurs dans
                le partage et la convivialité. Tu retrouveras ici une
                grande famille qui ne jure que par le
                mot de l’artisanat !
              </p>
            </div>
          </div>
          <BoutonWithPoint
            color={"WHITE"}
            text="Rejoins-nous !"
            onClick={handleOpenConnexion}
          />
        </div>
      </section>


      <section className={HomeStyle.HomePageSection4}>
        <div className={HomeStyle.HomePageCarousselTop}>
          <h3>Découvrir les boutiques tendances</h3>
          <NavLink to={"/marketplace"} className={HomeStyle.HomePageCarousselBtn} refresh="true" onClick={scrollToTop}>
            <span>Visitez les halles</span><LuArrowRight />
          </NavLink>
        </div>
        <div className={HomeStyle.HomePageCarousselListe}>
          <Carousel isDotsDisplay={false} isInfosDisplay={false} responsive={responsive} items={shops.map(shop => <ShopThumbnail shop={shop} key={shop._id} />)} />
        </div>

      </section>

      <section className={HomeStyle.HomePageSection5}>
        <h3>Nos engagements</h3>
        <div className={HomeStyle.HomePageSectionListe}>
          <div className={HomeStyle.HomePageSectionUnEngagement}>
            <img src={ImgEngagement1} alt="Pictogramme soutien aux artisans" />
            <h5>Soutien aux artisans</h5>
            <p>Fiers de notre patrimoine artisanal, nous soutenons les artisans locaux qui apportent leur savoir-faire unique et leur passion à chaque création. En choisissant Holl, vous encouragez la richesse de votre communauté artisanale.</p>
          </div>
          <div className={HomeStyle.HomePageSectionUnEngagement}>
            <img src={ImgEngagement2} alt="Pictogramme missions nationale" />
            <h5>Missions nationale</h5>
            <p>Holl s'engage dans une mission nationale, connectant les communautés à travers tout le pays. Nous croyons en la force de l'unité et en la contribution à l'épanouissement de notre nation.</p>
          </div>
          <div className={HomeStyle.HomePageSectionUnEngagement}>
            <img src={ImgEngagement3} alt="Pictogramme développement de l'économie locale" />
            <h5>Développement de l'économie locale</h5>
            <p>Contribuez au développement de l'économie locale. Chaque réservation effectué sur notre plateforme renforce les racines de votre économie et soutient la croissance des entreprises locales.</p>
          </div>
          <div className={HomeStyle.HomePageSectionUnEngagement}>
            <img src={ImgEngagement4} alt="Pictogramme éco-responsabilité" />
            <h5>Éco-Responsabilité</h5>
            <p>Holl est résolument engagé dans une démarche durable. Optez pour des choix responsables en découvrant des produits respectueux de l'environnement et en soutenant des initiatives éco-responsables.</p>
          </div>
        </div>
      </section>


    </div>
  );
}

export default App;