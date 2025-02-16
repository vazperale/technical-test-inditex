import { useNavigate } from "react-router-dom";
import { mobileProduct } from "../types/mobileProduct";

// Ahora esperamos recibir un objeto "props" con la propiedad "mobileProduct"
export default function MobileListItem({ mobileProduct }: { mobileProduct: mobileProduct }) {
    const navigate = useNavigate();

  return (
    <>
      <div  data-testid='product-item' onClick={()=>{
        navigate(`/${mobileProduct.id}`)
      }} className="border border-dark p-3 cardItemList hover-effect d-flex flex-column justify-content-between align-items-center" >
        <div className="image-container">
        <img src={mobileProduct.imageUrl}  alt={mobileProduct.name} />
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
