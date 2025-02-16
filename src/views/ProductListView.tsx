import LogoWeb from '../assets/LogoMobileStore.png';
import { getMobiles } from '../api/mobileStoreApi';
import { useEffect, useState } from 'react';
import { mobileProduct } from '../types/mobileProduct';
import { useNavigate } from 'react-router-dom';
import MobileListItem from '../components/MobileListItem';
import { useCart } from '../context/cartContext';

export default function ProductListView() {
  const navigate = useNavigate();
  const { cart } = useCart(); // Usamos el contexto del carrito
  const [loading, setLoading] = useState<boolean>(true);
  const [Filteredproducts, setFilteredProducts] = useState<mobileProduct[]>([]);// productos totales,tanto los iniciales, como cuando se filtra por busqueda
  const [totalProducts, setTotalProducts] = useState<mobileProduct[]>([]);//productos totales de la api para calcular el state que esta debajo para la paginacion correcta en todas las situaciones
  const [totalFilteredProducts, setTotalFilteredProducts] = useState<number>(0); //numero productos totales si se ha usado el filtro de busqueda,usado para la paginacion
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const resultsPerPage = 21;// 21 en vez de 20 debido al problema de duplicados comentado en el archivo mobileStoreApi.ts

  const clearSearch = () => {
    setSearchTerm('');
    setCurrentPage(1);
    fetchProducts(1);
  };

  

  const fetchProducts = async (page: number, search?: string) => {
    try {
      setLoading(true);
      const offset = (page - 1) * resultsPerPage; // Calcula el desplazamiento
  
      if (search) {
        // Si hay búsqueda, actualiza los productos filtrados
        const dataFiltered = await getMobiles({ limit: resultsPerPage, offset, search });
        if (dataFiltered) {
          setFilteredProducts(dataFiltered); // Actualiza los productos visibles
          setTotalFilteredProducts(dataFiltered.length); // Total filtrado devuelto por la API
        }
      } else {
        // Si no hay búsqueda, carga todos los productos
        const data = await getMobiles();
        if (data) {
          setTotalProducts(data); // Asigna los productos totales
        }
  
        const dataPage = await getMobiles({ limit: resultsPerPage, offset });
        if (dataPage) {
          setFilteredProducts(dataPage); // Asigna productos paginados
        }
      }
      setCurrentPage(page); // Actualiza la página actual
    } catch (error) {
      console.log('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(searchTerm ? totalFilteredProducts / resultsPerPage : totalProducts.length / resultsPerPage);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setCurrentPage(1); // Reinicia a la primera página para nuevos resultados
    await fetchProducts(1, value); // Solicita productos con el término de búsqueda
  };

  const handlePageChange = async (newPage: number) => {
    await fetchProducts(newPage, searchTerm); // Solicita la página correspondiente con el término de búsqueda actual
  };

  useEffect(() => {
    fetchProducts(1); // Carga inicial de productos
  }, []);


  return (
    <>
    <div data-testid='home-view'>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <img
          className="clickable-button"
          src={LogoWeb}
          alt="Logo"
          onClick={() => {
            navigate('/');
          }}
        />
        <span
          className="d-flex justify-content-between align-items-center clickable-button"
          onClick={() => {
            navigate('/cart');
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M14.4706 4H9.76471V7.76471H6V20H18.2353V7.76471H14.4706V4ZM13.5294 7.76471V11.0588H14.4706V7.76471H13.5294ZM10.7059 7.76471V11.0588H9.76471V7.76471H10.7059ZM10.7059 7.76471H13.5294V4.94118H10.7059V7.76471Z"
              fill="black"
            />
          </svg>
          <span>{cart.length}</span>
        </span>
      </div>

      <div className="input-container mb-4 w-100 d-flex flex-column gap-2 px-1">
        <input
          type="text"
          data-testid='search-bar'
          className="search-input mb-2"
          placeholder="Search for a smartphone..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <span>{Filteredproducts.length} Results</span>
        {searchTerm && (
          <span className="clear-icon" onClick={clearSearch}>
            &times;
          </span>
        )}
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <>
          <div className="d-flex flex-wrap justify-content-center align-items-start">
            {Filteredproducts.length > 0 ? (
              Filteredproducts.map((product) => (
                <MobileListItem key={`${product.id}`} mobileProduct={product} />
              ))
            ) : (
              <p>No results.</p>
            )}
          </div>

          {/* Controles de paginación */}
          {totalPages > 1 && (
            <div className="pagination-container d-flex justify-content-center mt-4 mb-4 gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &lt;
              </button>
              <button
                data-testid='next-page'
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
        </div>
    </>
  );
}
