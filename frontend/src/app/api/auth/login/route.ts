import { NextRequest, NextResponse } from "next/server";
import { PRIVATE_API_URL } from "@/urls";
import * as jose from "jose";
import { userJwtPayload } from "@/types/userJwtPayload";

export const POST = async (request: NextRequest) => {
  const payload = await request.json();

  const response = await fetch(`${PRIVATE_API_URL}/api/auth/local`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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

    // this is for jose token package
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const alg = "HS256";

    // httpOnly=true token
    const tokenData: Partial<userJwtPayload> = {
      jwt: data.jwt,
      user: {
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        user_type: data.user.user_type,
      },
    };

    // set 30days for production....
    // For production .setExpirationTime("30 days")
    const token = await new jose.SignJWT(tokenData)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("30 days")
      .sign(secret);

    response.cookies.set("farmart_account_token", token, {
      httpOnly: true,
      secure: true,
    });

    response.cookies.set("farmart_client_token", token, {
      httpOnly: false,
      secure: true,
    });

    return response;
  }

  return NextResponse.json({
    status: 400,
    message: data.error.message || "Something went wrong!",
  });
};
