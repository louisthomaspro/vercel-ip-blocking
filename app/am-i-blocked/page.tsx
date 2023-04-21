import { headers } from "next/headers";
import Link from "next/link";
import IpWrapper from "../../components/ip-wrapper";

function Home() {
  const headersList = headers();
  const myIp = headersList.get("x-your-ip-address") as string;

  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <div className="text-center mb-10">
        <div className="mb-4 text-2xl">You are not blocked</div>
        <div className="mb-4">
          Try to add the following IP to the IP rule list:
        </div>
        <div className="mb-10">
          <IpWrapper ip={myIp} />
        </div>
        <div>
          <Link href="/" prefetch={false}>
            <button
              type="button"
              className="font-semibold flex-shrink-0 hover:bg-gray-100 py-2 px-4 border rounded-md focus:outline-none focus:shadow-outline"
            >
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
