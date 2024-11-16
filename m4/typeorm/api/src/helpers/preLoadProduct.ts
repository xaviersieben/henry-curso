import Product from "../entities/product";
import { ProductRepository, AppDataSource } from "../config/data-source";

interface IProduct {
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
  stock: number;
}

const productsToPreLoad: IProduct[] = [
  {
    name: "iPhone 11",
    description: "Experience power and elegance with the iPhone 11...",
    price: 699,
    stock: 10,
    image:
      "https://i5.walmartimages.com.mx/mg/gm/1p/images/product-images/img_large/00750622733527l.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
    categoryId: 1, // Correct categoryId
  },
  {
    name: "MacBook Air",
    description:
      "Embrace efficiency and sophistication with the MacBook Air...",
    price: 999,
    stock: 10,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mba13-midnight-select-202402?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1708367688034",
    categoryId: 2, // Correct categoryId
  },
  {
    name: "iPad Pro",
    description:
      "Unleash your creativity and productivity with the iPad Pro...",
    price: 799,
    stock: 2,
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/ipad-pro-finish-select-202212-11inch-space-gray-wifi_FMT_WHH?wid=1280&hei=720&fmt=p-jpg&qlt=95&.v=1670865949101",
    categoryId: 3, // Correct categoryId
  },
  {
    name: "Apple Watch Series 6",
    description: "Stay connected and healthy with the Apple Watch Series 6...",
    price: 399,
    stock: 10,
    image:
      "https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020_big.jpg.large.jpg",
    categoryId: 4, // Correct categoryId
  },
  {
    name: "AirPods Pro",
    description: "Immerse yourself in sound with the AirPods Pro...",
    price: 249,
    stock: 10,
    image:
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MTJV3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1694014871985",
    categoryId: 5, // Correct categoryId
  },
  {
    name: "HomePod mini",
    description: "Elevate your home audio experience with the HomePod mini...",
    price: 99,
    stock: 10,
    image:
      "https://photos5.appleinsider.com/gallery/38975-74543-HomePod-mini-Space-Gray-l.jpg",
    categoryId: 6, // Correct categoryId
  },
];

export const preLoadProducts = async () => {
  const products = await ProductRepository.find();
  if (!products.length) {
    bulkInsertProduct();
    console.log("Products preloaded");
  }
};

const bulkInsertProduct = async () => {
  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Product)
    .values(productsToPreLoad)
    .execute();
};
