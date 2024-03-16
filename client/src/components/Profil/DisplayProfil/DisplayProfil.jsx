import DisplayProfilStyle from "./DisplayProfil.module.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "../../../assets/images/product.webp";
import { loadClientReservations, updateReservationState } from "../../../features/reservation/reservationAction.js";
import { selectClientReservations } from "../../../features/reservation/reservationSelector.js";

const DisplayProfil = ({
  userProfile,
  reservations,
  currentPage = "infos",
  user,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadClientReservations(user._id))
  }, [dispatch, user]);

  const clientReservations = useSelector(selectClientReservations);

  const handleReservationCancel = (reservationId) => {
    if (window.confirm("Êtes-vous sûr de vouloir annuler cette réservation ?")) {
      dispatch(updateReservationState({ reservationId, state: "canceled", origin: "client" }));
    }
  }

  return (
    <div className={DisplayProfilStyle.Display}>
      {currentPage === "infos" && (
        <div className={DisplayProfilStyle.DisplayInfos}>
          <h2>
            Informations{" "}
            <span className={DisplayProfilStyle.titleGradient}>
              Personnelles
            </span>
          </h2>
          <form>
            <label>
              Nom
              <input
                type="text"
                name="lastName"
                readOnly
                defaultValue={user.lastName}
              />
            </label>
            <label>
              Prénom
              <input
                type="text"
                name="name"
                readOnly
                defaultValue={user.firstName}
              />
            </label>
            <label>
              E-mail
              <input
                type="text"
                name="email"
                readOnly
                defaultValue={user.email}
              />
            </label>
            <label>
              Rôle
              <input
                type="text"
                name="role"
                readOnly
                defaultValue={user.role === "user" ? "Client" : "Artisan"}
              />
            </label>
            {user.role === "artisan" && (
              <>
                <label>
                  Numéro de Téléphone
                  <input
                    type="text"
                    name="phoneNumber"
                    readOnly
                    defaultValue={user.shopPhoneNumber}
                  />
                </label>
                <label>
                  Nom de la Boutique
                  <input
                    type="text"
                    name="shopName"
                    readOnly
                    defaultValue={user.shopName}
                  />
                </label>
                <label>
                  Adresse
                  <input
                    type="text"
                    name="address"
                    readOnly
                    defaultValue={`${user.shopAddressStreet}, ${user.shopAddressPostalCode} ${user.shopAddressCity}, ${user.shopAddressCountry}`}
                  />
                </label>
              </>
            )}
          </form>
        </div>
      )}
      {currentPage === "reservations" && (
        <div className={DisplayProfilStyle.DisplayReservation}>
          <h2>
            Mes{" "}
            <span className={DisplayProfilStyle.titleGradient}>
              réservations
            </span>
          </h2>
          <div className={DisplayProfilStyle.reservationsGoing}>
            <h4 className={DisplayProfilStyle.reservationsGoingTitle}>
              Mes réservations en cours
            </h4>
            <div className={DisplayProfilStyle.reservationsGoingListe}>
              {clientReservations.map((data, key) => (
                <div
                  key={key}
                  className={DisplayProfilStyle.reservationsGoingUneReservation}
                >
                  <div className={DisplayProfilStyle.reservationsBarTop}>
                    <div className={DisplayProfilStyle.reservationsInfos}>
                      <p className={DisplayProfilStyle.reservationsInfosTitre}>
                        Commande effectuée le
                      </p>
                      <p
                        className={DisplayProfilStyle.reservationsInfosDonnees}
                      >
                        {`${new Date(data.createdAt).toLocaleDateString("fr-FR")} - ${new Date(data.createdAt).getHours()}:${new Date(data.createdAt).getMinutes()}`}
                      </p>
                    </div>
                    <div className={DisplayProfilStyle.reservationsInfos}>
                      <p className={DisplayProfilStyle.reservationsInfosTitre}>
                        Statut
                      </p>
                      <p
                        className={DisplayProfilStyle.reservationsInfosDonnees}
                      >
                        {data.state === "pending" ? "En attente" 
                        : data.state === "confirmed" ? "Confirmée"
                        : data.state === "canceled" ? "Annulée"
                        : data.state === "past" ? "Passée"
                        : "Inconnu"}
                      </p>
                    </div>
                    <div className={DisplayProfilStyle.reservationsInfos}>
                      <p className={DisplayProfilStyle.reservationsInfosTitre}>
                        N° de commande
                      </p>
                      <p
                        className={DisplayProfilStyle.reservationsInfosDonnees}
                      >
                        {data._id}
                      </p>
                    </div>
                  </div>
                  <div className={DisplayProfilStyle.reservationsProduct}>
                    <img src={Image} alt="" />
                    <div
                      className={DisplayProfilStyle.reservationsProductTitle}
                    >
                      <p
                        className={
                          DisplayProfilStyle.reservationsProductTitleProduct
                        }
                      >
                        {data.product.name}
                      </p>
                      <p
                        className={
                          DisplayProfilStyle.reservationsProductTitleShop
                        }
                      >
                        {data.product.shop}
                      </p>
                    </div>
                    <p className={DisplayProfilStyle.reservationsProductPrice}>
                      {data.product.price}
                      <span>€</span>
                    </p>
                  </div>
                  <div className={DisplayProfilStyle.reservationsBarBottom}>
                    {
                      data.state === "pending" || data.state === "confirmed" ? (
                        <div>
                          <button
                            className={DisplayProfilStyle.cancelReservationButton}
                            onClick={() => handleReservationCancel(data._id)}
                          >
                            Annuler ma réservation
                          </button>
                        </div>
                      ) : null
                    }
                    <div className={DisplayProfilStyle.reservationsBarBottomCode}>
                      <span>#</span>9874521
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <hr />
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayProfil;
