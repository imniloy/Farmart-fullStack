import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
    });

    response.cookies.set("farmart_account_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ status: 500, error: err.message });
  }
};
