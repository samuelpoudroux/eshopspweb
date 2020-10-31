import React from "react";
import Productlist from "./components/product/ProductList";
import Login from "./form/authentification/Login";
import Register from "./form/authentification/Register";
import ContactForm from "./form/contact/contactForm";
import PaiementPage from "./PaiementPage";
import CategoryPage from "./views/categories/CategoryPage";
import ProductDetail from "./views/product/ProductDetails";
const { default: HomePage } = require("./views/HomePage");
export const test = () => <h1>ProductDetails</h1>;
const Routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/login/:paiement",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register/:paiement",
    component: Register,
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
    path: "/categories/:name",
    component: CategoryPage,
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
    path: "/paiement",
    component: PaiementPage,
  },
];

export default Routes;
