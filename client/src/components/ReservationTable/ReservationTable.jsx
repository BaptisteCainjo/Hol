import React, { useEffect, useState } from "react";
import ReservationTableStyle from "./ReservationTable.module.scss";
import { TbClockHour4, TbCircleCheck, TbClockHour12, TbCircleX } from "react-icons/tb";
import { LuChevronDown, LuUserCircle, LuClipboardCheck, LuClipboardX, LuFolderDown } from "react-icons/lu";
import { startEdit } from "../../features/shop/shopSlice";
import { useDispatch } from "react-redux";
import { updateReservationState } from "../../features/reservation/reservationAction.js";

const ReservationTable = ({ tabDatas, statusTable }) => {
    const [openMoreInfo, setOpenMoreInfo] = useState({});
    const [colorHeaderTable, setColorHeaderTable] = useState();
    const [iconHeaderTitle, setIconHeaderTitle] = useState();
    const [status, setStatus] = useState("");
    const [infosTitles, setInfosTitle] = useState("")
    const dispatch = useDispatch();

    const handleEditButtonClick = (dataId) => {
        dispatch(startEdit(dataId));
    };

    useEffect(() => {
        switch (statusTable) {
            case "pending":
                setStatus("En attente de validation");
                setInfosTitle("En attente de validation");
                setColorHeaderTable("#DDF5FE")
                setIconHeaderTitle(<TbClockHour4 />);
                break;
            case "confirmed":
                setStatus("Confirmé");
                setInfosTitle("Confirmées");
                setColorHeaderTable("#E2FFCC")
                setIconHeaderTitle(<TbCircleCheck />);
                break;
            case "canceled":
                setStatus("Annulé");
                setInfosTitle("Annulées");
                setColorHeaderTable("#FFE8D7")
                setIconHeaderTitle(<TbCircleX />);
                break;
            default:
                setStatus("Passé");
                setInfosTitle("Passées");
                setColorHeaderTable("#FEFFD7")
                setIconHeaderTitle(<TbClockHour12 />);
                break;
        }
    }, [statusTable])

    const toggleMoreInfo = (idReserv) => {
        setOpenMoreInfo((prevOpen) => ({
            ...prevOpen,
            [idReserv]: !prevOpen[idReserv],
        }));
    };

    const handleStateChange = (reservationId, state) => {
        const action =
            state === "confirmed" ? "confirmer"
            : state === "canceled" ? "annuler"
            : "archiver";

        if (window.confirm(`Êtes-vous sûr de vouloir ${action} cette réservation ?`)) {
            dispatch(updateReservationState({ reservationId, state, origin: "artisan" }));
        }
    }

    return <div className={`${ReservationTableStyle.productList}`}>
        <h2 className={ReservationTableStyle.titleH2}>{iconHeaderTitle}{infosTitles}</h2>
        <table>
            <thead className={ReservationTableStyle.productListHead}>
                <tr style={{ backgroundColor: colorHeaderTable }}>
                    {/*
                <th className={ReservationAdminArtisanStyle.productListHeadTitle}>
                    <div>
                        <button className={ReservationAdminArtisanStyle.checkbox} onClick={handleAllChecked}>{isAllChecked ? <LuCheck /> : ""}</button>
                    </div>
                </th>
                */}
                    <th><span>Utilisateurs</span></th>
                    <th><span>Produit(s)</span></th>
                    <th><span>Prix</span></th>
                    <th><span>Date de la commande</span></th>
                    <th><span>Statut</span></th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody className={ReservationTableStyle.productListBody}>
                {[...tabDatas].map((data, index) => (
                    <tr key={index} className={` ${ReservationTableStyle.lineProduct}`}>
                        {/*<td className={ReservationAdminArtisanStyle.reservCol}>
                        <button className={ReservationAdminArtisanStyle.checkbox} onClick={() => handleCheckboxChange(data.idReserv)}>
                            {selectedCheckboxes[data.idReserv] ? <LuCheck /> : ""}
                        </button>
                    </td>*/}
                        <td className={`${ReservationTableStyle.reservCol} ${ReservationTableStyle.infosClient}`}>
                            <LuUserCircle />
                            <div className={ReservationTableStyle.wrapperContent}>
                                <span>{`${data.user.firstName} ${data.user.lastName}`}</span>
                                {statusTable !== "Passées" && <>
                                    <button
                                        className={ReservationTableStyle.arrowMore}
                                        onClick={() => toggleMoreInfo(data.idReserv)}
                                    >
                                        <LuChevronDown className={openMoreInfo[data.idReserv] ? ReservationTableStyle.arrowClicked : ""} />
                                        <span>Plus d'informations</span>
                                    </button>
                                    {openMoreInfo[data.idReserv] && (
                                        <div className={ReservationTableStyle.moreContent}>
                                            <span>Numéro de téléphone : {data.user.phoneClient ?? "Inconnu"}</span>
                                            <span>Adresse client : {data.user.email}</span>
                                        </div>
                                    )}
                                </>}
                            </div>
                        </td>
                        <td className={`${ReservationTableStyle.reservCol} ${ReservationTableStyle.theProduct}`}>
                            <div className={ReservationTableStyle.wrapperListElements}>
                                <span>1 {data.product.name}</span>
                            </div>
                        </td>
                        <td className={`${ReservationTableStyle.reservCol} ${ReservationTableStyle.priceReserv}`}><span>{data.product.price}€</span></td>
                        <td className={`${ReservationTableStyle.reservCol} ${ReservationTableStyle.dateReserv}`}><span>{`${new Date(data.createdAt).toLocaleDateString("fr-FR")} - ${new Date(data.createdAt).getHours()}:${new Date(data.createdAt).getMinutes()}`}</span></td>
                        <td className={`${ReservationTableStyle.reservCol} ${ReservationTableStyle.statusReser}`}><span>{status}</span></td>
                        <td className={`${ReservationTableStyle.reservCol} ${ReservationTableStyle.edit}`}>
                            {statusTable === "pending" ? (
                                <div>
                                    <button
                                        className={ReservationTableStyle.buttonIcon}
                                        title="Confirmer la réservation"
                                        onClick={() => handleStateChange(data._id, "confirmed")}
                                    >
                                        <LuClipboardCheck />
                                    </button>
                                    <button
                                        className={ReservationTableStyle.buttonIcon}
                                        title="Annuler la réservation"
                                        onClick={() => handleStateChange(data._id, "canceled")}
                                    >
                                        <LuClipboardX />
                                    </button>
                                </div>
                            ) : statusTable === "confirmed" ? (
                                <div>
                                    <button
                                        className={ReservationTableStyle.buttonIcon}
                                        title="Annuler la réservation"
                                        onClick={() => handleStateChange(data._id, "canceled")}
                                    >
                                        <LuClipboardX />
                                    </button>
                                    <button
                                        className={ReservationTableStyle.buttonIcon}
                                        title="Archiver la réservation"
                                        onClick={() => handleStateChange(data._id, "past")}
                                    >
                                        <LuFolderDown />
                                    </button>
                                </div>
                            ) : null}
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
    </div>
}

export default ReservationTable;