import Floor from "../pages/Floor";
import Machines from "../pages/Machines";
import Products from "../pages/Products";

export const router = [
  {
    url: "/machines",
    name: "מכונות",
    component: <Machines />,
  },
  {
    url: "/products",
    name: "מוצרים",
    component: <Products />,
  },
  {
    url: "/floor",
    name: "רצפת גימור",
    component: <Floor />,
  },
];
