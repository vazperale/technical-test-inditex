import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import '@testing-library/jest-dom'; // Asegúrate de importar esto
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductDetailsView from '../views/ProductDetailsView'; // Ruta de tu componente
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider} from '../context/cartContext'; // Importa tu CartProvider
import { getMobile } from '../api/mobileStoreApi';
import CartView from '../views/CartView';

describe('ProductDetailsView', () => {

  it('should show correct information of product by id', async () => {

    const product = await getMobile('SMG-S24U');

    // Asegúrate de que recibe un producto
    expect(product).not.toBeNull();
    expect(product).toBeDefined();

    // Renderiza el componente con un MemoryRouter que simula la URL
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/SMG-S24U']}>
          <Routes>
            <Route path="/:id" element={<ProductDetailsView />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

    // Espera a que los productos se carguen y aparezcan en el DOM
    await waitFor(() => {
      const phoneDetailsColor = screen.getByTestId('Titanium Black'); // Busca el contenedor principal
      const phoneDetailsStorage = screen.getByTestId('256 GB'); // Busca el contenedor principal
      expect(phoneDetailsColor).toBeInTheDocument();
      expect(phoneDetailsStorage).toBeInTheDocument();

    });
  });

  it('should change the image when you click in one color and appears the price', async () => {

    // Renderiza el componente con un MemoryRouter que simula la URL
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/SMG-S24U']}>
          <Routes>
            <Route path="/:id" element={<ProductDetailsView />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );


    await waitFor(()=>{
      const phoneDetailsColor = screen.getByTestId('Titanium Black');

      // Encuentra la imagen inicial
      const initialImage = screen.getByTestId('image-details') as HTMLImageElement;
      const initialSrc = initialImage.src; // Busca el contenedor principal
  
      fireEvent.click(phoneDetailsColor);

      const updatedImage = screen.getByTestId('image-details') as HTMLImageElement;
      expect(updatedImage.src).not.toBe(initialSrc); // Verifica que la URL haya cambiado
      expect(screen.getByTestId('div-price-details') ).toBeInTheDocument(); // Verifica que la URL haya cambiado
      
    });
  });


  it('should change the price when you change the storage and appear it', async () => {


    // Renderiza el componente con un MemoryRouter que simula la URL
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/SMG-S24U']}>
          <Routes>
            <Route path="/:id" element={<ProductDetailsView />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

  

  // Espera a que el precio cambie nuevamente
  await waitFor(() => {

  // Encuentra el botn de almacenamiento
  const storageOption2 = screen.getByTestId('256 GB'); // Cambia el nombre según las opciones disponibles

  // Encuentra el precio inicial
  const priceElement = screen.getByTestId('div-price-details'); // Busca el texto que contiene el precio
  const initialPrice = priceElement.textContent;

  // Simula el clic en el  almacenamiento
  fireEvent.click(storageOption2);
    const updatedPrice2 = screen.getByTestId('div-price-details'); 
    expect(updatedPrice2.textContent).not.toBe(initialPrice); // Verifica que el precio sea diferente al inicial
  });
  });

  it('should add the product to the cart with the correct details', async () => {
    render(
      <CartProvider>
        <MemoryRouter initialEntries={['/SMG-S24U']}>
          <Routes>
            <Route path="/:id" element={<ProductDetailsView />} />
            <Route path="/cart" element={<CartView />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );
  
    // Espera a que se cargue el producto y las opciones de almacenamiento
    await waitFor(() => screen.getByTestId('256 GB')); // Esperamos a que el botón de almacenamiento esté disponible
  
    // Seleccionamos una opción de almacenamiento y simulamos el clic
    const storageOption2 = screen.getByTestId('256 GB');
    fireEvent.click(storageOption2);
  
    // Simula el clic en añadir al carrito
    const addToCartButton = screen.getByTestId('add-cart');
    fireEvent.click(addToCartButton);
  
    // Espera que la redirección haya ocurrido y que se haya renderizado el CartView
    await waitFor(() => screen.getByTestId('cart-view')); 
  
    // Verifica que el producto fue añadido al carrito
    const cart = screen.getByTestId('cart-view'); // Verifica que el carrito está en el DOM
  
    expect(cart).toBeInTheDocument(); 
  
   
    const cartItems = cart.querySelectorAll('.cart-item'); // Asegúrate de que este selector es correcto
    expect(cartItems).toHaveLength(1); // Verifica que hay un artículo en el carrito
  
    const addedProduct = cartItems[0]; 
    
    expect(addedProduct).toHaveTextContent('Galaxy S24 Ultra256 GB | Titanium Violet1229 EUR'); 
  }); 
});
