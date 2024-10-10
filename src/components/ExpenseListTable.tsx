import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import CreateExpense from './CreateExpense';

interface Expense {
  id: number;
  name: string;
  amount: number;
  createdAt: string;
}

interface ExpenseListTableProps {
  expensesList: Expense[];
  refreshData: () => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const ExpenseListTable: React.FC<ExpenseListTableProps> = ({ expensesList, refreshData }) => {
  const [editId, setEditId] = useState<number | null>(null); 
  const [editData, setEditData] = useState<Partial<Expense>>({}); 

  const deleteExpense = async (expense: Expense) => {
    try {
      const result = await axios.delete(`/api/expenses?id=${expense.id}`);
      if (result.status === 200) {
        toast("Expense Deleted!");
        refreshData();
      }
    } catch (error) {
      console.error("Error deleting expense:", error);
      toast("Failed to delete expense.");
    }
  };

  const startEditing = (expense: Expense) => {
    setEditId(expense.id);
    setEditData(expense); 
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.name === 'amount' ? Number(e.target.value) : e.target.value, 
    });
  };

  const saveExpense = async () => {
    try {
      const result = await axios.put(`/api/expenses?id=${editId}`, editData);
      if (result.status === 200) {
        toast("Expense Updated!");
        setEditId(null); 
        refreshData(); 
      }
    } catch (error) {
      console.error("Error updating expense:", error);
      toast("Failed to update expense.");
    }
  };

  return (
    <div className="mt-3">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Latest Expenses</h2>
        <CreateExpense />
      </div>

    
      <div className="grid grid-cols-4 gap-4 bg-slate-200 p-3 mt-3 rounded-t-lg">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold text-center">Actions</h2>
      </div>

     
      {expensesList.map((expense) => (
        <div className="grid grid-cols-4 gap-4 bg-white p-3 border-b last:rounded-b-lg" key={expense.id}>
          {editId === expense.id ? (
            <>
              <input
                type="text"
                name="name"
                value={editData.name ?? ''}
                onChange={handleEditChange}
                className="border p-1 rounded"
              />
              <input
                type="text"
                name="amount"
                value={editData.amount ?? ''}
                onChange={handleEditChange}
                className="border p-1 rounded"
              />
              <input
                type="text"
                name="createdAt"
                value={editData.createdAt ?? ''}
                onChange={handleEditChange}
                className="border p-1 rounded"
              />
              <div className="flex justify-center space-x-2">
                <button
                  onClick={saveExpense}
                  className="text-green-600 hover:text-green-800 cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
           
            <>
              <span>{expense.name}</span>
              <span>${expense.amount}</span>
              <span>{formatDate(expense.createdAt)}</span>
              <div className="flex justify-center space-x-2">
                <button
                  onClick={() => deleteExpense(expense)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(expense)}
                  className="text-gray-600 hover:text-gray-800 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpenseListTable;
