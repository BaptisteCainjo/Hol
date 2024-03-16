import React from "react";
import SocialNetworksStyle from "./SocialNetworks.module.scss"
import { LuInstagram } from "react-icons/lu";
import { BiLogoLinkedin } from "react-icons/bi";
import { BiLogoTiktok } from "react-icons/bi";
import { Link } from "react-router-dom";

const SocialNetworks = () => {
    return <div className={SocialNetworksStyle.containerSocialNetworks}>
        <Link target="_blank" to={"https://www.instagram.com/holl.marketplace/"} className={`${SocialNetworksStyle.instagram} ${SocialNetworksStyle.icon}`}>
            <LuInstagram/>
        </Link>
        <Link target="_blank" to={"https://www.tiktok.com/@holl.marketplace"} className={`${SocialNetworksStyle.tiktok} ${SocialNetworksStyle.icon}`}>
            <BiLogoTiktok/>
        </Link>
        <Link target="_blank" to={"https://www.linkedin.com/in/holl-marketplace-5578342b1/"} className={`${SocialNetworksStyle.linkedin} ${SocialNetworksStyle.icon}`}>
            <BiLogoLinkedin/>
        </Link>
    </div>
}

export default SocialNetworks;