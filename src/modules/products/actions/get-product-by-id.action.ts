import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';
import { getProductImage } from './get-product-image';

export const getProductById = async (productId: string) => {
  try {
    const { data } = await tesloApi.get<Product>(`/products/${productId}`);

    console.log({ data });

    return {
      ...data,
      images: data.images.map(getProductImage),
    };
  } catch (error) {
    console.log(error);

    throw new Error('Error al obtener producto ' + productId);
  }
};
