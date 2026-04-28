'use client'

import * as React from "react";

interface NoSSRProps {
  children: React.ReactNode;
}

export default function NoSSR({ children }: NoSSRProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <>{children}</>;
}
