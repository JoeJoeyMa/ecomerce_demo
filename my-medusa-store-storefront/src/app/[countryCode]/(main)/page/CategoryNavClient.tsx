'use client';

import { useState, useEffect, MouseEvent } from 'react';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

interface Category {
    id: string;
    name: string;
    handle: string;
    parent_category_id: string | null;
    category_children?: Category[];
}

interface CategoryNavClientProps {
    categories: Category[];
}

const CategoryNavItem = ({ category, isMobile, navigateToSubmenu }: { category: Category, isMobile: boolean, navigateToSubmenu: (category: Category) => void }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: MouseEvent) => {
        if (isMobile && category.category_children && category.category_children.length > 0) {
            e.preventDefault();
            navigateToSubmenu(category);
        }
    };

    return (
        <li
            className="relative group"
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
        >
            <LocalizedClientLink
                className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                href={`/categories/${category.handle}`}
                onClick={handleClick}
            >
                <span>{category.name}</span>
                {category.category_children && category.category_children.length > 0 && !isMobile && (
                    <svg
                        className={`w-4 h-4 ml-2 transform transition ${isOpen ? 'rotate-90' : ''}`}
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
            {category.category_children && category.category_children.length > 0 && !isMobile && (
                <ul
                    className={`absolute top-0 left-full mt-0 w-64 bg-white shadow-lg border rounded-lg p-4 space-y-2 transition-all duration-200 transform ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                    {category.category_children.map((child) => (
                        <CategoryNavItem key={child.id} category={child} isMobile={isMobile} navigateToSubmenu={navigateToSubmenu} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const Submenu = ({ category, navigateBack }: { category: Category, navigateBack: () => void }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-white p-4 z-50 overflow-y-auto">
            <button onClick={navigateBack} className="mb-4 text-gray-500">Back</button>
            <ul className="space-y-2">
                {category.category_children?.map((child) => (
                    <li key={child.id}>
                        <LocalizedClientLink href={`/categories/${child.handle}`} className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition">
                            <span>{child.name}</span>
                        </LocalizedClientLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default function CategoryNavClient({ categories }: CategoryNavClientProps) {
    const organizeCategories = (categories: Category[]) => {
        const categoryMap: { [key: string]: Category } = {};
        const rootCategories: Category[] = [];

        categories.forEach((category) => {
            categoryMap[category.id] = { ...category, category_children: category.category_children || [] };
        });

        categories.forEach((category) => {
            if (category.parent_category_id) {
                categoryMap[category.parent_category_id].category_children?.push(categoryMap[category.id]);
            } else {
                rootCategories.push(categoryMap[category.id]);
            }
        });

        return rootCategories;
    };

    const organizedCategories = organizeCategories(categories);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navigateToSubmenu = (category: Category) => {
        setCurrentCategory(category);
    };

    const navigateBack = () => {
        setCurrentCategory(null);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex space-x-4">
                        <div
                            className="sm:-my-px sm:flex relative"
                            onMouseEnter={() => !isMobile && setIsMenuOpen(true)}
                            onMouseLeave={() => !isMobile && setIsMenuOpen(false)}
                        >
                            <button
                                className="group rounded-full text-center border-2 transition-colors relative outline-none font-heading bg-green-500 border-green-500 text-white hover:md:bg-white hover:md:text-green-500 disabled:bg-green-150 disabled:border-green-150 disabled:hover:md:bg-green-150 disabled:hover:md:border-green-150 disabled:hover:md:text-white inline-block uppercase tracking-wide text-sm font-black px-5 py-4"
                                aria-label="Categories"
                                onClick={() => isMobile && setIsMenuOpen(!isMenuOpen)}
                            >
                                <span className="flex justify-center items-center space-x-2.5">
                                    <span className="inline-flex space-x-1 items-center">
                                        <span>Categories</span>
                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 18 18"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="relative transition-transform rotate-180 group-data-[state=open]:!rotate-0 duration-300"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d="M12.7498 10.0576L9.53228 6.87761C9.46256 6.80731 9.37961 6.75152 9.28821 6.71344C9.19682 6.67537 9.09879 6.65576 8.99978 6.65576C8.90077 6.65576 8.80274 6.67537 8.71135 6.71344C8.61995 6.75152 8.537 6.80731 8.46728 6.87761L5.28728 10.0576C5.21698 10.1273 5.16119 10.2103 5.12311 10.3017C5.08503 10.3931 5.06543 10.4911 5.06543 10.5901C5.06543 10.6891 5.08503 10.7871 5.12311 10.8785C5.16119 10.9699 5.21698 11.0529 5.28728 11.1226C5.4278 11.2623 5.61789 11.3407 5.81603 11.3407C6.01417 11.3407 6.20426 11.2623 6.34478 11.1226L8.99978 8.46761L11.6548 11.1226C11.7945 11.2612 11.983 11.3393 12.1798 11.3401C12.2785 11.3407 12.3763 11.3218 12.4677 11.2844C12.5591 11.2471 12.6422 11.1921 12.7123 11.1226C12.7851 11.0554 12.8439 10.9744 12.8852 10.8844C12.9265 10.7943 12.9496 10.697 12.9531 10.5979C12.9566 10.4989 12.9404 10.4002 12.9055 10.3074C12.8706 10.2147 12.8177 10.1298 12.7498 10.0576Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </span>
                                </span>
                            </button>
                            {isMobile ? (
                                <div
                                    className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg border transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
                                >
                                    <button onClick={() => setIsMenuOpen(false)} className="m-4 text-gray-500">Close</button>
                                    {currentCategory ? (
                                        <Submenu category={currentCategory} navigateBack={navigateBack} />
                                    ) : (
                                        <ul className="p-4 space-y-2">
                                            {organizedCategories.map((category) => (
                                                <CategoryNavItem key={category.id} category={category} isMobile={isMobile} navigateToSubmenu={navigateToSubmenu} />
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ) : (
                                isMenuOpen && (
                                    <ul className="absolute top-full left-0 w-64 bg-white shadow-lg border rounded-lg p-4 space-y-2 z-50">
                                        {organizedCategories.map((category) => (
                                            <CategoryNavItem key={category.id} category={category} isMobile={isMobile} navigateToSubmenu={navigateToSubmenu} />
                                        ))}
                                    </ul>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
