import React from "react";
import Productlist from "./components/product/ProductList";
import Login from "./form/authentification/Login";
import Register from "./form/authentification/Register";
import ContactForm from "./form/contact/contactForm";
import CategoryPage from "./views/categories/CategoryPage";
import ProductDetail from "./views/product/ProductDetails";
import CommandResume from "./CommandResume";
import Paiement from "./Paiement";
const { default: HomePage } = require("./views/HomePage");
export const test = () => <h1>ProductDetails</h1>;
export const test2 = () => <h1>modifier mes informations</h1>;
const Routes = [
  {
    path: "/",
    exact: true,
    component: HomePage,
  },
  {
    path: "/login/:commandResume",
    component: Login,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register/:commandResume",
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
    component: ProductDetail,
  },
  {
    path: "/commandeResume",
    component: CommandResume,
  },
  {
    path: "/paiement",
    component: Paiement,
  },
  {
    path: "/informations",
    component: test2,
  },
];

export default Routes;
