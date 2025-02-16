export type mobileProductDetails = {
    id: string;
    brand: string;
    name: string;
    description: string;
    basePrice: number;
    rating: number;
    specs: Specs;
    colorOptions: ColorOption[];
    storageOptions: StorageOption[];
    similarProducts: SimilarProduct[];
}

// Definición de las interfaces para cada parte del producto

export type ColorOption = {
    name: string;
    hexCode: string;
    imageUrl: string;
}

export type StorageOption = {
    capacity: string;
    price: number;
}

type SimilarProduct = {
    id: string;
    brand: string;
    name: string;
    basePrice: number;
    imageUrl: string;
}

type Specs = {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
}

export type  itemCart = {
   id:string
   name:string
   color:ColorOption
   price:number
   storage:string
   quantity:number
  };
