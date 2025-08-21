"use client";

import * as Sentry from "@sentry/nextjs";
import Error from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }) {
  useEffect(() => {
    // Check if we're in the browser environment and Sentry is available
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <Error />
      </body>
    </html>
  );
}
