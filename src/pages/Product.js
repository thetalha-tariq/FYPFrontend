import React, { useState, useEffect } from "react";
import Products from "../Components/Products";


const Product = () => {
  return (
    <div>
      <div className="flex flex-row flex-grow">
        <li>All</li>
        <li>Food</li>
        <li>Accessories</li>
        <li>Equipments</li>
      </div>
      {<Products />}
    </div>

  );
};

export default Product;
