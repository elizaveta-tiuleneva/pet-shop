import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import AllProductsPage from "./pages/AllProducts";
import AllSalesPage from "./pages/AllSales";
import Category from "./pages/Category";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:id" element={<Category />} />
        <Route path="/products" element={<AllProductsPage />} />
        <Route path="/sales" element={<AllSalesPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
