import { getCategoriesList } from "@lib/data";
import CategoryNavClient from "./page";

export default async function CategoryNav() {
    const { product_categories } = await getCategoriesList(0, 600);

    return <CategoryNavClient categories={product_categories} />;
}
