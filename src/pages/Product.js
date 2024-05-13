import React, { useState, useEffect } from "react";
import Products from "../Components/Products";


const Product = () => {
  return (
    <div className="mt-3">
      <nav className="col-span-12 md:col-span-10 overflow-auto ">
        <ul className="nav-links">
          <li className="cursor-pointer">
            <a>  All</a>
          </li>
          <li className="cursor-pointer">
            <a>Food</a>        </li>
          <li className="cursor-pointer">
            <a>Accessories</a>          </li>
          <li className="cursor-pointer">
            <a> Equipments</a>          </li>
        </ul>
      </nav>
      {<Products />}
    </div>
  );
};

export default Product;
