// CategorySidebar.jsx

import { getCategoriesList } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

export default async function CategorySidebar() {
    const { product_categories } = await getCategoriesList(0, 600);

    return (
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
            <h2 className="text-xl font-bold mb-4">Filter by Category</h2>
            {product_categories && product_categories.length > 0 && (
                <ul className="space-y-2" data-testid="sidebar-categories">
                    {product_categories.map((c) => {
                        if (c.parent_category) {
                            return null;
                        }

                        const children =
                            c.category_children?.map((child) => ({
                                name: child.name,
                                handle: child.handle,
                                id: child.id,
                            })) || null;

                        return (
                            <li key={c.id} className="group flex justify-between items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                                <LocalizedClientLink
                                    className="flex items-center"
                                    href={`/categories/${c.handle}`}
                                    data-testid="category-link"
                                >
                                    <span>{c.name}</span>
                                    {children && (
                                        <svg
                                            className="w-4 h-4 ml-2 transform group-hover:rotate-90 transition"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            ></path>
                                        </svg>
                                    )}
                                </LocalizedClientLink>
                                {children && (
                                    <ul className="ml-4 mt-2 space-y-2 hidden group-hover:block">
                                        {children.map((child) => (
                                            <li key={child.id}>
                                                <LocalizedClientLink
                                                    className="block px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                                    href={`/categories/${child.handle}`}
                                                    data-testid="category-link"
                                                >
                                                    {child.name}
                                                </LocalizedClientLink>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </aside>
    );
}

export { CategorySidebar };
