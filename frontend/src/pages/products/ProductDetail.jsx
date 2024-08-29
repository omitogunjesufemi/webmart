import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/cart";
import { useContext} from 'react';

export default function ProductDetail() {
  const {id} = useParams();
  const [productData, setProductData] = useState({});
  const { addToCart } = useContext(CartContext)

  useEffect(() => {
    const fetchProduct = async (id) => {
        const apiUrl = `http://localhost:5000/api/v1/products/${id}`;
        try {
            const data = await fetch(apiUrl);
            const product = await data.json();
            setProductData(product);
        } catch (err) {
            console.error(err);
        }
    }
    fetchProduct(id);
  }, [id]);  

  console.log(productData);

  const { images = [], name, price, rating = 0, description, reviews = [] } = productData;
  const imageUrl = Array.isArray(images) && images.length > 0 ? images[0] : images;

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-yellow-300' : 'text-gray-300'}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
        </svg>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderReviews = () => {
    if (!reviews) return null;

    return reviews.map((review, index) => (
      <div key={index} className="mb-4">
        <p><strong>{review.reviewerName} ({review.rating})</strong> {formatDate(review.date)}</p>
        <p>{review.comment}</p>
      </div>
    ));
  };


  return (
    <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img className="w-full dark:hidden" src={imageUrl} alt="" />
            <img className="w-full hidden dark:block" src={imageUrl} alt="" />
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1
                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
            >
                {name}
            </h1>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p
                className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white"
                >
                $ {price}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1">
                    {renderStars()}
                </div>
                <p
                    className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                >
                    {rating}
                </p>
                    <b>{reviews.length} Reviews</b>
                </div>
            </div>

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                role="button"
                >
                <svg
                    className="w-5 h-5 -ms-2 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                </svg>
                Add to favorites
                </a>

                <button onClick={() => addToCart(productData)} type="button" className="inline-flex items-center rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Add to cart
                </button>
            </div>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

            <p className="mb-6 text-gray-500 dark:text-gray-400">
                {description}
            </p>

            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />
            <p className="text-gray-500 dark:text-gray-400">
                <h4 className="text-m font-semibold text-gray-900 sm:text-l dark:text-white">
                    Reviews
                </h4>
                {renderReviews()}
            </p>
            </div>
        </div>
        </div>
    </section>
  )
}
