"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { InfoIcon, Loader2 } from "lucide-react";

export default function IpRules() {
  const [blockedIps, setBlockedIps] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Loading states
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [ipsLoading, setIpsLoading] = useState<boolean>(true);
  const [removeLoading, setRemoveLoading] = useState<any>({});

  useEffect(() => {
    setIpsLoading(true);
    axios
      .get("/api/blocked-ips")
      .then((res) => {
        setBlockedIps(res.data.blockedIps);
      })
      .catch((e) => {
        setErrorMessage("Failed to load IPs");
      })
      .finally(() => {
        setIpsLoading(false);
      });
  }, []);

  const removeIp = (ip: string) => {
    setRemoveLoading({ ...removeLoading, [ip]: true });
    const newIps = blockedIps.filter((blockedIp: string) => blockedIp !== ip);
    axios
      .patch("/api/blocked-ips", { blockedIps: newIps })
      .then(() => {
        setBlockedIps(newIps);
        delete removeLoading[ip];
        setShowAlert(true);
      })
      .catch((e) => {
        setErrorMessage("Failed to remove IP");
      })
      .finally(() => {
        setRemoveLoading(false);
      });
  };

  const addIp = (e: any) => {
    e.preventDefault();

    const form = e.target;
    const ip = form.ip.value;

    // Check if IP is already blocked
    if (blockedIps.includes(ip)) {
      setErrorMessage("IP is already blocked");
      return;
    }

    const newIps = [...blockedIps, ip];

    setAddLoading(true);
    axios
      .patch("/api/blocked-ips", { blockedIps: newIps })
      .then(() => {
        form.reset();
        setBlockedIps(newIps);
        setShowAlert(true);
      })
      .catch((e) => {
        console.log("error", e);
        setErrorMessage("Failed to block IP");
      })
      .finally(() => {
        setAddLoading(false);
      });
  };

  return (
    <div className="max-w-md mx-auto">
      {showAlert && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            Note that it may take a few seconds for the rules to take effect.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={(e) => addIp(e)}>
        <div className="flex w-full items-center space-x-2 my-4">
          <Input required name="ip" placeholder={"1.2.3.4"} />
          <Button disabled={addLoading} type="submit" className="flex-shrink-0">
            {addLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}{" "}
            Block IP
          </Button>
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
      </form>

      <ul className="flex flex-col border-accents-2 border rounded-md bg-white divide-y divide-accents-2 my-4">
        {ipsLoading ? (
          <li className="animate-pulse flex items-center justify-content py-6 px-6">
            <div className="w-full h-5 bg-slate-200 rounded col-span-2"></div>
          </li>
        ) : (
          <>
            {blockedIps.map((ip: string) => (
              <li
                key={ip}
                className="flex items-center justify-content py-6 px-6"
              >
                <span className="flex-1">
                  <h3 className="font-semibold text-black">{ip}</h3>
                  <p className="font-medium text-accents-4">{}</p>
                </span>
                <span className="w-48 flex justify-end">
                  <Button
                    disabled={removeLoading[ip]}
                    variant={"secondary"}
                    className="flex-shrink-0"
                    onClick={() => removeIp(ip)}
                  >
                    {removeLoading[ip] && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}{" "}
                    Remove Rule
                  </Button>
                </span>
              </li>
            ))}
          </>
        )}
      </ul>
      {!ipsLoading && blockedIps.length === 0 && (
        <div className="text-center text-accents-4 py-6">No blocked IPs</div>
      )}
    </div>
  );
}
