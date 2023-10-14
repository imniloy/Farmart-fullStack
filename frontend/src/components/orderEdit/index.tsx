"use client";
import { CartProduct } from "@/redux/features/cart/types";
import { orderAttributes, orderObjectType } from "@/types/ordersData";
import PulseLoader from "react-spinners/PulseLoader";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const OrderEditComp = ({
  jwt,
  order,
}: {
  jwt: string;
  order: orderObjectType;
}) => {
  const { id, attributes }: { id: number; attributes: orderAttributes } = order;
  const [editMode, setEditMode] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState<string>(
    attributes?.status ? attributes.status : ""
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();
  const handleOrderStatusUpdate = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    
    const allowedstatusValue = ["pending", "complete", "processing"];
    if (loading) return;
    if (!allowedstatusValue.includes(deliveryStatus.trim().toLowerCase())) {
      toast.error(`Only Pending | Complete | Processing value is allowed`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:1337/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({
          data: {
            status: deliveryStatus.toLowerCase(),
          },
        }),
      });

      const { data } = await response.json();
      if (data.id) {
        toast.success(`Status updated`, {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          pauseOnFocusLoss: true,
          draggable: true,
          theme: "light",
        });
        setEditMode(false);
      }
      router.refresh();
    } catch (err: any) {
      toast.error(`Something wrong happends!`, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        pauseOnFocusLoss: true,
        draggable: true,
        theme: "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <div className="space-y-[3px]">
        <h1 className="">Payment ID: {attributes?.paymentID}</h1>
        <p className="">
          Customer Name: {attributes?.user_personal_details?.firstName}{" "}
          {attributes?.user_personal_details?.lastName}{" "}
        </p>
        <p className="">
          Shipping Address:: {attributes?.shipping_address.street}
          {", "}
          {attributes?.shipping_address.city}
          {", "}
          {attributes?.shipping_address.country}
        </p>

        <p className="">
          Phone Number: {attributes?.user_personal_details?.phoneNumber}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-4 my-2">
          <div className="space-x-4 flex items-center">
            <p className={`capitalize`}>
              Order Delivery Status:{" "}
              <span className={`${editMode && "hidden"} text-emerald-600`}>
                {attributes?.status}
              </span>
            </p>

            <svg
              onClick={() => setEditMode(true)}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={`w-5 h-5 cursor-pointer text-emerald-600 ${
                editMode && "hidden"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </div>

          <div className={`${editMode ? "block" : "hidden"} my-2 sm:mt-0`}>
            <form onSubmit={handleOrderStatusUpdate}>
              <input
                type="text"
                value={deliveryStatus}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDeliveryStatus(e.target.value)
                }
                className="px-2 sm:px-4 py-1 sm:py-2 border border-emerald-200 focus:border-emerald-200 focus:outline-none outline-none placeholder:text-sm w-[200px]"
                placeholder="Pending | Processing | Complete"
              />
              <button
                type="submit"
                className={`ml-4  bg-emerald-600 px-2 py-1 sm:px-4 sm:py-2 text-white`}
              >
                {loading ? (
                  <PulseLoader
                    size={12}
                    color={"#FFF"}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "Update"
                )}
              </button>
            </form>
          </div>
        </div>

        <p className="capitalize">
          Date & Time:{" "}
          {moment(attributes?.createdAt).format("h:mm:ss a, Do MMMM YYYY")}
        </p>
      </div>

      <div className="w-full my-10 overflow-auto">
        <table className="font-inter table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="bg-gray-200">
              <th
                scope="col"
                className="text-left text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Product Name
              </th>

              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Quantity
              </th>
              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="text-center text-xs font-inter font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider"
              >
                Total
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {attributes?.products.map((product: CartProduct, i) => (
              <tr key={i}>
                <td className="px-5 py-3 leading-6 whitespace-nowrap">
                  <span className="uppercase text-sm font-medium">
                    {product.name}
                  </span>
                </td>
                <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                  <span className="text-sm">{product.quantity}</span>
                </td>
                <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                  <span className="font-bold">{product.price}</span>
                </td>
                <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                  <span className="text-sm font-bold">
                    {parseFloat((product.price * product.quantity).toFixed(2))}
                  </span>
                </td>
              </tr>
            ))}

            <tr className="">
              <td className="px-5 py-3 leading-6 whitespace-nowrap">
                <span className="uppercase text-sm font-medium">
                  SHIPPING METHOD:{" "}
                  <span className="text-brand-color font-medium capitalize">
                    {attributes?.shipping_method_and_cost.shippingMedium}
                  </span>
                </span>
              </td>
              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">{`     `}</span>
              </td>
              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                <span className="font-bold">{`     `}</span>
              </td>
              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm font-bold">
                  {attributes?.shipping_method_and_cost.shippingCost}
                </span>
              </td>
            </tr>
            <tr className="">
              <td className="px-5 py-3 leading-6 whitespace-nowrap">
                <span className="uppercase text-sm font-medium">
                  Total price:
                </span>
              </td>
              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm">{`     `}</span>
              </td>
              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                <span className="font-bold">{`     `}</span>
              </td>
              <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                <span className="text-sm font-bold">
                  {attributes?.products?.reduce((total, product) => {
                    let value = product.quantity * product.price;
                    return value + total;
                  }, attributes?.shipping_method_and_cost?.shippingCost)}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderEditComp;
