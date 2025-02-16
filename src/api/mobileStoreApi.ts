import api from '../config/axios';
import { mobileProduct } from '../types/mobileProduct';
import { mobileProductDetails } from '../types/mobileProductDetails';



export type getMobilesType = {
  search?: string,
  limit?: number,
  offset?: number
}

export async function getMobiles(getMobilesParams?: getMobilesType) {
  try {
    let url = '/products';
    const params: URLSearchParams = new URLSearchParams();
    if (getMobilesParams?.search) {
      params.append('search', getMobilesParams.search);
    }
    if (getMobilesParams?.limit) {
      params.append('limit', getMobilesParams.limit.toString());
    }
    if (getMobilesParams?.offset) {
      params.append('offset', getMobilesParams.offset.toString());
    }

    // Si hay parámetros, los añadimos a la URL
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const { data } = await api<mobileProduct[]>(url)
    const uniqueData = Array.from(
      new Map(data.map((product) => [product.id, product])).values()
    );

    //Debido a que hay dos productos exactamente iguales y con mismo id, se procede a borrar duplicados, aunque
    //esto provoca que la primera pagina tenga 19 resultados en vez de 20.Para no descentrar la primera vista con 
    //los 20 resultados, aumentaré el limite de pagina a 21, para que se visualice como debería(indicaré en el archivo el cambio)
    //Podía dejar que se visualizaran los duplicados, pero saltaba un log y un requerimiento era que no se visualizaran logs ni errores
    //Habría maneras de resolver esto, intentando añadir un registro mas  para completar las 20, pero es un error que la forma más sencilla
    // sería tener la bbdd bien configurada y que no permita ids duplicados

    return uniqueData
  } catch (error) {
    console.log(error);

  }
}

export async function getMobile(id: string) {
  try {
    const { data } = await api<mobileProductDetails>(`/products/${id}`)
    return data
  } catch (error) {
    console.log(error);

  }
}