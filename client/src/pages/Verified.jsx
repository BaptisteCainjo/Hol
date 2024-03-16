// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { MODIF_SECRETKEY, REGISTER__TIME_AFTER_MAIL, SEND_EMAIL, SEND_EMAIL_TO_COMPANY, VERIF_UPDATE, VERIF_USERS, generateFormattedUUID } from "../utils/config.js";

// function Verified() {
//   const { search } = useLocation();
//   const queryParams = new URLSearchParams(search);
//   const userEmail = queryParams.get("email");
//   const [verifNumber, setVerifNumber] = useState("");
//   const [msgVerif, setMsgVerif] = useState();
//   const [seconds, setSeconds] = useState(REGISTER__TIME_AFTER_MAIL);

//   let paragraphStyle = {
//     color: "grey",
//     cursor: "default",
//     border: "1px solid grey",
//     width: "fit-content",
//   };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => {
//         if (prevSeconds === 0) {
//           clearInterval(interval);
//           return 0;
//         } else {
//           return prevSeconds - 1;
//         }
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [seconds]);

//   if (seconds === 0) {
//     paragraphStyle = {
//       color: "black",
//       cursor: "pointer",
//       border: "none",
//       textDecoration: "underline",
//     };
//   }

//   const handleVerification = async () => {
//     try {
//       const userResponse = await axios.get(VERIF_USERS, {
//         params: {
//           email: userEmail,
//         },
//       });

//       if (userResponse.data.secretKey === verifNumber) {
//         await axios.post(VERIF_UPDATE, {
//           email: userEmail,
//           verified: true,
//         });
//         setMsgVerif("Le numéro de vérification est correct.");
//         console.log("userResponse.data", userResponse);
//         await axios.get(
//           `${SEND_EMAIL_TO_COMPANY}?lastName=${userResponse.data.lastName}&firstName=${userResponse.data.firstName}&email=${userResponse.data.email}&createdAt=${userResponse.data.createdAt}`
//         );
//       } else {
//         setMsgVerif("Le numéro de vérification est incorrect.");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la vérification", error);
//     }
//   };

//   const handleSendBack = async () => {
//     if (seconds === 0) {
//       setSeconds(REGISTER__TIME_AFTER_MAIL);
//       try {
//         const userResponse = await axios.get(VERIF_USERS, {
//           params: {
//             email: userEmail,
//           },
//         });
//         const newSecretKey = generateFormattedUUID();
//         await axios.get(
//           `${SEND_EMAIL}?lastName=${userResponse.data.lastName}&firstName=${userResponse.data.firstName}&email=${userResponse.data.email}&secretKey=${newSecretKey}`
//         );
//         await axios.put(`${MODIF_SECRETKEY}?email=${userResponse.data.email}&secretKey=${newSecretKey}`, {
//           email: userEmail,
//           secretKey: newSecretKey,
//         });
//       } catch (error) {
//         console.error("Erreur lors de la connexion", error);
//       }
//     }
//   }

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${minutes.toString().padStart(2, "0")}:${seconds
//       .toString()
//       .padStart(2, "0")}`;
//   };

//   return (
//     <>
//       <p>Un mail a été envoyé à {userEmail}</p>
//       <p>Vous avez 10 minutes pour valider votre compte ! </p>
//       <p>Temps restant : {formatTime(seconds)}</p>
//       <Link to={`?email=${userEmail}`} style={paragraphStyle} onClick={handleSendBack}>Renvoyer le lien de validation</Link>
//       <div>
//         <label htmlFor="verifNumber">VerifNumber</label>
//         <input
//           type="text"
//           onChange={(e) => setVerifNumber(e.target.value)}
//           required
//         />
//         {msgVerif}
//       </div>
//       <button onClick={handleVerification}>Vérifier</button>
//     </>
//   );
// }

// export default Verified;
