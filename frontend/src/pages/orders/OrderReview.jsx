import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderReview() {
  const [orderData, setOrderData] = useState({});
  const [billingInfo, setBillingInfo] = useState({});
  const [cartItems, setCartItems] = useState({});

  const {id} = useParams();

  useEffect(() => {
    const fetchOrder = async (id) => {
      const token = localStorage.getItem('AUTH_API');
      const header = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      };

      const apiUrl = `http://localhost:5000/api/v1/orders/${id}`;
      try {
        const data = await fetch(apiUrl, {
            headers: header,
        });
        const order = await data.json();
        setOrderData(order);
        setBillingInfo(order.billingInfo);
        setCartItems(order.cartItems);
      } catch (err) {
        console.error(err);
      }
    }
    fetchOrder(id);
  }, [id, orderData]);

  return (
    <>
<section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-3xl">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Order Details</h1>
        <div className="mt-6 space-y-4 border-b border-t border-gray-200 py-8 dark:border-gray-700 sm:mt-8">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Billing & Delivery information</h4>

            <dl>
                <dt className="text-base font-medium text-gray-900 dark:text-white">Individual</dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Name: {billingInfo.billingName}</dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Contact: {billingInfo.billingPhone} - {billingInfo.billingEmail}</dd>                
            </dl>

            <dl>
                <dt className="text-base font-medium text-gray-900 dark:text-white">Order Details</dt>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Order ID: {orderData._id}</dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">When: {orderData.createdAt}</dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Status: {orderData.isDelivered ? 'Delivered' : 'In transit'} </dd>
                <dd className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400">Payment Status: {billingInfo.billingPaymentMethod === 'PoD' ? 'Payment on Delivery' : 'Paid'} </dd>
            </dl>
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
                            <img className="h-auto w-full max-h-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                            <img className="hidden h-auto w-full max-h-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
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

            <div className="gap-4 sm:flex sm:items-center">
                <button type="button" className="w-full rounded-lg  border border-gray-200 bg-white px-5  py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"><a href="/products">Return to Shopping</a></button>
            </div>
            </div>
        </div>
        </div>
    </div>
</section>
    </>
  )
}
