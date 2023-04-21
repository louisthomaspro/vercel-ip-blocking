import { ipAddress, next } from "@vercel/edge";
import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export default async function middleware(request: Request) {
  const blockedIps = (await get("blockedIps")) as string[];
  const ip = ipAddress(request);

  const url = new URL(request.url);
  const path = url.pathname;

  if (path === "/am-i-blocked" && ip && blockedIps.includes(ip as string)) {
    return new NextResponse("Access denied", {
      status: 403,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }

  return next({
    headers: { "x-your-ip-address": ip || "unknown" },
  });
}
