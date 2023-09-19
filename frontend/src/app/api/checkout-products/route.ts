import { PRIVATE_API_URL } from "@/urls";
import { NextRequest, NextResponse } from "next/server";
import { loadStripe } from "@stripe/stripe-js";

export const POST = async (request: NextRequest) => {
  const payload = await request.json();

  const response = await fetch(`${PRIVATE_API_URL}/api/orders`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
};
