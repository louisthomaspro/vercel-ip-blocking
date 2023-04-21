# Simple IP Blocker

Using [Edge Middleware](https://vercel.com/docs/concepts/functions/edge-middleware#create-edge-middleware), you can easily block IP addresses from accessing your site. This repo is using [Next.js](https://nextjs.org/) as an example.

You can use Edge Middleware with any framework. To add Middleware to your app, you need to create a `middleware.ts` or `middleware.js` file in the root of your project.

## Documentation

Here is a simple example of how to block IP addresses:

```ts
// middleware.ts
import { ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";

export default async function middleware(request: Request) {
  const blockedIps = ["1.2.3.4", "5.6.7.8"];
  const ip = ipAddress(request);

  if (ip && blockedIps.includes(ip)) {
    return new NextResponse("Access denied", { status: 403 });
  }
}
```

The `blockedIps` variable can be configured using [Edge Config](https://vercel.com/docs/concepts/edge-network/edge-config) to simplify the process of changing IP addresses.

1. [Create the Edge Config store](https://vercel.com/docs/concepts/edge-network/edge-config/get-started)

2. Update the Edge Config store with the following JSON:

```
{
  "blockedIps": [
    "1.2.3.4",
    "5.6.7.8"
  ]
}
```

3. Update the `middleware.ts` file to use the `get` function from `@vercel/edge-config`:

```ts
// middleware.ts
import { ipAddress } from "@vercel/edge";
import { NextResponse } from "next/server";
import { get } from "@vercel/edge-config";

export default async function middleware(request: Request) {
  const blockedIps = (await get("blockedIps")) as string[];
  const ip = ipAddress(request);

  if (ip && blockedIps.includes(ip)) {
    return new NextResponse("Access denied", { status: 403 });
  }
}
```
