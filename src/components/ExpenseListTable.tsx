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
  const [editId, setEditId] = useState<number | null>(null); // Track which expense is being edited
  const [editData, setEditData] = useState<Partial<Expense>>({}); // Track the edited values

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
    setEditData(expense); // Set initial edit data
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.name === 'amount' ? Number(e.target.value) : e.target.value, // Convert amount to number
    });
  };
  

  const saveExpense = async () => {
    try {
      const result = await axios.put(`/api/expenses?id=${editId}`, editData);
      if (result.status === 200) {
        toast("Expense Updated!");
        setEditId(null); // Exit edit mode
        refreshData(); // Refresh data after saving
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
      <div className="grid grid-cols-4 rounded-tl-xl rounded-tr-xl bg-slate-200 p-2 mt-3">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <div className="font-bold">Action</div>
      </div>
      {expensesList.map((expense) => (
        <div className="grid grid-cols-4 bg-slate-50 rounded-bl-xl rounded-br-xl p-2" key={expense.id}>
          {editId === expense.id ? (
            // Editing mode: render input fields
            <>
              <input
                type="text"
                name="name"
                value={editData.name ?? ''}
                onChange={handleEditChange}
                className="border p-1"
              />
              <input
                type="text"
                name="amount"
                value={editData.amount ?? ''}
                onChange={handleEditChange}
                className="border p-1"
              />
              <input
                type="text"
                name="createdAt"
                value={editData.createdAt ?? ''}
                onChange={handleEditChange}
                className="border p-1"
              />
              <div className="flex justify-center space-x-4">
                <button onClick={saveExpense} className="text-green-500 cursor-pointer">
                  Save
                </button>
                <button onClick={() => setEditId(null)} className="text-gray-500 cursor-pointer">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            // Display mode: render text
            <>
              <h2>{expense.name}</h2>
              <h2>{expense.amount}</h2>
              <h2>{formatDate(expense.createdAt)}</h2>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => deleteExpense(expense)}
                  className="text-red-500 cursor-pointer"
                  aria-label="Delete Expense"
                >
                  Delete
                </button>
                <button
                  onClick={() => startEditing(expense)}
                  className="text-gray-500 cursor-pointer"
                  aria-label="Edit Expense"
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


