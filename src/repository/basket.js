import _ from "lodash";
//add product to basket
const addProductToBasket = (state = [], action) => {
  const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const produitIsAlreadyAdded = currentBasket.find(
    (product) => product.id === action.product.id
  );

  if (produitIsAlreadyAdded === undefined) {
    localStorage.setItem(
      "basket",
      JSON.stringify([
        ...currentBasket,
        {
          ...action.product,
          num: 1,
        },
      ])
    );
    return [
      ...currentBasket,
      {
        ...action.product,
        num: 1,
      },
    ];
  } else {
    const productIndex = currentBasket.findIndex(
      (product) => product.id === action.product.id
    );
    currentBasket.splice(productIndex, 1, {
      ...action.product,
      num: (produitIsAlreadyAdded.num += 1),
    });
    localStorage.setItem("basket", JSON.stringify([...currentBasket]));
  }
  return [...currentBasket];
};

const addAllFavoritesToBasket = async (currentState, action) => {
  const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const favorites = action.favorites;
  favorites.map((favorite) => {
    const productAlreadyInBasket = currentBasket.find(
      (e) => e.id === favorite.id
    );
    if (!productAlreadyInBasket) {
      currentBasket.push({ ...favorite, num: 1 });
    }
  });
  localStorage.setItem("basket", JSON.stringify([...currentBasket]));
  return [...currentBasket];
};

// remove prodcut from basket
const decreaseProductFromBasket = (state, action) => {
  const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const productIsHad = currentBasket.find(
    (product) => product.id === action.product.id
  );
  if (productIsHad !== undefined) {
    const productIndex = currentBasket.findIndex(
      (product) => product.id === action.product.id
    );
    if (productIsHad.num === 1) {
      currentBasket.splice(productIndex, 1);
    } else {
      currentBasket.splice(productIndex, 1, {
        ...productIsHad,
        num: productIsHad.num > 1 ? productIsHad.num - 1 : 0,
      });
    }
  }

  localStorage.setItem("basket", JSON.stringify([...currentBasket]));
  return [...currentBasket];
};
// remove all products from basket
const removeAllProductsFromBasket = () => {
  localStorage.setItem("basket", JSON.stringify([]));
  return [];
};
// remove prodcuts from basket
const decreaseProductsFromBasket = (state, action) => {
  const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];

  const productIsHad = currentBasket.find(
    (product) => product.id === action.product.id
  );

  if (productIsHad !== undefined) {
    const productIndex = currentBasket.findIndex(
      (product) => product.id === action.product.id
    );
    currentBasket.splice(productIndex, 1, {
      ...productIsHad,
      num: productIsHad.num - action.number || 0,
    });
  }
  localStorage.setItem("basket", JSON.stringify([...currentBasket]));
  return [...currentBasket];
};

const removeProductFromBasket = (state, action) => {
  const currentBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const productToDecrease = currentBasket.find(
    (product) => product.id === action.product.id
  );
  if (productToDecrease !== undefined) {
    const productIndex = currentBasket.findIndex(
      (product) => product.id === action.product.id
    );
    currentBasket.splice(productIndex, 1);
  }
  localStorage.setItem("basket", JSON.stringify([...currentBasket]));
  return [...currentBasket];
};
export {
  addProductToBasket,
  decreaseProductFromBasket,
  removeAllProductsFromBasket,
  removeProductFromBasket,
  decreaseProductsFromBasket,
  addAllFavoritesToBasket,
};
