import { useEffect, useState } from 'react';
import LogoWeb from '../assets/LogoMobileStore.png';  // Ruta relativa desde el archivo actual
import { useNavigate, useParams } from 'react-router-dom';
import { ColorOption, mobileProductDetails, StorageOption, itemCart } from '../types/mobileProductDetails';
import { getMobile } from '../api/mobileStoreApi';
import { Button } from 'react-bootstrap';
import MobileListItem from '../components/MobileListItem';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Slider from 'react-slick';
import { useCart } from '../context/cartContext';


export default function ProductDetailsView() {

  const settings = {
    dots: false, // No mostrar los puntos
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 3, // Mostrar 3 productos a la vez
    slidesToScroll: 1, // Desplazar 1 producto a la vez
    draggable: true, // Permitir arrastrar con el ratón
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Mostrar 2 productos en pantallas medianas
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, // Mostrar 1 producto en pantallas pequeñas
          slidesToScroll: 1,
        },
      },
    ],
  };


  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<mobileProductDetails>(); // Estado para almacenar los productos
  const [selectedColor, setSelectedColor] = useState<ColorOption>();
  const [selectedStorage, setSelectedStorage] = useState<StorageOption>();
  const [hoveredColor, setHoveredColor] = useState<string | null>(null); // Para el hover dinámico
  const { cart,addToCart } = useCart(); // Usamos el contexto del carrito


  function addProductToCart() {
    if (product && selectedColor && selectedStorage) {
      const cartItem = {
        id: product.id,
        name: product.name,
        color: selectedColor,
        storage: selectedStorage.capacity,
        price: selectedStorage.price,
        quantity: 1
      };


      const existingProductIndex = cart.findIndex(
        (item: itemCart) =>
          item.id === cartItem.id && item.color.name === cartItem.color.name && item.storage === cartItem.storage
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      }else{
        addToCart(cartItem);
      }
      navigate('/cart');
    }
  }

  const GetProductMobileDetails = async (id: string) => {
    try {
      const data = await getMobile(id);
      setSelectedColor(data?.colorOptions[0]);
      if (data) setProduct(data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    if (id) GetProductMobileDetails(id);
  }, [id]);

  return (
    <>
      <div data-testid='details-view'>
        <div className="d-flex justify-content-between align-items-center mb-2 px-3">
          <img
            className="clickable-button"
            src={LogoWeb}
            alt="Logo"
            onClick={() => navigate('/')}
            style={{ maxWidth: '150px' }}
          />
          <span className="d-flex justify-content-between align-items-center clickable-button" onClick={() => navigate('/cart')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.4706 4H9.76471V7.76471H6V20H18.2353V7.76471H14.4706V4ZM13.5294 7.76471V11.0588H14.4706V7.76471H13.5294ZM10.7059 7.76471V11.0588H9.76471V7.76471H10.7059ZM10.7059 7.76471H13.5294V4.94118H10.7059V7.76471Z" fill="black" />
            </svg>
            <span>{cart.length}</span>
          </span>
        </div>
        <span className='backLink' onClick={() => navigate('/')}> &lt; BACK </span>

        <div className='phoneDetails d-flex flex-column flex-md-row justify-content-between mb-4'data-testid='phone-details'>
          <img
            src={selectedColor?.imageUrl}
            className="img-fluid"
            data-testid='image-details'
            alt={product?.name}
          />
          <div className='specifications d-flex flex-column justify-content-evenly p-3 gap-3'>
            <div className='d-flex flex-column'>
              <h4>{product?.name}</h4>
              <h5 data-testid='div-price-details'
              >{selectedStorage ? `From ${selectedStorage.price} EUR` : null}</h5>
            </div>
            <div className='d-flex flex-column'>
              <span>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</span>
              <div className='d-flex mt-2'>
                {product?.storageOptions.map((option) => (
                  <button
                    key={option.capacity}
                    data-testid={option.capacity}
                    className={`rounded-0 storage-btn ${selectedStorage === option ? "active" : ""}`}
                    onClick={() => setSelectedStorage(option)}
                  >
                    {option.capacity}
                  </button>
                ))}
              </div>
            </div>
            <div className='d-flex flex-column'>
              <span>COLOR, PICK YOUR FAVOURITE</span>
              <div className='d-flex gap-3 mt-1'>
                {product?.colorOptions.map((option) => (
                  <div
                    key={option.name}
                    data-testid={option.name}
                    className={`color-box  ${selectedColor?.name === option.name ? "selected" : ""}`}
                    style={{ backgroundColor: option.hexCode }}
                    onClick={() => {
                      setSelectedColor(option);
                      if (!selectedStorage) {
                        setSelectedStorage(product.storageOptions[0]);
                      }
                    }}
                    onMouseEnter={() => setHoveredColor(option.name)}
                    onMouseLeave={() => setHoveredColor(null)}
                  ></div>
                ))}
              </div>
              <span>{hoveredColor || selectedColor?.name}</span>
            </div>
            <Button
              className='rounded-0'
              data-testid="add-cart"
              disabled={!selectedStorage}
              onClick={addProductToCart}
              variant="dark"
            >
              Añadir
            </Button>
          </div>
        </div>

        <div className="specifications-container" data-testid='specifications-details'>
          <h2 className="specifications-title">SPECIFICATIONS</h2>
          <table className="specifications-table">
            <tbody>
              <tr>
                <td className="spec-label">BRAND</td>
                <td className="spec-value">{product?.brand}</td>
              </tr>
              <tr>
                <td className="spec-label">NAME</td>
                <td className="spec-value">{product?.name}</td>
              </tr>
              <tr>
                <td className="spec-label">DESCRIPTION</td>
                <td className="spec-value">{product?.description}</td>
              </tr>
              {Object.entries(product?.specs ?? {}).map(([label, value], index) => (
                <tr key={index}>
                  <td className="spec-label">{label.toUpperCase()}</td>
                  <td className="spec-value">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='ms-4'>
        <div className='similarItems' data-testid='similar-items'>
      <h2 className="similar-items-title">SIMILAR ITEMS</h2>
      <Slider {...settings}>
        {product?.similarProducts.map((similarProduct) => (
          <div key={similarProduct.id}>
            <MobileListItem mobileProduct={similarProduct} />
          </div>
        ))}
      </Slider>
    </div>
        </div>
      </div>
    </>
  );
}
