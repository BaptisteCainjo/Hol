import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addShop, deleteShop, loadShops } from "../features/shop/shopAction";
import { selectShops } from "../features/shop/shopSelector.js";
import { Link } from "react-router-dom";
import { API_SHOPS } from "../utils/config.js";

import Page404 from "./Page404.jsx";

import useSession from "../utils/hooks/useSession.js";

function AddShop() {
  const { user } = useSession();
  const dispatch = useDispatch();
  const shops = useSelector(selectShops);

  useEffect(() => {
    dispatch(loadShops());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    city: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addShop(formData));
  };

  const handleDelete = (shopId) => {
    dispatch(deleteShop(shopId));
  };

  const handleNameChange = (e) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const handleCityChange = (e) => {
    setFormData({ ...formData, city: e.target.value });
  };

  return (
    <>
      {user && user.role === "superAdmin" ? (
        <>
          <h2>Test</h2>
          <form onSubmit={handleSubmit}>
            <label>
              name:
              <input
                type="text"
                name="name"
                onChange={handleNameChange}
                value={formData.name}
              />
            </label>
            <label>
              description:
              <input
                type="text"
                name="description"
                onChange={handleDescriptionChange}
                value={formData.description}
              />
            </label>
            <label>
              city:
              <input
                type="text"
                name="city"
                onChange={handleCityChange}
                value={formData.city}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          {shops.map((shop) => (
            <p key={shop._id}>
              {shop._id}{" "}
              <button onClick={() => handleDelete(shop._id)}>X</button>
            </p>
          ))}
        </>
      ) : (
        <Page404 />
      )}
    </>
  );
}

export default AddShop;
