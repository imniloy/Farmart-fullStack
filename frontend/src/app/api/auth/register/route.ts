import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_API_URL } from "@/urls";
import { tokenDataType } from "@/types/tokenData";
import * as jose from "jose";

export const POST = async (request: NextRequest) => {
  const payload = await request.json();
  const response = await fetch(`${PRIVATE_API_URL}/api/auth/local/register`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (data.jwt && data.user.id) {
    const response = NextResponse.json({
      status: 200,
      jwt: data.jwt,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        user_type: data.user.user_type,
      },
    });

    const tokenData: tokenDataType = {
      jwt: data.jwt,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        user_type: data.user.user_type,
      },
    };

    // this is for jose token package
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    // set 30days for production....
    // For production .setExpirationTime("30 days")
    const token = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("1m")
      .sign(secret);

    response.cookies.set("farmart_account_token", token, {
      httpOnly: true,
      secure: true,
    });

    return response;
  }

  return NextResponse.json({
    status: 400,
    message: data.error.message || "Something went wrong!",
  });
};
