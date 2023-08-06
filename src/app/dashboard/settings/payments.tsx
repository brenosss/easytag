'use client';

import { useEffect, useState } from "react";
import DangerAlert from "src/components/Alerts/DangerAlert";
import SuccessAlert from "src/components/Alerts/SuccessAlert";


export function PaymentsSummary() {
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");

  useEffect(() => {
    (async () => {
      await getSubscriptionStatus();
    })();
  }, []);


  async function createCheckoutSession() {
    const projectResponse = await fetch("/api/settings/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const subscriptionJson = await projectResponse.json();
      if (subscriptionJson != null && typeof subscriptionJson.url === "string") {
        const newWindow = window.open(subscriptionJson.url, '_blank')
        if (newWindow) newWindow.focus();
      }
    }
  }

  async function getSubscriptionStatus() {
    const projectResponse = await fetch("/api/settings/payments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (projectResponse.status === 200) {
      const subscriptionJson = await projectResponse.json();
      setSubscriptionStatus(subscriptionJson.status);
    }
  }

  return (
    <div>
      <h2 className="text-lg font-semibold leading-7 text-gray-900 pb-4">Payments information</h2>
      {subscriptionStatus === "incomplete" ? (
        <DangerAlert title="Your subscription is incomplete">
          <p className="underline cursor-pointer" onClick={() => createCheckoutSession()}>Please complete your subscription to start using your project.</p>
        </DangerAlert>
      ) : (
        <SuccessAlert title="Your subscription is complete"></SuccessAlert>
      )}
    </div>
  )
}
