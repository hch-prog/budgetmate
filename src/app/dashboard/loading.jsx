import React from 'react';
import { Loader as Spinner } from "lucide-react";

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Spinner className="animate-spin text-blue-400 h-16 w-16 mb-4" />
      <p className="text-gray-600 font-medium">Loading, please wait...</p>
    </div>
  );
}

export default Loading;
