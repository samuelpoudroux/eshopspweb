import _, { isArray } from "lodash";
import { checkAvaibalityOfProducts } from "./order";

// sort product from higher to lowest  price
const sortProductsByHigher = (state) => {
  const copy = _.cloneDeep(state.sortedProducts);
  const sortedProducts = copy.sort(
    (productA, productB) => productB.productPrice - productA.productPrice
  );
  return { ...state, sortedProducts, notFound: false };
};

// sort product from lowest to higher  price
const sortProductsByLowest = (state) => {
  const copy = _.cloneDeep(state.sortedProducts);
  const sortedProducts = copy.sort(
    (productA, productB) => productA.productPrice - productB.productPrice
  );
  return { ...state, sortedProducts, notFound: false };
};

// sort product related to categories selected on select
const sortProductsByCategories = (state, categories) => {
  const copy = _.cloneDeep(state.sortedProducts);
  let sortedProducts = [];
  categories.map((category) =>
    sortedProducts.push(
      ...copy.filter((product) => product.category === category.name)
    )
  );
  if (sortedProducts.length === 0) {
    sortedProducts = state.products;
  }
  return { ...state, sortedProducts, notFound: false };
};
// sort product related to maxPrice
const sortProductsByMaxPrice = (state, value) => {
  const copy = _.cloneDeep(state.sortedProducts);
  let sortedProducts = [];
  sortedProducts.push(
    ...copy.filter((product) => product.productPrice <= value)
  );

  if (sortedProducts.length === 0) {
    return { ...state, sortedProducts: copy, notFound: value };
  }
  return { ...state, sortedProducts, notFound: false };
};

const getNumberOfProducts = (basketList) => {
  const copy = _.cloneDeep(basketList);
  let num = 0;
  const totalOfProducts =
    copy !== undefined &&
    copy.reduce((accumulateur, valeurCourante) => {
      let currentValue;
      if (valeurCourante.num >= valeurCourante.stockNumber) {
        currentValue = valeurCourante.stockNumber;
      } else {
        currentValue = valeurCourante.num;
      }
      return accumulateur + currentValue;
    }, num);
  return totalOfProducts;
};

const getTotalPrice = (productList) => {
  const copy = productList !== null ? _.cloneDeep(productList) : [];
  let num = 0;
  const totalPrice =
    copy !== undefined &&
    copy.reduce((accumulateur, valeurCourante) => {
      let currentValue;
      if (valeurCourante.num >= valeurCourante.stockNumber) {
        currentValue = valeurCourante.stockNumber;
      } else {
        currentValue = valeurCourante.num;
      }
      return accumulateur + currentValue * valeurCourante.productPrice;
    }, num);
  return totalPrice.toFixed(2);
};

const checkProductsAvaibality = async (productList) => {
  const copy = _.cloneDeep(productList);
  Array.isArray(productList) &&
    productList.length > 0 &&
    (await Promise.all(
      productList.map(async (product) => {
        const stockNumber = await checkAvaibalityOfProducts(product);
        const indexOf = copy.indexOf(copy.find((p) => p.id === product.id));
        copy.splice(indexOf, 1, {
          ...product,
          stockNumber: stockNumber,
          num:
            product.num !== "produit supprimé" && product.num > stockNumber
              ? stockNumber
              : product.num,
        });
      })
    ));
  return copy;
};

export {
  sortProductsByHigher,
  sortProductsByLowest,
  sortProductsByCategories,
  getNumberOfProducts,
  getTotalPrice,
  sortProductsByMaxPrice,
  checkProductsAvaibality,
};
