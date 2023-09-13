import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAuth } from "./services/verifyAuth";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token: string =
    request.cookies.get("farmart_account_token")?.value || "";

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      console.log(error);
    }));

  // protect admin route...
  if (
    (!verifiedToken && request.nextUrl.pathname.startsWith("/farmart/admin")) ||
    (verifiedToken &&
      verifiedToken.user.user_type !== "admin" &&
      request.nextUrl.pathname.startsWith("/farmart/admin"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // protect user route...
  if (
    (!verifiedToken && request.nextUrl.pathname.startsWith("/users/account")) ||
    (verifiedToken &&
      verifiedToken.user.user_type !== "user" &&
      request.nextUrl.pathname.startsWith("/users/account"))
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths"...
export const config = {
  matcher: ["/", "/farmart/admin", "/users/account"],
};
