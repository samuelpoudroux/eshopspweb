import Login from "../form/authentification/Login";

//add product to basket
const addProductToBasket = (test = [], action) => {
  console.log("toto", action.num);
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
          num: action.num,
        },
      ])
    );
    return [
      ...currentBasket,
      {
        ...action.product,
        num: action.num,
      },
    ];
  } else {
    const productIndex = currentBasket.findIndex(
      (product) => product.id === action.product.id
    );
    currentBasket.splice(productIndex, 1, {
      ...action.product,
      num: (produitIsAlreadyAdded.num += action.num),
    });
    localStorage.setItem("basket", JSON.stringify([...currentBasket]));
  }
  return [...currentBasket];
};

// remove prodcut from basket
const decreaseProductFromBasket = (test, action) => {
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
      num: productIsHad.num > 0 ? productIsHad.num - action.num : 0,
    });
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
const decreaseProductsFromBasket = (test, action) => {
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

const removeProductFromBasket = (test, action) => {
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
};
