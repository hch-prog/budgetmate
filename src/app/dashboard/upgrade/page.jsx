import React from "react";

function Upgrade() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:items-center">
          <div className="rounded-xl bg-white border border-indigo-600 shadow-lg p-8 sm:order-last lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Pro <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-4 sm:mt-6">
                <strong className="text-4xl font-extrabold text-gray-900">
                  $30
                </strong>
                <span className="text-lg font-medium text-gray-500">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                20 users included
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                5GB of storage
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                Email support
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                Help center access
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                Phone support
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                Community access
              </li>
            </ul>

            <a
              href="#"
              className="mt-10 block rounded-lg bg-indigo-600 px-8 py-3 text-lg font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Get Started
            </a>
          </div>

          <div className="rounded-xl bg-white border border-gray-300 shadow-lg p-8 lg:p-12">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900">
                Starter <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-4 sm:mt-6">
                <strong className="text-4xl font-extrabold text-gray-900">
                  $20
                </strong>
                <span className="text-lg font-medium text-gray-500">
                  /month
                </span>
              </p>
            </div>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                10 users included
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                2GB of storage
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                Email support
              </li>
              <li className="flex items-center gap-2 text-base text-gray-700">
                <CheckIcon />
                Help center access
              </li>
            </ul>

            <a
              href="#"
              className="mt-10 block rounded-lg border border-indigo-600 bg-white px-8 py-3 text-lg font-semibold text-indigo-600 hover:bg-indigo-50 hover:border-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6 text-indigo-600"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default Upgrade;
