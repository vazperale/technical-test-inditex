import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProductListView from "./views/ProductListView"; 
import { CartProvider } from './context/cartContext';
import ProductDetailsView from "./views/ProductDetailsView"; 
import CartView from "./views/CartView"; 


export default function Router() {
    return (
        <BrowserRouter>
            <CartProvider>
                <Routes>
                    <Route path="/" element={<ProductListView />} />
                    <Route path="/:id" element={<ProductDetailsView />} />
                    <Route path="/cart" element={<CartView />} />
                </Routes>
            </CartProvider>
        </BrowserRouter>
    );
}
