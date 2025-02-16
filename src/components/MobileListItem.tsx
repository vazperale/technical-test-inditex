import { useNavigate } from "react-router-dom";
import { mobileProduct } from "../types/mobileProduct";

{/* En el slider, al arrastrar si se deja el raton encima de un producto, hará un falso click.
    añadida una prop a mayores que puede desactivar o activar el click dependiendo del ambito donde se vaya implementar el elemento <MobileListItem>
    En este caso, en el home se deja con el click activado, y en el slider de similar items, quedará inactivo.
    Hay diversas formas,aunque complejas para evitar los falsos clicks al arrastrar, por lo que en esta prueba, optaré por esta opción, y si se quiere probar que realmente al hacer click
    en el elemento lleva al correspondiente, con cambiar la prop en el archivo ProductDetailsView linea 221 poner disabledClick={false} será suficiente.         
 */}

export default function MobileListItem({ mobileProduct, disabledClick }: { mobileProduct: mobileProduct, disabledClick: boolean }) {
  const navigate = useNavigate();

  return (
    <>
      <div data-testid='product-item' onClick={() => {
        if (!disabledClick) {
          navigate(`/${mobileProduct.id}`)
        }
      }} className="border border-dark p-3 cardItemList hover-effect d-flex flex-column justify-content-between align-items-center" >
        <div className="image-container">
          <img src={mobileProduct.imageUrl} alt={mobileProduct.name} />
        </div>
        <div className="infoCard d-flex justify-content-between w-100 ">
          <div className="d-flex flex-column justify-content-end ">
            <span className="brandName">{mobileProduct.brand}</span>
            <span className="">{mobileProduct.name}</span>
          </div>
          <div className="d-flex align-items-end">
            <span className="">{mobileProduct.basePrice} EUR</span>
          </div>
        </div>
      </div>
    </>
  );
}
