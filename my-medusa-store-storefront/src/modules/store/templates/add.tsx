import React, { useEffect, useState } from 'react';
import { Text, clx } from "@medusajs/ui";
import { getCategoriesList, getCollectionsList } from "@lib/data";
import LocalizedClientLink from "@modules/common/components/localized-client-link";

const AddComponent = () => {
    const [productCategories, setProductCategories] = useState([]);
    const [collections, setCollections] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const categoriesResponse = await getCategoriesList(0, 600);
            const collectionsResponse = await getCollectionsList(0, 600);
            setProductCategories(categoriesResponse.product_categories);
            setCollections(collectionsResponse.collections);
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col gap-10 md:flex-row md:gap-x-16 w-full">
            {productCategories.length > 0 && (
                <div className="flex flex-col gap-y-2 w-full">
                    <span className="text-base font-semibold text-ui-fg-base mb-4">
                        Categories
                    </span>
                    <ul className="grid grid-cols-1 gap-2" data-testid="footer-categories">
                        {productCategories.slice(0, 600).map((c) => {
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
                                <li className="flex flex-col gap-2 text-ui-fg-subtle text-base" key={c.id}>
                                    <LocalizedClientLink
                                        className={clx(
                                            "hover:text-ui-fg-base",
                                            children && "font-semibold"
                                        )}
                                        href={`/categories/${c.handle}`}
                                        data-testid="category-link"
                                    >
                                        {c.name}
                                    </LocalizedClientLink>
                                    {children && (
                                        <ul className="ml-3 grid gap-2">
                                            {children.map((child) => (
                                                <li key={child.id}>
                                                    <LocalizedClientLink
                                                        className="hover:text-ui-fg-base"
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
                </div>
            )}
            {collections.length > 0 && (
                <div className="flex flex-col gap-y-2 w-full">
                    <span className="text-base font-semibold text-ui-fg-base mb-4">
                        Collections
                    </span>
                    <ul className="grid grid-cols-1 gap-2 text-ui-fg-subtle text-base">
                        {collections.slice(0, 600).map((c) => (
                            <li key={c.id}>
                                <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/collections/${c.handle}`}
                                >
                                    {c.title}
                                </LocalizedClientLink>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AddComponent;
