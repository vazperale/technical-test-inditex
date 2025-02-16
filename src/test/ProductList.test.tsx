import 'matchmedia-polyfill';
import 'matchmedia-polyfill/matchMedia.addListener';
import '@testing-library/jest-dom'; // Asegúrate de importar esto
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProductListView from '../views/ProductListView'; // Ruta de tu componente
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from '../context/cartContext'; // Importa tu CartProvider
import { getMobiles } from '../api/mobileStoreApi';
import ProductDetailsView from '../views/ProductDetailsView';

describe('ProductListView', () => {

     it('should return 23 products from the API', async () => {
        // Realizamos la llamada real a la API
        const products = await getMobiles();

        // Asegúrate de que la cantidad de productos devueltos sea (serían 24 pero se elimina el duplicado comentado en otros archivos)
        expect(products).toHaveLength(23);

        // Renderiza el componente con un MemoryRouter que simula la URL
        render(
            <CartProvider>
                <MemoryRouter>
                    <ProductListView />
                </MemoryRouter>
            </CartProvider>
        );

        // Espera a que los productos se carguen y aparezcan en el DOM
        await waitFor(() => {
            // Verifica si el número de productos renderizados en el DOM coincide con el esperado (20 productos) debido a la paginacion
            const productItems = screen.getAllByTestId('product-item'); // Suponiendo que cada producto tiene un testId de 'product-item'
            expect(productItems.length).toBe(20);
        });
    });

    it('should return 6 products when introduce in the search input "sa" ', async () => {

        render(
            <CartProvider>
                <MemoryRouter>
                    <ProductListView />
                </MemoryRouter>
            </CartProvider>
        );

        const inputElement = screen.getByTestId('search-bar');

        // Simula que el usuario escribe "sa" en el input de búsqueda
        fireEvent.change(inputElement, { target: { value: 'sa' } });

        // Espera a que los productos se carguen después de la búsqueda
        await waitFor(async () => {
            // Realiza la llamada real a la API y verifica que el número de productos sea el esperado
            const products = await getMobiles({ search: 'sa' });
            expect(products).toHaveLength(6); // Asegúrate de que la cantidad de productos devueltos sea 6
        });

        // Verifica si el número de productos renderizados en el DOM coincide con el esperado (6 productos)
        await waitFor(() => {
            const productItems = screen.getAllByTestId('product-item'); // Suponiendo que cada producto tiene un testId de 'product-item'
            expect(productItems.length).toBe(6); // Verifica que se rendericen 6 productos
        });
    });


    it('should go to the next page pagination when you click in the appropiate button ', async () => {

        render(
            <CartProvider>
                <MemoryRouter>
                    <ProductListView />
                </MemoryRouter>
            </CartProvider>
        );

        const nextPageElement = await screen.findByTestId('next-page');
        expect(nextPageElement).toBeInTheDocument();
        const offset = 21;//contando el tema del duplicado, es 21 en vez de 20

        // Simula que el usuario hace click en el boton de siguiente pagina
        fireEvent.click(nextPageElement);

        // Espera a que los productos se carguen después de la búsqueda
        await waitFor(async () => {
            // Realiza la llamada real a la API y verifica que el número de productos sea el esperado
            const products = await getMobiles({ offset: offset });
            expect(products).toHaveLength(3); // Asegúrate de que la cantidad de productos devueltos sea 3
        });

        // Verifica si el número de productos renderizados en el DOM coincide con el esperado (3 productos)
        await waitFor(() => {
            const productItems = screen.getAllByTestId('product-item'); // Suponiendo que cada producto tiene un testId de 'product-item'
            expect(productItems.length).toBe(3); // Verifica que se rendericen 3 productos
        });
    });


    it('should go to the details page when you click in a item product ', async () => {

        render(
      <CartProvider>
        <MemoryRouter initialEntries={['/SMG-S24U']}>
          <Routes>
            <Route path="/" element={<ProductListView />} />
            <Route path="/:id" element={<ProductDetailsView />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    );

        const itemsProducts = await screen.findAllByTestId('product-item');
        expect(itemsProducts.length).toBeGreaterThan(0); // Asegúrate de que hay productos
        


        // Simula que el usuario hace click en un producto para ir a los detalles
        fireEvent.click(itemsProducts[0]);

       // Espera que la redirección haya ocurrido y que se haya renderizado el details view
    await waitFor(() => screen.getByTestId('details-view')); 
  
    // Verifica que se ha ido a la pagina de detalles
    const details = screen.getByTestId('details-view'); 
  
    expect(details).toBeInTheDocument(); 
  //se espera ver algun boton para tema de storage y de colores, para confirmar que cargo datos correctamente
    const phoneDetailsColor = screen.getByTestId('Titanium Black'); 
    const phoneDetailsStorage = screen.getByTestId('256 GB'); 
    expect(phoneDetailsColor).toBeInTheDocument();
    expect(phoneDetailsStorage).toBeInTheDocument();

}); 

}); 