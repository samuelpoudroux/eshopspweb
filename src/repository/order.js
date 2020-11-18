import Axios from "axios";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_STOCK_NUMBER,
} = process.env;

export const checkAvaibalityOfProducts = async (product) => {
  try {
    const { data: num } = await Axios.get(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_STOCK_NUMBER +
        product.id
    );
    return num;
  } catch (error) {}
};
