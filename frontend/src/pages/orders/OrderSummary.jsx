import { useContext } from "react";
import { CartContext } from "../../context/cart";
import { toast, ToastContainer} from 'react-toastify';

export default function OrderSummary() {
  const { cartItems, getCartTotal, clearCart } = useContext(CartContext);
  const billingInfo = localStorage.getItem('billingItems') ? JSON.parse(localStorage.getItem('billingItems')) : [];

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
        await submitOrderAPI();
        toast.success('Order sent!');
        setTimeout(() => {
            clearCart();
            localStorage.removeItem('billingItems');
            localStorage.removeItem('cartItems');
            window.location.href = '/';
        }, 1500);

    } catch (error) {
        toast.error('Error occured when sending order');
        console.error(error);
    }
  }

  const submitOrderAPI = async () => {
    const orderObj = {
        userEmail: billingInfo.billingEmail,
        billingInfo,
        cartItems,
        totalPrice: billingInfo.totalPrice,
        totalQuant: getCartTotal()
    }

    const token = localStorage.getItem('AUTH_API');
    const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const url = `http://localhost:5000/api/v1/orders`;
    const res = await fetch(url, {
      method: 'POST',
      headers: header,
      body: JSON.stringify(orderObj),
    });

    console.log(res.json());
  }

  return (
    <>
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <form onSubmit={submitOrder} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <ol className="items-center flex w-full max-w-2xl text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Cart
                </span>
            </li>

            <li className="after:border-1 flex items-center text-primary-700 after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Checkout
                </span>
            </li>
            <li className="flex items-center text-primary-700 dark:text-primary-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10">
                <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
                <svg className="me-2 h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                Summary
                </span>
            </li>
        </ol>
        <div className="mx-auto max-w-3xl mt-">

        <div className="mt-6 space-y-4 border-b border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>

            <dl>
            <dt className="text-base font-medium text-gray-900 dark:text-white">Individual</dt>
            <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">{billingInfo.billingName} - {billingInfo.billingPhone} - {billingInfo.billingEmail}</dd>
            </dl>

            {/* <button type="button" data-modal-target="billingInformationModal" data-modal-toggle="billingInformationModal" className="text-base font-medium text-primary-700 hover:underline dark:text-primary-500">Edit</button> */}
        </div>

        <div className="mt-6 sm:mt-8">
            <div className="relative overflow-x-auto border-b border-gray-200 dark:border-gray-800">
            <table className="w-full text-left font-medium text-gray-900 dark:text-white md:table-fixed">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {cartItems.length > 1 ? (cartItems.map((item) => (
                <>
                    <tr>
                        <td className="whitespace-nowrap py-4 md:w-[384px]">
                        <div className="flex items-center gap-4">
                            <a href="#" className="flex items-center aspect-square w-10 h-10 shrink-0">
                            <img className="h-auto w-full max-h-full dark:hidden" src={item.thumbnail} alt="imac image" />
                            <img className="hidden h-auto w-full max-h-full dark:block" src={item.thumbnail} alt="imac image" />
                            </a>
                            <a href="#" className="hover:underline">{item.name}</a>
                        </div>
                        </td>

                        <td className="p-4 text-base font-normal text-gray-900 dark:text-white">x{item.quantity}</td>

                        <td className="p-4 text-right text-base font-bold text-gray-900 dark:text-white">${item.price}</td>
                    </tr>
                </>)))
                : 
                (<>
                </>)}
                </tbody>
            </table>
            </div>

            <div className="mt-4 space-y-6">
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h4>

            <div className="space-y-4">
                <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">Original price</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">${billingInfo.subTotal}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-gray-500 dark:text-gray-400">Delivery</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white">${billingInfo.deliveryFee}</dd>
                    </dl>
                </div>

                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-lg font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-lg font-bold text-gray-900 dark:text-white">${billingInfo.totalPrice}</dd>
                </dl>
            </div>

            <div className="flex items-start sm:items-center">
                <input id="terms-checkbox-2" type="checkbox" value="" className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-primary-600 focus:ring-2 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600" />
                <label htmlFor="terms-checkbox-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"> I agree with the <a href="#" title="" className="text-primary-700 underline hover:no-underline dark:text-primary-500">Terms and Conditions</a> of use of the webmart </label>
            </div>

            <div className="gap-4 sm:flex sm:items-center">
                <button type="button" className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"><a href="/products">Return to Shopping</a></button>

                <button type="submit" className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary-700  px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 sm:mt-0">Send the order</button>
            </div>
            </div>
        </div>
        </div>
        <ToastContainer />
    </form>
    </section>
    </>
    )
}
