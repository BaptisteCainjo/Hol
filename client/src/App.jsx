import {
  Routes,
  Route,
} from "react-router-dom";
import React from "react";

import Page404 from "./pages/Page404";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Register from "./pages/Register.jsx";
import Navbar from "./components/NavBar/Navbar";
import Footer from "./components/Footer/Footer";
import "locomotive-scroll/src/locomotive-scroll.scss";
import Marketplace from "./pages/Marketplace";
import SocialNetworks from "./components/SocialNetworks/SocialNetworks";
import Help from "./components/Help/Help";
import "leaflet/dist/leaflet.css";
import "react-loading-skeleton/dist/skeleton.css";
import Product from './pages/Product.jsx';
import AdminArtisan from './pages/AdminArtisan.jsx';
import Profil from './pages/Profil.jsx';
import ConditionsDeVentePage from "./pages/ConditionsOfSale.jsx";
import LegalMention from "./pages/LegalMention.jsx";
import Private from "./pages/Private.jsx";
import Cookies from "./pages/Cookies.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <main
        className="containerGlobal"
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route path="/boutique/:shopSlug" element={<Shop />}></Route>
          <Route
            path="/boutique/:shopSlug/produits/:productId"
            element={<Product />}
          />
          {/* <Route element={<PrivateWrapper auth={{ isAuthenticated }} />}>
            <Route path="/add-shop" element={<AddShop />}></Route>
          </Route> */}
          <Route path="/register" element={<Register />}></Route>
          <Route path="/verification"></Route>
          <Route path="/admin" element={<AdminArtisan />}></Route>
          <Route path="/profil" element={<Profil />}></Route>
          <Route path="/confidentialite-de-vente" element={<ConditionsDeVentePage />}></Route>
          <Route path="/legal-mention" element={<LegalMention />}></Route>
          <Route path="/private" element={<Private />}></Route>
          <Route path="/cookies" element={<Cookies />}></Route>
          <Route path="/*" element={<Page404 />}></Route>
        </Routes>
        <Footer />
      </main>
      <SocialNetworks />
    </>
  );
}
