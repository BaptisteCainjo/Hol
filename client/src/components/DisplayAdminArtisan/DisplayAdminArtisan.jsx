import DisplayAdminArtisanStyle from "./DisplayAdminArtisan.module.scss";
import ListProductAdmin from "../ListProductAdmin/ListProductAdmin";
import Shop from "../../pages/Shop";
import ReservationsAdminArtisan from "../ReservationAdminArtisans/ReservationAdminArtisans";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserShop } from "../../features/shop/shopAction";
import { selectUserCurrentShop } from "../../features/shop/shopSelector";

const DisplayAdminArtisan = ({ currentPage, user }) => {
  const dispatch = useDispatch();
  const userShop = useSelector(selectUserCurrentShop);  // Assurez-vous de mettre le bon nom du slice ici

  useEffect(() => {
    if (currentPage === "boutique" && user._id != null) {
      dispatch(getUserShop(user._id));  // Assurez-vous de passer le bon ID de l'utilisateur ici
    }
  }, [currentPage, dispatch, user._id]);

  return (
    <div className={DisplayAdminArtisanStyle.displayAdmin}>
      {currentPage === "produits" && <ListProductAdmin user={user} />}
      {currentPage === "boutique" && <Shop userShop={userShop} admin={true}/>}
      {currentPage === "reservations" && <ReservationsAdminArtisan user={user} />}
    </div>
  );
};

export default DisplayAdminArtisan;