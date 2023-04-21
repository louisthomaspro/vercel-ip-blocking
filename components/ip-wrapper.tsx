"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function IpWrapper({ ip }: { ip: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <span
      className="relative cursor-pointer ml-2 bg-gray-100 hover:bg-gray-200 text-blue-500 py-1 px-3 rounded whitespace-nowrap inline-flex items-center"
      onClick={() => {
        navigator.clipboard.writeText(ip);
        setCopied(true);
      }}
    >
      <span className="font-semibold font-mono">{ip}</span>
      <Image
        src="/copy.svg"
        alt="Copy IP address"
        width={12}
        height={12}
        className="inline-block ml-2 opacity-90"
      />
      {copied && (
        <span
          className="absolute text-green-500 font-semibold text-sm"
          style={{ right: "-62px" }}
        >
          Copied!
        </span>
      )}
    </span>
  );
}
