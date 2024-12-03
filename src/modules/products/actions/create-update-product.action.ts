import { tesloApi } from '@/api/tesloApi';
import type { Product } from '../interfaces/product.interface';

export const createUpdateProductAction = async (product: Partial<Product>) => {
  const productId = product.id;

  product = cleanProductForCreateUpdate(product);

  if (productId && productId !== '') {
    return await updateProduct(productId, product);
  }

  return await createProduct(product);
};

const cleanProductForCreateUpdate = (product: Partial<Product>) => {
  const images: string[] =
    product.images?.map((image) => {
      if (image.startsWith('http')) {
        const imageName = image.split('/').pop();
        return imageName ? image : '';
      }

      return image;
    }) ?? [];

  delete product.id;
  delete product.user;
  product.images = images;

  return product;
};

const updateProduct = async (productId: string, product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.patch<Product>(`/products/${productId}`, product);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error update product');
  }
};

const createProduct = async (product: Partial<Product>) => {
  try {
    const { data } = await tesloApi.post<Product>(`/products`, product);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error create product');
  }
};

const uploadImages = async (images: (string | File)[]) => {
  const imageFile = images[0] as File;

  try {
    const formData = new FormData();
    formData.append('file', imageFile);

    const { data } = await tesloApi.post<{ secureUrl: string }>('files/product', formData);

    return data.secureUrl;
  } catch (error) {
    console.error(error);
    throw new Error('Error uploading image');
  }
};
