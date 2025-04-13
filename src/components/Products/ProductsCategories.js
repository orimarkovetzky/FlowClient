import React from "react";
import { Menu } from "lucide-react";

export default function ProductsCategories({
  products,
  onProductSelect,
  selectedProduct,
}) {
  const categories = [
    {
      id: "new",
      title: "חדשים",
      data: products.filter((item) => item.status === "new"),
    },
    {
      id: "inProcess",
      title: "בתהליך",
      data: products.filter((item) => item.status === "inProcess"),
    },
    {
      id: "completed",
      title: "גמורים",
      data: products.filter((item) => item.status === "completed"),
    },
  ];

  // Function to determine if a product has progress (only for inProcess items)
  const hasProgress = (product) => {
    return product.status === "inProcess" && product.progress !== undefined;
  };

  return (
    <div className="products-categories">
      {categories.map((category) => (
        <div key={category.id} className="product-category">
          <div className="product-category__header">
            <h3>{category.title}</h3>
          </div>
          <div className="product-category__content">
            {category.data.map((product) => {
              const iconColorField = product.isRing
                ? "borderColor"
                : "backgroundColor";
              const iconClass = product.isRing ? "ring" : "finger";
              return (
                <div
                  key={product.id}
                  className={`product-item ${
                    selectedProduct && selectedProduct.id === product.id
                      ? "product-item--selected"
                      : ""
                  }`}
                  onClick={() => onProductSelect(product, category.id)}
                >
                  <div className="product-item__content">
                    <div className={`product-item__icon`}>
                      <div className="product-item__status-icon">
                        <div
                          style={{ [iconColorField]: product.color }}
                          className={`product-item__status-icon__inner ${iconClass}`}
                        ></div>
                      </div>
                    </div>
                    <div className="product-item__details">
                      <div className="product-item__header">
                        <div></div>
                        <div>{product.name}</div>
                      </div>
                      <div className="product-item__units">
                        {product.units} יחידות
                      </div>
                      <div className="product-item__time">
                        {category.id === "inProcess"
                          ? `זמן בתהליך: ${product.processTime} שעות`
                          : `זמן מתוך: ${product.processTime} שעות`}
                      </div>
                      {category.id === "inProcess" && product.machine && (
                        <div className="product-item__machine">
                          מכונה: {product.machine}
                        </div>
                      )}
                    </div>

                    <div className="product-item__date">{product.date}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
