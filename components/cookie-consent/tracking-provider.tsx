import { type ReactNode } from 'react';

// Tracking disabled: Google Analytics and marketing pixels removed entirely
export default function TrackingProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
