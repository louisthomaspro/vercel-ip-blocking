import { headers } from "next/headers";
import IpRules from "../../components/ip-rules";
import Link from "next/link";
import IpWrapper from "../../components/ip-wrapper";

function DemoPage() {
  const headersList = headers();
  const myIp = headersList.get("x-your-ip-address") as string;

  return (
    <div className="w-full max-w-3xl mx-auto mt-8">
      <div className="text-center mb-10">
        <h2 className="mb-6 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Simple IP Blocker
        </h2>
        <p className="leading-7 mb-3">
          With Vercel&apos;s{" "}
          <Link
            href="https://vercel.com/docs/concepts/functions/edge-middleware#create-edge-middleware"
            target="_blank"
            className="underline underline-offset-4 font-semibold"
          >
            Edge Middleware
          </Link>{" "}
          and{" "}
          <Link
            href="https://vercel.com/docs/concepts/edge-network/edge-config"
            target="_blank"
            className="underline underline-offset-4 font-semibold"
          >
            Edge Config
          </Link>
          , you can now perform functions at the edge level and take immediate
          action on in-flight requests. For example, you can quickly block
          certain IPs by leveraging edge-config to store a list of IPs to block.
        </p>
        <p className="leading-7 ">
        Add the IPs you wish to block and then navigate to the{" "}
          <Link
            href="/am-i-blocked"
            className="text-blue-600 hover:underline"
            prefetch={false}
          >
            /am-i-blocked
          </Link>{" "}
          endpoint under that IP. The request will be intercepted at the edge and the IP will be blocked.
        </p>
        <div className="mt-8">
          Your IP is:
          <IpWrapper ip={myIp} />
        </div>
      </div>
      <IpRules />
    </div>
  );
}

export default DemoPage;
