import { createSelector } from "@reduxjs/toolkit";

export const selectShops = (state) => state.shop.shops;

export const selectTotalShops = (state) => state.shop.shops.length;

export const selectLoading = (state) => state.shop.loading;

export const selectWatchingShop = (state) => state.shop.watchingShopId;

export const selectEditingProductId = (state) => state.shop.editingProductId;

export const selectProducts = (state) => state.shop.products;

// export const selectTitleForm = createSelector(
//     [selectEditingProductId],
//     (productId) => productId ? "Modification d'un produit" : "Ajout d'un produit"
// );

export const selectTitleForm = createSelector(
    [selectEditingProductId, (_, page) => page],
    (productId, page) => {
      console.log(page);
      switch (page) {
        case "produits":
          return productId ? "Modification d'un produit" : "Ajout d'un produit";
        case "reservations":
          return "Modifier cette réservation";
        case "boutique":
          return "Personnalisation de la boutique";
        default:
          return "Changement en cours...";
      }
    }
  );
  


export const selectInitialValuesForm = createSelector(
    [selectEditingProductId, selectProducts],
    (productId, products) => {
        if (!productId) return {
            nom: "",
            description: "",
            quantity: "",
            price: "",
        };

        const product = products.find(product => product._id === productId);
        return {
            nom: product.name.toString(),
            description: product.description.toString(),
            quantity: product.stock.toString(),
            price: product.price.toString(),
        };
    }
);

export const selectUserCurrentShop = (state) => state.shop.userCurrentShop;