import { useEffect } from "react";
import Axios from "axios";
import { useCallback } from "react";
import { useState } from "react";

const { REACT_APP_API_DOMAIN, REACT_APP_API_CATEGORIES } = process.env;

const useCategory = () => {
  const [categories, setCategories] = useState({ isLoading: false, list: [] });
  const getCategories = useCallback(async () => {
    setCategories({ ...categories, isLoading: true });
    const { data } = await Axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_CATEGORIES
    );
    setCategories({ ...categories, isLoading: false, list: data });
  }, [categories]);

  useEffect(() => {
    getCategories();
  }, []);
  return { categories };
};

export default useCategory;
