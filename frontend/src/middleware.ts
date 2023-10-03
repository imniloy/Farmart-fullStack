import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./services/verifyAuth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token: string =
    request.cookies.get("farmart_account_token")?.value || "";

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      console.log(error);
    }));

  const adminPath = ["/farmart/admin"];
  // protect admin authorize route...
  if (
    verifiedToken &&
    verifiedToken.user.user_type === "admin" &&
    !adminPath.includes(request.nextUrl.pathname)
  ) {
    return NextResponse.redirect(new URL("/farmart/admin", request.url));
  }

  // protect user authorize route...
  if (!verifiedToken && request.nextUrl.pathname.startsWith("/users/account")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!verifiedToken && request.nextUrl.pathname.startsWith("/order")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    (!verifiedToken && request.nextUrl.pathname.startsWith("/farmart/admin")) ||
    (verifiedToken &&
      verifiedToken.user.user_type !== "admin" &&
      request.nextUrl.pathname.startsWith("/farmart/admin"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths"...
export const config = {
  matcher: [
    "/",
    "/farmart/admin",
    "/users/account/",
    `/users/account/:path*`,
    "/order/",
    "/order/:path*",
  ],
};
