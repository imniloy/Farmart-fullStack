import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
      status: 200,
    });

    response.cookies.set("farmart_account_token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    response.cookies.set("farmart_client_token", "", {
      httpOnly: false,
      expires: new Date(0),
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({
      status: 500,
      success: false,
      message: "failed to logout",
    });
  }
};
