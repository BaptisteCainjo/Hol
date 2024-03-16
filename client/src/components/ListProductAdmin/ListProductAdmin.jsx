import { useEffect, useState } from "react";
import ListProductAdminStyle from "./ListProductAdmin.module.scss";
import { LuCheck, LuPlus } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { LuClipboardEdit } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { startEdit } from '../../features/shop/shopSlice';
import axios from "../../utils/net.js";
import { API_USERS } from "../../utils/config";
import { deleteProduct, loadProducts } from "../../features/shop/shopAction";
import { selectProducts, selectWatchingShop } from "../../features/shop/shopSelector";
import { Link } from "react-router-dom";

const ListProductAdmin = ({ onAddButtonClick, user }) => {
    const dispatch = useDispatch();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

    useEffect(() => {
        dispatch(loadProducts(user._id));
    }, [dispatch]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // const [isChecked, setIsChecked] = useState(false);
    // const [isAllChecked, setAllChecked] = useState(false);
    const products = useSelector(selectProducts);
    const [popup, setPopup] = useState({
        show: false,
        productId: null,
    });
    const shopId = useSelector(selectWatchingShop);

    // const handleCheckboxChange = () => {
    //     setIsChecked(!isChecked);
    // };

    // const handleAllChecked = () => {
    //     setAllChecked(!isAllChecked);
    //     if (isAllChecked) {
    //         setIsChecked(false);
    //     } else {
    //         setIsChecked(true);
    //     }
    // }

    const handleEditButtonClick = (productId) => {
        dispatch(startEdit(productId));
    };

    const handleAddButtonClick = () => {
        dispatch(startEdit(null));
    };

    const handleDelete = (productId) => {
        setPopup({
            show: true,
            productId,
        });
    };

    const handleDeleteTrue = () => {
        if (popup.show && popup.productId) {
            dispatch(deleteProduct({
                shopId,
                productId: popup.productId,
            }))
            setPopup({
                show: false,
                productId: null,
            });
        }
    };

    const handleDeleteFalse = () => {
        setPopup({
            show: false,
            productId: null,
        });
    };

    return (
        <div>
            {popup.show && (
                <div className={ListProductAdminStyle.popupDelete}>
                    <div className={ListProductAdminStyle.popupDeleteBackground}></div>
                    <div className={ListProductAdminStyle.popupDeleteContent}>
                        <h2>Confirmation de suppression</h2>
                        <p>Êtes-vous sûr de vouloir supprimer ce produit ?</p>
                        <div className={ListProductAdminStyle.popupDeleteBtns}>
                            <button className={`${ListProductAdminStyle.btnDialog} ${ListProductAdminStyle.dialogCancel}`} onClick={handleDeleteFalse}>Annuler</button>
                            <button className={`${ListProductAdminStyle.btnDialog} ${ListProductAdminStyle.dialogConfirm}`} onClick={handleDeleteTrue}>Confirmer la suppression</button>
                        </div>
                    </div>
                </div>
            )}
            <section id={ListProductAdminStyle.products}>
                <div className={ListProductAdminStyle.productHeader}>
                    <h2>Mes produits</h2>
                    {/* mettre ici search */}
                    <button className={ListProductAdminStyle.productAdd} onClick={handleAddButtonClick}><LuPlus />Nouveau produit</button>
                </div>
                <div className={ListProductAdminStyle.productList}>
                    <table>
                        <thead className={ListProductAdminStyle.productListHead}>
                            <tr>
                                <th className={ListProductAdminStyle.productListHeadTitle}>
                                    <div>
                                        {/* <button className={ListProductAdminStyle.checkbox} onClick={handleAllChecked}>{isAllChecked ? <LuCheck /> : ""}</button> */}
                                        <label htmlFor="scales">Produits</label>
                                    </div>
                                </th>
                                <th>Prix</th>
                                <th>{isMobile ? 'Qt.' : 'Quantité'}</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody className={ListProductAdminStyle.productListBody}>
                            {products.length > 0 ? products.map(product => (
                                <tr key={product._id} className={ListProductAdminStyle.lineProduct}>
                                    <th className={ListProductAdminStyle.productListBodyTitle}>
                                        <div>
                                            {/* <input type="checkbox" id="scales" name="scales" checked={isChecked}
                                                onChange={() => handleCheckboxChange(product._id)} /> */}
                                            <img alt="" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png" />
                                            <label htmlFor="scales">{product.name}</label>
                                        </div>
                                    </th>
                                    <th className={ListProductAdminStyle.productListBodyPrice}><span>{product.price}</span>€</th>
                                    <th className={ListProductAdminStyle.productListBodyStock}>{product.stock}</th>
                                    <th className={`${ListProductAdminStyle.productListBodyBtn} ${ListProductAdminStyle.eye}`}>
                                        <button title="Voir le produit">
                                            <Link to={`/boutique/${product.shop.slug}/produits/${product._id}`} target="_blank">
                                                <LuEye />
                                            </Link>
                                        </button>
                                    </th>
                                    <th className={`${ListProductAdminStyle.productListBodyBtn} ${ListProductAdminStyle.edit}`}>
                                        <button title="Modifier le produit" onClick={() => handleEditButtonClick(product._id)}>
                                            <LuClipboardEdit />
                                        </button>
                                    </th>
                                    <th className={`${ListProductAdminStyle.productListBodyBtn} ${ListProductAdminStyle.trash}`}>
                                        <button title="Supprimer le produit" onClick={() => handleDelete(product._id)}>
                                            <LuTrash2 />
                                        </button>
                                    </th>
                                </tr>
                            )) : <tr><th>Vous n'avez aucun produit pour le moment...</th></tr>}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default ListProductAdmin;