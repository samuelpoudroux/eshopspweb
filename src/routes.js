import React from "react";
import Productlist from "./components/product/ProductList";
import Login from "./form/authentification/Login";
import Register from "./form/authentification/Register";
import ContactForm from "./form/contact/contactForm";
import ProductDetails from "./views/product/ProductDetails";
const { default: HomePage } = require("./views/HomePage");
export const test = () => <h1>ProductDetails</h1>;
const Routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/products",
    component: Productlist,
  },
  {
    path: "/contact",
    component: ContactForm,
  },
  {
    path: "/productDetails/:id",
    component: test,
  },
  {
    protected: true,
    path: "/product/add",
    component: Login,
  },
];

export default Routes;
