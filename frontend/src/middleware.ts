import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { tokenDataType } from "./types/tokenData";
import { cookies } from "next/headers";
import { verifyAuth } from "./services/verifyAuth";
import { userJwtPayload } from "./types/userJwtPayload";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const userPrivatePath = path === "/";
  const adminPath = path === "/farmart/*";
  const token: string =
    request.cookies.get("farmart_account_token")?.value || "";

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      console.log(error);
    }));

  // if (
  //   verifiedToken &&
  //   verifiedToken.user.user_type !== "admin" &&
  //   request.nextUrl.pathname.startsWith("/farmart/admin")
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  if (!verifiedToken && request.nextUrl.pathname.startsWith("/farmart/admin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// See "Matching Paths"...
export const config = {
  matcher: ["/", "/farmart/admin"],
};
