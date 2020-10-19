import _ from "lodash";

// sort product from higher to lowest  price
const sortProductsByHigher = (state) => {
  const copy = _.cloneDeep(state.sortedProducts);
  const sortedProducts = copy.sort(
    (productA, productB) => productB.productPrice - productA.productPrice
  );
  return { ...state, sortedProducts };
};

// sort product from lowest to higher  price
const sortProductsByLowest = (state) => {
  const copy = _.cloneDeep(state.sortedProducts);
  const sortedProducts = copy.sort(
    (productA, productB) => productA.productPrice - productB.productPrice
  );
  return { ...state, sortedProducts };
};

// sort product related to categories selected on select
const sortProductsByCategories = (state, categories) => {
  const copy = _.cloneDeep(state.products);
  let sortedProducts = [];
  categories.map((category) =>
    sortedProducts.push(
      ...copy.filter((product) => product.category === category.name)
    )
  );
  if (sortedProducts.length === 0) {
    sortedProducts = state.products;
  }
  return { ...state, sortedProducts };
};

const getNumberOfProducts = (basketList) => {
  const copy = _.cloneDeep(basketList);
  let num = 0;
  const totalOfProducts =
    copy !== undefined &&
    copy.reduce((accumulateur, valeurCourante) => {
      return accumulateur + valeurCourante.num;
    }, num);
  return totalOfProducts;
};

const getTotalPrice = (basketList) => {
  const copy = basketList !== null ? _.cloneDeep(basketList) : [];
  let num = 0;
  const totalPrice =
    copy !== undefined &&
    copy.reduce((accumulateur, valeurCourante) => {
      return accumulateur + valeurCourante.num * valeurCourante.productPrice;
    }, num);
  return totalPrice;
};

export {
  sortProductsByHigher,
  sortProductsByLowest,
  sortProductsByCategories,
  getNumberOfProducts,
  getTotalPrice,
};
