import { ipAddress, next } from "@vercel/edge";
import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export default async function middleware(request: Request) {
  const ip = ipAddress(request);
  const url = new URL(request.url);
  const path = url.pathname;

  if (path !== "/am-i-blocked") {
    return next({
      headers: { "x-your-ip-address": ip || "unknown" },
    });
  }

  const blockedIps = await get<string[]>("blockedIps");
  if (ip && blockedIps.includes(ip as string)) {
    return new NextResponse("Access denied", {
      status: 403,
      headers: { "Cache-Control": "no-cache" },
    });
  }
  
  return next({
    headers: { "x-your-ip-address": ip || "unknown" },
  });
}
