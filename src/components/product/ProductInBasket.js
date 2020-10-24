const ProductInBasket = ({ product }) => {
  const productInBasket =
    (JSON.parse(localStorage.getItem("basket")) &&
      JSON.parse(localStorage.getItem("basket")).find(
        (e) => product.id === e.id
      )) ||
    null;
  const num = productInBasket && productInBasket.num ? productInBasket.num : 0;
  return num;
};

export default ProductInBasket;
