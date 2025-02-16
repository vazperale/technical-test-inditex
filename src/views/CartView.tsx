import { Button } from 'react-bootstrap';
import LogoWeb from '../assets/LogoMobileStore.png'; 
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../context/cartContext';


export default function CartView() {
  const { cart, removeFromCart, getTotal } = useCart(); // Extrae las funciones y el carrito del contexto
  const navigate = useNavigate();

  // El carrito ahora se obtiene del contexto, así que no necesitamos cargarlo desde localStorage
  useEffect(() => {
    // No es necesario cargar el carrito aquí, porque lo tenemos desde el contexto
  }, []);

  return (
    <>
    <div data-testid="cart-view">
      <div className="d-flex justify-content-between align-items-center border-bottom border-dark border-1">
        <img
          className="clickable-button"
          src={LogoWeb}
          alt="Logo"
          onClick={() => {
            navigate('/');
          }}
        />
      </div>
        
      <h2 data-testid='text-cart-items' className='m-4'>Cart({cart.length})</h2>
      <div className='cart-items-container d-flex flex-column justify-content-evenly ms-2'>
        {cart.map((item) => (
          <div data-testid='cart-product-item' key={item.id} className="cart-item d-flex gap-4">
            <div className='photo-cart-items'>
              <img src={item.color.imageUrl} alt={item.name} />
            </div>
            <div className='d-flex flex-column justify-content-evenly'>
              <div className='d-flex flex-column'>
                <span>{item.name}</span>
                <span>{item.storage} | {item.color.name}</span>
                <span className='mt-4'>{item.price} EUR</span>
                <span className='mt-4'>{item.quantity} Item(s)</span>
              </div>

              <span
              data-testid='remove-product'
                className='delete-button-cart text-danger cursor-pointer'
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="total-continue-shopping desktop d-flex justify-content-between d-none d-sm-flex bg-white">
        <Button
          data-testid='continue-shopping-desktop'
          className='p-4 rounded-0 continue-shopping-button'
          onClick={() => navigate('/')}
          variant="outline-dark"
        >
          Continue shopping
        </Button>
        {cart.length > 0 && (
          <div className='d-flex align-items-center gap-3 '>
            <span className='fs-6 gap-2'>Total</span>
            <span className='fs-6'>{getTotal()} EU</span>
            <Button
              className='rounded-0 p-4 pay-button'
              disabled
              variant="dark"
              onClick={() => navigate('/checkout')}
            >
              PAY
            </Button>
          </div>
        )}
      </div>

      <div className="total-continue-shopping mobile d-flex flex-column justify-content-between  bg-white d-sm-none m-2">
        {cart.length > 0 && (
          <div className='d-flex justify-content-between mb-4'>
            <span className='fs-6 gap-2'>TOTAL</span>
            <span className='fs-6'>{getTotal()} EU</span>
          </div>
        )}
        <div className='d-flex justify-content-between'>
          <Button
            data-testid='continue-shopping-mobile'
            className='p-3 rounded-0 continue-shopping-button'
            onClick={() => navigate('/')}
            variant="outline-dark"
          >
            Continue shopping
          </Button>
          {cart.length > 0 && (
            <Button
              className='rounded-0 p-3 pay-button'
              disabled
              variant="dark"
              onClick={() => navigate('/checkout')}
            >
              PAY
            </Button>
          )}
        </div>
      </div>
      </div>
    </>
  );
}
