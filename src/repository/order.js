import Axios from "axios";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_STOCK_NUMBER,
} = process.env;

export const checkAvaibalityOfProducts = async (product) => {
  try {
    const { data: stockNumber } = await Axios.get(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_STOCK_NUMBER +
        product.uid
    );
    console.log("toto", stockNumber);
    return stockNumber;
  } catch (error) {}
};
