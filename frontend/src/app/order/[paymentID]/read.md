<tbody className="bg-white divide-y divide-gray-200 ">
              {orders?.map((order: any) => {
                const {
                  id,
                  attributes,
                }: { id: number; attributes: orderAttributes } = order;
                const {
                  paymentID,
                  products,
                  createdAt,
                  status,
                  shipping_method_and_cost,
                } = attributes;
                const { shippingCost }: { shippingCost: number } =
                  shipping_method_and_cost;
                // console.log(products);

                let subtotal: number = products.reduce(
                  (total: number, product: CartProduct) => {
                    let value = product.quantity * product.price;
                    return value + total;
                  },
                  0
                );

                const totalPrice: number = subtotal + shippingCost;
                return (
                  <tr key={id}>
                    <td className="px-5 py-3 leading-6 whitespace-nowrap">
                      <span className="uppercase text-sm font-medium">
                        {paymentID.substring(0, 8) + `...`}
                      </span>
                    </td>
                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                      <span className="text-sm">
                        {moment(createdAt).format("Do MMMM YYYY, h:mm:ss a")}
                      </span>
                    </td>
                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap font-medium text-sm">
                      <span
                        className={`capitalize font-semibold ${
                          status.toLowerCase() === "pending" &&
                          "text-orange-500"
                        } ${
                          status.toLowerCase() === "complete" &&
                          "text-emerald-500"
                        } ${
                          status.toLowerCase() === "processing" &&
                          "text-indigo-500"
                        }`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-700">
                        ${totalPrice}
                      </span>
                    </td>

                    <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
                      <Link
                        href={`/order/${paymentID}`}
                        className="px-3 py-1 bg-emerald-100 text-xs text-emerald-600 hover:bg-emerald-500 hover:text-white transition-all font-semibold rounded-full"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>