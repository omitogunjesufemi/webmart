import { useEffect, useState } from "react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = `http://localhost:5000/api/v1/categories`;
      try {
        const data = await fetch(apiUrl);
        const categories = await data.json();
        setCategories(categories);
      } catch (err) {
        console.error(err);
      }
    }

    fetchCategories();
  }, []);
  return (
    <section className="bg-base py-8 antialiased dark:bg-base-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shop by category</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.length > 0 ? (categories.map((category) => (
                <>
                <a href={`/categories/${category.name}`} className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{category.name}</span>
                </a>                
                </>
            ))) : 'NaN'}

       </div>
    </div>
    </section>
  )
}