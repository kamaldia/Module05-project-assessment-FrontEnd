import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../Components/ProductCard.jsx";
import '../Components/ProductCard.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fake_products = [{ // i will use this instead of fetched, all fake products in jsx map must be changed to products state
    title: "product1",
    description: "description for product1",
    price: 10,
    image: "image url"
  }, {
    title: "product2",
    description: "description for product2",
    price: 20,
    image: "image url"
  }]

  const fetchProducts = useCallback(async () => {
    try {
      console.log("fetching products in user products");
      const products_response = await axios.get("http://localhost:8000/api/product/"); //doesnt have backend
      if (products_response.data.length === 0) {
        console.error("user products array is empty");
      } else {
        setProducts(products_response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("finished fetching products in user products");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <section className="user-products-main">
        {!loading ? (fake_products && fake_products.length > 0 ? (fake_products.map((product, index) => (
          <section key={index} className="User-product-card-and-buttons-container">
            <ProductCard product={product} />
          </section>
        ))) : (<p>no products found</p>)) : (<p className="user-products-loading">Loading Products</p>)}
      </section>
    </>
  );
};

export default Products;