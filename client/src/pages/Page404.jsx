import { Link } from "react-router-dom";
import Page404Style from "../scss/pages/Page404.module.scss";
import "../scss/global.scss";
import error404 from "../assets/images/404.webp";
import { LuArrowLeft } from "react-icons/lu";

export default function Page404() {
  return (
    <div className={Page404Style["not-found"]}>
      <p className={Page404Style.title}>404 - Page Not Found</p>
      <p className={Page404Style.description}>Désolé, la page que vous recherchez semble avoir été déplacée ou n'existe pas.</p>
      <Link className={Page404Style.productBtnBack} to="/"><LuArrowLeft />Retour à la page d'accueil</Link>
      <img
        src={error404}
        alt="Illustration d'une page 404"
      />
    </div>
  );
}
