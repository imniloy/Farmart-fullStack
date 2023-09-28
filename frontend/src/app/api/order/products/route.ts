import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "@/services/verifyAuth";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const url = req.nextUrl.search;

  const response = await fetch(`${PRIVATE_API_URL}/api/products${url}`);

  if (!response.ok)
    return NextResponse.json({
      success: false,
    });

  const { data } = await response.json();

  return NextResponse.json({
    success: true,
    data,
  });
};

export const PUT = async (request: NextRequest) => {
  const allUpdateProducts: Array<{ id: number; stock: string }> =
    await request.json();
  const token = request.cookies.get("farmart_account_token") || "";

  if (token) {
    const verifyToken = await verifyAuth(token.value);
    const { jwt, user } = verifyToken;

    if (user.id) {
      const promises = allUpdateProducts.map(async (product) => {
        return await (
          await fetch(`${PRIVATE_API_URL}/api/products/${product.id}`, {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify({ data: { stock: product.stock } }),
          })
        ).json();
      });

      const data = await Promise.allSettled(promises);
      // console.log(data);

      if (data.length > 0) {
        return NextResponse.json({
          success: true,
          status: 200,
          data,
          error: null,
        });
      }
    } else {
      return NextResponse.json({
        status: 401,
        success: false,
        data: null,
        error: "Unauthorized actions",
      });
    }
  }

  return NextResponse.json({
    status: 500,
    success: false,
    data: null,
    error: "Something wrong happened",
  });
};
