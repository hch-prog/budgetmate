"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseListTable from "../../../components/ExpenseListTable";
import { useUser } from '@clerk/nextjs';

interface Expense {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
}

function ExpensesScreen() {
  const [expensesList, setExpensesList] = useState<Expense[]>([]); 
  const [loading, setLoading] = useState<boolean>(true); 
  const { user } = useUser(); 
  const userId = user?.id; 

  useEffect(() => {
    if (userId) {
      getAllExpenses(userId); 
    }
  }, [userId]);


  const getAllExpenses = async (userId: string) => {
    setLoading(true); 
    try {
      const response = await axios.get(`/api/expenses`, {
        params: { userId }
      });
      const expenses: Expense[] = response.data.map((expense: any) => ({
        ...expense,
        amount: Number(expense.amount),
      }));
      setExpensesList(expenses); 
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Expenses</h2>
      
      {loading ? (
        <div className="mt-7">
          <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
            <h2 className="font-bold">Name</h2>
            <h2 className="font-bold">Amount</h2>
            <h2 className="font-bold">Date</h2>
            <div className="font-bold">Action</div>
          </div>

          {[1, 2, 3, 4, 5].map((item) => (
            <div className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2 animate-pulse" key={item}>
              <div className="h-5 bg-slate-200 rounded col-span-1"></div>
              <div className="h-5 bg-slate-200 rounded col-span-1"></div>
              <div className="h-5 bg-slate-200 rounded col-span-1"></div>
              <div className="h-5 bg-slate-200 rounded col-span-1"></div>
            </div>
          ))}
        </div>
      ) : (
        <ExpenseListTable 
          refreshData={() => userId && getAllExpenses(userId)} 
          expensesList={expensesList} 
        />
      )}
    </div>
  );
}

export default ExpensesScreen;
