import React from "react";
import './ProductCard.css';

const ProductCard = ({ product }) => {

  return (
    <>
    <div className="container-of-product-card-and-edit-product-in-user-products">
      <div className="products-card-container">
        <article className="product-card">
          <img src={`http://localhost:8000/${product.image}`} alt="product image" className="product-image-in-product-card" />
          <section className="product-details-in-product-card">
            <h2 className="product-title-in-product-card">Title: {product.title}</h2>
            <p className="product-description-in-product-card">Description: {product.description}</p>
            <p className="product-price-in-product-card">Price: {product.price}$</p>
          </section>
        </article>
      </div>
    </div >
    </>
  )
}

export default ProductCard;