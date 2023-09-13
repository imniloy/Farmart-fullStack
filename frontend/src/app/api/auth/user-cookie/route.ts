import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_API_URL } from "@/urls";
import { tokenDataType } from "@/types/tokenData";
import { verifyAuth } from "@/services/verifyAuth";

export const GET = async (request: NextRequest) => {
  const token: string =
    request.cookies.get("farmart_account_token")?.value || "";

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((error) => {
      console.log(error);
    }));

  if (verifiedToken && verifiedToken.user.id) {
    return NextResponse.json({
      authenticatedUser: true,
      user: verifiedToken.user,
    });
  }

  return NextResponse.json({
    authenticatedUser: false,
  });
};
