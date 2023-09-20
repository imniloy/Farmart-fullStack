const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const { products, userId } = ctx.request.body;

      try {
        const lineItems = await Promise.all(
          products.map(async (product) => {
            const item = await strapi
              .service("api::product.product")
              .findOne(product?.id);

            return {
              price_data: {
                currency: "usd",
                product_data: {
                  name: item.name,
                },
                unit_amount: Math.round(item.price * 100),
              },
              quantity: product.quantity,
            };
          })
        );

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: process.env.CLIENT_URL + `/order/congratulation`,
          cancel_url: process.env.CLIENT_URL,
        });

        await strapi.service("api::order.order").create({
          data: {
            products,
            stripeId: session.id,
            status: "pending",
            users_permissions_user: userId,
          },
        });

        return { stripeId: session.id };
      } catch (error) {
        if (!products) {
          ctx.response.status = 400;
          return new Error("Products not found");
        } else {
          ctx.response.status = 500;
          return error;
        }
      }
    },
  })
);
