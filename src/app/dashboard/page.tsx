'use client';

import React, { ReactNode, useEffect, useState } from "react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import BarChartDashboard from "@/components/BarChart";
import ExpenseListTable from "@/components/ExpenseListTable";
import BudgetItem from "@/components/BudgetItem";
import axios from 'axios';
import { Loader as Spinner } from "lucide-react";
import CardInfo from "@/components/CardInfo";


interface ProtectProps {
  children: ReactNode;
  fallback?: ReactNode; 
}

interface Expense {
  id: number;
  name: string;
  amount: number;
  budgetId: number;
  userId: string;
  createdAt: string;
}

interface Budget {
  id: number;
  name: string;
  amount: number;
  icon: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  expenses: Expense[];
  totalSpend: number;  
  totalItem: number;   
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

const Protect = ({ children, fallback }: ProtectProps) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center">
          <Spinner className="animate-spin h-16 w-16 text-blue-500" /> 
          <p className="text-gray-500 mt-4">Loading your dashboard...</p> 
        </div>
      </div>
    );  
  } 

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return <>{children}</>;
};

function Dashboard() {
  const { user } = useUser();

  const [budgetList, setBudgetList] = useState<Budget[]>([]);
  const [incomeList, setIncomeList] = useState<Income[]>([]);
  const [expensesList, setExpensesList] = useState<Expense[]>([]);
  const [loadingBudgets, setLoadingBudgets] = useState(true);
  const [loadingIncome, setLoadingIncome] = useState(true);
  const [loadingExpenses, setLoadingExpenses] = useState(true);

  useEffect(()=>{
    if(user){
      const check =async ()=>{
        try {
          await axios.post('api/user',{userId: user.id})
          checkData(user.id);
        } catch (error) {
          console.error("Error checking/creating user data", error);
        }
      }

      check();
      checkData(user.id);
    }
  },[user]);

  const checkData = async (userId: string) => {
    setLoadingBudgets(true);
    setLoadingIncome(true);
    setLoadingExpenses(true);

    try {
      const [getExpenses, getIncome, getBudget] = await Promise.all([
        axios.get(`/api/expenses`, { params: { userId } }),
        axios.get(`/api/income`, { params: { userId } }),
        axios.get(`/api/budget`, { params: { userId } }),
      ]);

      if (getExpenses.status === 200) {
        setExpensesList(getExpenses.data);
        setLoadingExpenses(false);
      }
      if (getIncome.status === 200) {
        setIncomeList(getIncome.data);
        setLoadingIncome(false);
      }
      if (getBudget.status === 200) {
        setBudgetList(getBudget.data);
        setLoadingBudgets(false);
      }
    } catch (error) {
      console.log("Error fetching data, using static data.", error);
      setLoadingBudgets(false);
      setLoadingIncome(false);
      setLoadingExpenses(false);
    }
  };

  return (
    <div className="p-8">
      <h2 className="font-bold text-4xl">Hi, {user?.fullName} 👋</h2>
      <p className="text-gray-500">
        Here&apos;s what&apos;s happening with your money. Let&apos;s manage your expense.
      </p>

      {loadingBudgets || loadingIncome ? (
        <div className="flex items-center justify-center my-10">
          <Spinner className="animate-spin h-12 w-12 text-blue-400" />
          <p className="ml-4 text-gray-500">Loading financial data...</p>
        </div>
      ) : (
        <CardInfo budgetList={budgetList} incomeList={incomeList} expensesList={expensesList}/>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          {loadingBudgets ? (
            <div className="flex items-center justify-center h-80">
              <Spinner className="animate-spin h-12 w-12 text-blue-400" />
              <p className="ml-4 text-gray-500">Loading budget data...</p>
            </div>
          ) : (
            <BarChartDashboard budgetList={budgetList} />
          )}

          {loadingExpenses ? (
            <div className="flex items-center justify-center h-64 mt-6">
              <Spinner className="animate-spin h-12 w-12 text-blue-400" />
              <p className="ml-4 text-gray-500">Loading expenses data...</p>
            </div>
          ) : (
            <ExpenseListTable expensesList={expensesList} refreshData={() => {}} />
          )}
        </div>

        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          {loadingBudgets ? (
            [1, 2, 3, 4].map((item) => (
              <div
                className="h-[180px] w-full bg-slate-200 rounded-lg animate-pulse"
                key={item}
              ></div>
            ))
          ) : (
            budgetList.map((budget) => (
              <BudgetItem budget={budget} key={budget.id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProtectedDashboard() {
  return (
    <Protect>
      <Dashboard />
    </Protect>
  );
}
