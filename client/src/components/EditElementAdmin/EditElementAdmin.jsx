import EditElementAdminStyle from "./EditElementAdmin.module.scss";
import { selectEditingProductId, selectInitialValuesForm, selectTitleForm, selectUserCurrentShop, selectWatchingShop } from "../../features/shop/shopSelector";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import { LuImage } from "react-icons/lu";
import { LuEuro } from "react-icons/lu";
import { LuClipboardEdit } from "react-icons/lu";
import { LuTrash2 } from "react-icons/lu";
import { saveProduct } from "../../features/shop/shopAction";
import { getUserShop } from "../../features/shop/shopAction";
import useSession from "../../utils/hooks/useSession.js";
import { stopEdit } from "../../features/shop/shopSlice.js";

const EditProductAdmin = ({ page, user }) => {
    const dispatch = useDispatch();

    const title = useSelector(state => selectTitleForm(state, page));
    const initialValues = useSelector(selectInitialValuesForm);
    const shopId = useSelector(selectWatchingShop);
    const productId = useSelector(selectEditingProductId);
    const shop = useSelector(state => selectWatchingShop(state));
    const userShop = useSelector(selectUserCurrentShop)?.userShop;

    const [name, setName] = useState(initialValues.nom);
    const [description, setDescription] = useState(initialValues.description);
    const [quantity, setQuantity] = useState(initialValues.quantity);
    const [price, setPrice] = useState(initialValues.price);
    const [image, setImage] = useState();

    // console.log(user._id)

    useEffect(() => {
        if (user._id) {
            dispatch(getUserShop(user._id));
        }
    }, [dispatch, user._id]);


    useEffect(() => {
        setName(initialValues.nom);
        setDescription(initialValues.description);
        setQuantity(initialValues.quantity);
        setPrice(initialValues.price);
    }, [initialValues]);

    useEffect(() => {
        console.log(userShop);

    }, []);

    const [number, setNumber] = useState(0);

    const handleInputChange = (event) => {
        const inputValue = event.target.value;

        // Vérifier si l'input est un nombre
        if (!isNaN(inputValue)) {
            setNumber(parseInt(inputValue, 10));
        }
    };

    const incrementNumber = () => {
        setNumber((prevNumber) => prevNumber + 1);
    };

    const decrementNumber = () => {
        setNumber((prevNumber) => Math.max(prevNumber - 1, 0)); // Ne pas permettre les nombres négatifs
    };

    const [timeMini, setTimeMini] = useState(0);
    const [timeMax, setTimeMax] = useState(1);

    const handleTimeMiniChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            setTimeMini(newValue);

            // Vérifier si newValue (converti en nombre) est supérieur à timeMax, si oui, mettre à jour timeMax
            if (newValue > timeMax) {
                setTimeMax(newValue);
            }
        }
    };

    const handleTimeMaxChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        if (!isNaN(newValue)) {
            setTimeMax(newValue);

            // Vérifier si newValue (converti en nombre) est inférieur à timeMini, si oui, mettre à jour timeMini
            if (newValue < timeMini) {
                setTimeMini(newValue);
            }
        }
    };

    // input selection images pour produits
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;

        if (selectedFiles.length + files.length > 3) {
            alert("Vous ne pouvez télécharger que 3 fichiers au maximum.");
            return;
        }

        const exceedsSizeLimit = Array.from(files).some((file) => file.size > 500 * 1024);
        if (exceedsSizeLimit) {
            alert("La taille de chaque fichier ne doit pas dépasser 500 Ko.");
            return;
        }

        setSelectedFiles([...selectedFiles, ...files]);
    };

    const handleRemoveFile = (fileIndex) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(fileIndex, 1);
        setSelectedFiles(newFiles);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(saveProduct({
            shopId,
            productId,
            name,
            description,
            stock: quantity,
            price,
        }));
    };

    const handleStopButtonClick = () => {
        dispatch(stopEdit(null));
    };

    return (
        <div className={EditElementAdminStyle.EditProductContainer}>
            <h3 className={EditElementAdminStyle.EditProductTitle}>{title}<LuClipboardEdit /></h3>
            {page === "produits" && <form className={EditElementAdminStyle.EditElementForm} onSubmit={handleSubmit}>
                <label>
                    Nom
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom du produit"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label>
                    Description
                    <textarea
                        name="description"
                        placeholder="Description du produit"
                        value={description}
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label>
                    Quantité
                    <div className={EditElementAdminStyle.EditProductContainerQtn}>
                        <input
                            type="text"
                            name="quantity"
                            //onChange={handleInputChange}
                            placeholder="Quantité du produit"
                            value={quantity}
                            required
                            onChange={(e) => setQuantity(e.target.value)}
                        />
                        <div className={EditElementAdminStyle.EditProductQtnSelect}>
                            <div onClick={incrementNumber}><LuChevronDown /></div>
                            <div onClick={decrementNumber}><LuChevronDown /></div>
                        </div>
                    </div>
                </label>
                <label>
                    Prix
                    <div className={EditElementAdminStyle.EditProductContainerPrice}>
                        <input
                            type="text"
                            name="price"
                            placeholder="Prix du produit"
                            value={price}
                            required
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        <LuEuro className={EditElementAdminStyle.EditProductInputPriceEuro} />
                    </div>

                </label>
                {/* <label className={EditProductAdminStyle.EditProductRetrait}>
                    Durée de retrait en jour
                    <p className={EditProductAdminStyle.EditProductRetraitInfos}>Ne rien mentionner si vous ne souhaitez pas mettre de durée de retrait.</p>
                    <div className={EditProductAdminStyle.EditProductRetraitValues}>
                        <p>min</p>
                        <input
                            type="text"
                            name="timeMini"
                            placeholder="0"
                            maxLength={3}
                            value={timeMini}
                            onChange={handleTimeMiniChange} />
                        <p>jour(s) et max</p>
                        <input
                            type="text"
                            name="timeMax"
                            // placeholder="1"
                            maxLength={3}
                            value={timeMax}
                            onChange={handleTimeMaxChange} />
                        <p>jour(s)</p>
                    </div>

                </label>

                <PromoCodeForm /> */}
                {/* <label className={EditElementAdminStyle.EditProductImage}>
                    <div className={EditElementAdminStyle.EditProductImageContainer}>
                        <input
                            type="file"
                            name="products_files[]"
                            multiple
                            id="file_id"
                            className={EditElementAdminStyle.EditProductImageInput}
                            onChange={handleFileChange}
                            accept=".png, .jpeg, .jpg, .webp"
                        />
                        <label htmlFor="file_id" className={EditElementAdminStyle.EditProductImageLabel}>
                            <LuImage className={EditElementAdminStyle.EditProductImageLabelImage} />
                            <span className={EditElementAdminStyle.EditProductImageLabelTitre}>Ajouter des images</span>
                            <span className={EditElementAdminStyle.EditProductImageLabelInfo}>500ko maximum / image</span>
                        </label>

                    </div>
                    {selectedFiles.length > 0 && (
                        <div className={EditElementAdminStyle.SelectedImageInfo}>
                            {selectedFiles.map((file, index) => (
                                <div key={index} className={EditElementAdminStyle.SelectedUnImage}>
                                    <p>{file.name}</p>
                                    // ici on divise par 1024 pour convertir en kilo-octects et .toFixed permet de formater le résultat en limitant le nombre de décimales à deux chiffres après virgules 
                                    <p>{(file.size / 1024).toFixed(2)} Ko</p>
                                    <button onClick={() => handleRemoveFile(index)}><LuTrash2 /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </label> */}
                <div className={EditElementAdminStyle.EditProductBtn}>
                    <input className={EditElementAdminStyle.EditProductBtnAnnule} onClick={handleStopButtonClick} type="reset" value="Annuler" />
                    <input className={EditElementAdminStyle.EditProductBtnSave} type="submit" value="Sauvegarder les modifications" />
                </div>
            </form>}
            {page === "reservations" && <form className={EditElementAdminStyle.EditElementForm} onSubmit={handleSubmit}>
                <label>
                    Produit réservé
                    <input
                        type="text"
                        name="nom"
                        value={name}
                        required
                    />
                </label>
                <label>
                    Date de réservation
                    <input
                        type="text"
                        name="nom"
                        value={name}
                        required
                    />
                </label>
                <div className={EditElementAdminStyle.EditProductBtn}>
                    <input className={EditElementAdminStyle.EditProductBtnAnnule} onClick={handleStopButtonClick} type="reset" value="Annuler" />
                    <input className={EditElementAdminStyle.EditProductBtnSave} type="submit" value="Sauvegarder les modifications" />
                </div>
            </form>}
            {page === "boutique" && <form className={EditElementAdminStyle.EditElementForm} onSubmit={handleSubmit}>
                <label>
                    Nom de la boutique
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom de la boutique"
                        value={userShop?.name}
                        required
                    // onChange={ }
                    />
                </label>
                <label>
                    Description de la boutique
                    <textarea
                        name="description"
                        placeholder="Description de la boutique"
                        value={userShop?.description}
                        rows={4}
                    // onChange={ }
                    />
                </label>
                {/* <label>
                    Afficher vos réseaux
                    <p className={EditElementAdminStyle.EditProductInfos}>Si vous souhaitez ne pas afficher le réseau social, n'inscrivez rien dans les cases</p>
                    <input
                        className={EditElementAdminStyle.EditShopNetworksFacebook}
                        type="text"
                        name="facebook"
                        placeholder="Facebook"
                        value={shop?.networks?.facebook ? shop.networks.facebook : ""}
                    // onChange={ }
                    />

                    <input
                        className={EditElementAdminStyle.EditShopNetworksInstagram}
                        type="text"
                        name="instagram"
                        placeholder="Instagram"
                        value={shop?.networks?.instagram ? shop.networks.instagram : ""}
                    // onChange={ }
                    />

                    <input
                        className={EditElementAdminStyle.EditShopNetworksLinkedin}
                        type="text"
                        name="linkedin"
                        placeholder="Linkedin"
                        value={shop?.networks?.linkedin ? shop.networks.linkedin : ""}
                    // onChange={ }
                    />
                </label> */}
                <div className={EditElementAdminStyle.EditProductBtn}>
                    {/* <input className={EditElementAdminStyle.EditProductBtnAnnule} onClick={handleStopButtonClick} type="reset" value="Annuler" /> */}
                    <input className={EditElementAdminStyle.EditProductBtnSave} type="submit" value="Sauvegarder les modifications" />
                </div>
            </form>}
        </div>
    )
}

export default EditProductAdmin;