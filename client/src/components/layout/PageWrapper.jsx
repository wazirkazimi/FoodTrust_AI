import React from 'react';

export default function PageWrapper({ children }) {
  return <div className="min-h-screen bg-background pb-16">{children}</div>;
}
