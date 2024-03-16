import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReservationAdminArtisanStyle from "./ReservationAdminArtisans.module.scss"
import ReservationTable from "../ReservationTable/ReservationTable";
import { loadArtisanReservations } from "../../features/reservation/reservationAction";
import { selectReservations } from "../../features/reservation/reservationSelector";

const ReservationAdminArtisans = ({ user }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadArtisanReservations(user._id));
    }, [dispatch, user]);

    const reservations = useSelector(selectReservations);

    const enAttenteData = reservations
        .filter((data) => data.state === "pending")
        .sort((a, b) => new Date(a.dateReser) - new Date(b.dateReser));

    const confirmeData = reservations
        .filter((data) => data.state === "confirmed")
        .sort((a, b) => new Date(a.dateReser) - new Date(b.dateReser));

    const annuleData = reservations
        .filter((data) => data.state === "canceled")
        .sort((a, b) => new Date(a.dateReser) - new Date(b.dateReser));

    const passeData = reservations
        .filter((data) => data.state === "past")
        .sort((a, b) => new Date(a.dateReser) - new Date(b.dateReser))

    return (
        <section id={ReservationAdminArtisanStyle.products}>
            <div className={ReservationAdminArtisanStyle.productHeader}>
                <h1>Les réservations</h1>
                {/* mettre ici search */}
            </div>
            <ReservationTable statusTable={"pending"} tabDatas={enAttenteData} />
            <ReservationTable statusTable={"confirmed"} tabDatas={confirmeData} />
            <ReservationTable statusTable={"canceled"} tabDatas={annuleData} />
            <ReservationTable statusTable={"past"} tabDatas={passeData} />
        </section>
    );
};

export default ReservationAdminArtisans;