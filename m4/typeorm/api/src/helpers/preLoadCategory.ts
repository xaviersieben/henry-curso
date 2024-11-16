import Category from "../entities/Category";
import { CategoryRepository, AppDataSource } from "../config/data-source";

interface ICategory {
  name: string;
}

const categoriesToPreLoad: ICategory[] = [
  { name: "Smartphones" },
  { name: "Laptops" },
  { name: "Tablets" },
  { name: "Headphones" },
  { name: "Cameras" },
  { name: "Printers" },
  { name: "Monitors" },
  { name: "Storage" },
  { name: "Accessories" },
];

export const preLoadCategories = async () => {
  const categoryCount = await CategoryRepository.count();

  if (categoryCount === 0) {
    await bulkInsertCategories();
    console.log("Categories preloaded");
  }
};

const bulkInsertCategories = async () => {
  await AppDataSource.createQueryBuilder()
    .insert()
    .into(Category)
    .values(categoriesToPreLoad)
    .execute();
};
