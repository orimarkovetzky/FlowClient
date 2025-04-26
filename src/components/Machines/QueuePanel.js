import React, { useState } from "react";
import { Menu } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Draggable item component
const DraggableQueueItem = ({ item, index, moveItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "QUEUE_ITEM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "QUEUE_ITEM",
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const itemClass = `queue-item queue-item--${item.status} ${
    isDragging ? "queue-item--dragging" : ""
  }`;

  const iconColorField = item.isRing ? "borderColor" : "backgroundColor";
  const iconClass = item.isRing ? "ring" : "finger";

  const content = (
    <div className={itemClass}>
      <div className="queue-item__content">
        <div className="queue-item__icon">
          <div className={`product-item__icon`}>
            <div className="product-item__status-icon">
              <div
                style={{ [iconColorField]: item.color }}
                className={`product-item__status-icon__inner ${iconClass}`}
              ></div>
            </div>
          </div>
        </div>
        <div className="queue-item__details">
          <div className="queue-item__header">
            <div></div>
            <div>{item.name}</div>
          </div>
          <div className="queue-item__units">{item.units} יחידות</div>
          <div className="queue-item__time">
            {!item.inQueue
              ? `זמן בתהליך: ${item.processTime} שעות`
              : `זמן מתוך: ${item.processTime} שעות`}
          </div>
        </div>
        {item.inQueue ? (
          <div className="queue-item__drag-bar">
            <Menu size={30} />
          </div>
        ) : (
          <div className="queue-item__progress-bar-container">
            <div
              className="queue-item__progress-bar"
              style={{ width: `${item.progress}%` }}
            ></div>
            <p>{item.progress}%</p>
          </div>
        )}
      </div>
    </div>
  );

  if (item.inQueue) {
    return (
      <div
        ref={(node) => drag(drop(node))}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        {content}
      </div>
    );
  }

  return content;
};

export default function QueuePanel({ machine }) {
  const [products, setProducts] = useState(machine.products || []);

  // Update products when machine changes
  React.useEffect(() => {
    setProducts(machine.products || []);
  }, [machine]);

  const moveItem = (fromIndex, toIndex) => {
    const updatedProducts = [...products];
    const [movedItem] = updatedProducts.splice(fromIndex, 1);
    updatedProducts.splice(toIndex, 0, movedItem);
    setProducts(updatedProducts);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="queue-panel">
        <h2 className="queue-panel__title">מוצרים בתור ל{machine.name}:</h2>
        <p className="queue-panel__count">
          סה"כ מוצרים: {products.length || 0}
        </p>
        <div className="queue-items">
          {products.map((item, index) => (
            <DraggableQueueItem
              key={item.id}
              item={item}
              index={index}
              moveItem={moveItem}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}
