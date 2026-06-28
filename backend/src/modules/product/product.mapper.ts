import { Product } from "@prisma/client";

export const toProductResponse = (product: Product) => {
  return {
    id: product.id,
    productName: product.productName,
    productDescription: product.productDescription,
    productImageUrls: product.productImageUrls,
    price: product.price,
    stock: product.stock,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};

export const toProductResponsList = (products: Product[]) => {
  return products.map(toProductResponse);
};
