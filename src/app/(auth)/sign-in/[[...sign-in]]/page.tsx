import React from "react";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <div className="lg:grid lg:grid-cols-12 lg:min-h-screen w-full">
        <section className="relative h-64 lg:col-span-5 lg:h-auto xl:col-span-6 bg-gray-900">
          <Image
            alt="Background image"
            src="https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            layout="fill"
            objectFit="cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center">
              Welcome to BudgetMate
            </h1>
          </div>
        </section>

       
        <main className="flex items-center justify-center p-6 sm:p-12 lg:col-span-7 xl:col-span-6">
          <div className="w-full max-w-md space-y-8 bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold text-gray-900">
                Sign in to your account
              </h2>
              <p className="text-gray-500">
                Get started with BudgetMate, your AI-powered finance advisor.
              </p>
            </div>
            <SignIn />
          </div>
        </main>
      </div>
    </section>
  );
}
