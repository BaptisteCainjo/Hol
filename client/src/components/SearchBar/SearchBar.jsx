import React, { useState, useEffect } from "react";
import SearchBarStyle from "./Searchbar.module.scss";
import { LuSearch } from "react-icons/lu";

const SearchBar = ({ updateSearchTerm, classContainer }) => {
    const [localSearchTerm, setLocalSearchTerm] = useState("");

    const handleChange = (event) => {
        const term = event.target.value;
        setLocalSearchTerm(term);
        updateSearchTerm(localSearchTerm);
    };

    return (
        <div className={`${SearchBarStyle.navbarMenuSearch} ${classContainer}`}>
            <input
                className={SearchBarStyle.navbarMenuSearchInput}
                type="text"
                name=""
                id=""
                placeholder="Rechercher une boutique ..."
                value={localSearchTerm}
                onChange={handleChange}
            />
            <div className={SearchBarStyle.navbarMenuSearchIcon}>
                <LuSearch />
            </div>
        </div>
    );
};

export default SearchBar;