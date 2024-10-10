import { PiggyBank, ReceiptText, Sparkles, CircleDollarSign } from "lucide-react";
import React, { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useUser } from "@clerk/nextjs";

interface Budget {
  id: number;
  name: string;
  amount: number;
  icon: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expenses: Expense[];
}

interface Expense {
  id: number;
  name: string;
  amount: number;
  budgetId: number;
  userId: string;
  createdAt: string;
}

interface Income {
  id: number;
  name: string;
  amount: number;
  icon: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface CardInfoProps {
  budgetList: Budget[];
  incomeList: Income[];
  expensesList: Expense[];
}

const CardInfo: React.FC<CardInfoProps> = ({ budgetList, incomeList, expensesList }) => {
  const [financialAdvice, setFinancialAdvice] = useState<string | null>(null);
  const { user } = useUser();

  const totalBudget = useMemo(
    () => budgetList.reduce((sum, budget) => sum + (Number(budget.amount) || 0), 0),
    [budgetList]
  );

  const totalIncome = useMemo(
    () => incomeList.reduce((sum, income) => sum + (Number(income.amount) || 0), 0),
    [incomeList]
  );

  const totalSpend = useMemo(
    () => expensesList.reduce((sum, expenses) => sum + (Number(expenses.amount) || 0), 0),
    [expensesList]
  );

  // Use useCallback to memoize the function
  const getFinancialAdviceFromAPI = useCallback(
    async (totalBudget: number, totalIncome: number, totalSpend: number, userId: string) => {
      try {
        const response = await fetch("/api/financialAdvice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ totalBudget, totalIncome, totalSpend, userId }),
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data.advice;
      } catch (error) {
        console.error("Error fetching financial advice:", error);
        return "Sorry, something went wrong. Please try again later.";
      }
    },
    []
  );

  // Use a ref to track if the API call has been made
  const apiCallMade = useRef(false);

  useEffect(() => {
    if (apiCallMade.current) {
      // API call has already been made, do not call again
      return;
    }

    if (
      !user?.id ||
      budgetList.length === 0 ||
      incomeList.length === 0 ||
      expensesList.length === 0
    ) {
      return;
    }

    const userId = user.id;

   /* getFinancialAdviceFromAPI(totalBudget, totalIncome, totalSpend, userId).then((advice) => {
      setFinancialAdvice(advice);
    });*/

    // Set the ref to true after the API call is initiated
    apiCallMade.current = true;
  }, [user?.id, totalBudget, totalIncome, totalSpend, getFinancialAdviceFromAPI]);

  return (
    <div>
      <div className="p-7 border mt-4 -mb-1 rounded-2xl flex items-center justify-between">
        <div className="flex mb-2 flex-row space-x-1 items-center ">
          <h2 className="text-md">Smart AI</h2>
          <Sparkles className="rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate" />
        </div>
        <h2 className="font-light text-md">
          {financialAdvice ?? "Loading financial advice..."}
        </h2>
      </div>

      <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="p-7 border rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-sm">Total Budget</h2>
            <h2 className="font-bold text-2xl">
              $
              {budgetList.reduce(
                (sum, budget) => sum + (Number(budget.amount) || 0),
                0
              )}
            </h2>
          </div>
          <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
        </div>
        <div className="p-7 border rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-sm">Total Spend</h2>
            <h2 className="font-bold text-2xl">
              $
              {expensesList
                .reduce(
                  (sum, expenses) => sum + (Number(expenses.amount) || 0),
                  0
                )
                .toLocaleString()}
            </h2>
          </div>
          <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
        </div>
        <div className="p-7 border rounded-2xl flex items-center justify-between">
          <div>
            <h2 className="text-sm">Total Income</h2>
            <h2 className="font-bold text-2xl">
              $
              {incomeList
                .reduce((sum, income) => sum + Number(income.amount), 0)
                .toLocaleString()}
            </h2>
          </div>
          <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white" />
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
