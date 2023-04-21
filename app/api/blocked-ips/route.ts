import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export const config = {
  runtime: "edge",
};

export async function GET(request: Request) {
  const blockedIps = await get("blockedIps");
  return NextResponse.json({
    blockedIps,
  });
}

export async function PATCH(request: Request) {
  const blockedIps = (await request.json()).blockedIps;

  const updateEdgeConfig = await fetch(
    `https://api.vercel.com/v1/edge-config/${process.env.EDGE_CONFIG_ID}/items`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${process.env.EDGE_CONFIG_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [
          {
            operation: "update",
            key: "blockedIps",
            value: blockedIps,
          },
        ],
      }),
    }
  );
  await updateEdgeConfig.json();

  return NextResponse.json({
    message: "Edge config updated",
  });
}
