import React, { useState } from "react";
import Header from "../layout/Header";
import ProductsCategories from "../components/Products/ProductsCategories";
import ProductDetailPopup from "../components/Products/ProductDetailPopup";
import { demoProducts } from "../constants/demoData";

export default function Products() {
  // Data model for products
  const [products, setProducts] = useState(demoProducts);

  // State for currently selected product
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Handle product selection
  const handleProductSelect = (product, category) => {
    setSelectedProduct(product);
    setSelectedCategory(category);
    setShowPopup(true);
  };

  // Close popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="products-container" dir="rtl">
      <div className="products">
        <ProductsCategories
          products={products}
          onProductSelect={handleProductSelect}
          selectedProduct={selectedProduct}
        />
      </div>
      
      {showPopup && selectedProduct && (
        <ProductDetailPopup 
          product={selectedProduct} 
          onClose={handleClosePopup} 
        />
      )}
    </div>
  );
}