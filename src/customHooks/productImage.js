import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useProductImages = (uid) => {
  const [images, setImages] = useState([]);
  const {
    REACT_APP_API_DOMAIN,
    REACT_APP_API_PRODUCT,
    REACT_APP_API_IMAGES,
  } = process.env;

  const getImages = useCallback(async () => {
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_IMAGES +
        `${uid}`
    );
    setImages(data);
  }, [uid]);

  useEffect(() => {
    getImages();
  }, [uid]);

  return { images };
};

export default useProductImages;
