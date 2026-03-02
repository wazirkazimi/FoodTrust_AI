import React from 'react';

export default function FSSAIStatusBadge({ status }) {
  let bg;
  if (status === 'valid') bg = 'bg-success';
  else if (status === 'invalid') bg = 'bg-danger';
  else bg = 'bg-warning';

  return <div className={`${bg} text-white px-2 py-1 rounded-full`}>{status}</div>;
}
