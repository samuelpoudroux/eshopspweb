import React from "react";
import PropTypes from "prop-types";

const CategoryPage = ({ match }) => {
  return <h1>Liste des produits de la catégorie {match.params.name}</h1>;
};

export default CategoryPage;
