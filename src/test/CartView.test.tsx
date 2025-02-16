import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import '@testing-library/jest-dom'; // Asegúrate de importar esto
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductListView from '../views/ProductListView'; // Ruta de tu componente
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../context/cartContext'; // Importa tu CartProvider
import CartView from '../views/CartView';
import ProductDetailsView from '../views/ProductDetailsView';

describe('CartView', () => {

    it('should return to home page', async () => {
        // Renderiza el componente con un MemoryRouter que simula la URL
        render(
            <CartProvider>
                <MemoryRouter initialEntries={['/cart']}> 
                    <Routes>
                        <Route path="/cart" element={<CartView />} />
                        <Route path="/" element={<ProductListView />} />
                    </Routes>
                </MemoryRouter>
            </CartProvider>
        );

        // Espera a que el botón "Continue Shopping" esté disponible en el DOM
        const continueShoppingButton = await screen.findByTestId('continue-shopping-desktop');

        // Simula el clic en "Continue Shopping"
        fireEvent.click(continueShoppingButton);

        await waitFor(() => screen.getByTestId('home-view')); // Espera explícitamente a que la vista de inicio esté en el DOM

        const homeView = screen.getByTestId('home-view');
        expect(homeView).toBeInTheDocument(); // Verifica que el home se haya renderizado correctamente

        // Ahora espera a que los productos estén renderizados
        await waitFor(() => screen.getAllByTestId('product-item')); // Espera explícitamente a que los productos estén renderizados

        // Verifica si los productos están en el DOM
        const productItems = screen.getAllByTestId('product-item'); // Esto debería devolver los productos si están bien renderizados
        expect(productItems.length).toBe(20); // Verifica que hay 20 productos
    }); 

    it('should add a product to the cart and update when removed', async () => {
        // Renderiza los componentes con un MemoryRouter
        render(
          <CartProvider>
            <MemoryRouter initialEntries={['/SMG-S24U']}> {/* Supón que ya estás en la página de producto */}
              <Routes>
                <Route path="/:id" element={<ProductDetailsView />} />
                <Route path="/cart" element={<CartView />} />
              </Routes>
            </MemoryRouter>
          </CartProvider>
        );
      
        const storageOption2 =await screen.findByTestId('256 GB');
        fireEvent.click(storageOption2);

        // Espera a que los productos y botones estén disponibles
        const addToCartButton = await screen.findByTestId('add-cart'); // El botón de agregar al carrito
        fireEvent.click(addToCartButton); // Simula el clic en el botón de agregar al carrito
      
        // Espera a que el producto sea añadido al carrito y navega al carrito
        await waitFor(() => screen.getByTestId('cart-view'));
      
        // Verifica que el producto ha sido añadido al carrito
        const addedProduct = screen.getByText('Galaxy S24 Ultra'); // Verifica el nombre del producto añadido
        expect(addedProduct).toBeInTheDocument(); 
      
        // Verifica que el carrito contiene el producto añadido
        const productItemInCart = screen.getByTestId('cart-product-item'); // Supón que cada producto tiene un testId 'cart-product-item'
        expect(productItemInCart).toBeInTheDocument();
      
        // Ahora vamos a simular el clic en el botón de "remove" para eliminar el producto
        const removeButton = screen.getByTestId('remove-product'); // Asegúrate de tener un testId en el botón de eliminar
        fireEvent.click(removeButton);
      
        // Espera a que el carrito se actualice después de eliminar el producto
        await waitFor(() => {
          // Verifica que el producto haya sido eliminado correctamente
          const removedProduct = screen.queryByText('Galaxy S24 Ultra'); // Esto debería ser null después de la eliminación
          expect(removedProduct).not.toBeInTheDocument();
        });
      
        // Verifica que el carrito esté vacío o actualizado correctamente
        const emptyCartMessage = screen.getByTestId('text-cart-items'); // Suponiendo que muestra este mensaje cuando el carrito está vacío
        expect(emptyCartMessage).toHaveTextContent('0');
      });
      

}); 