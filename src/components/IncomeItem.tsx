import React, { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import EditIncomes from "./EditIncomes"; // Import your EditIncomes component
import axios from "axios";
import { toast } from "sonner";

interface Income {
  id: number;
  name: string;
  amount: number;
  totalSpend: number;
  icon: string;
  totalItem: number;
}

function IncomeItem({ income, refreshData }: { income: Income, refreshData: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false); // State to control dialog visibility

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/income?id=${income.id}`);
      toast("Income Deleted!");
      refreshData(); 
    } catch (error) {
      console.error("Error deleting income:", error);
      toast("Failed to delete income.");
    }
  };

  return (
    <div
      className="p-5 border rounded-2xl hover:shadow-md cursor-pointer h-[170px] relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <h2 className="text-2xl p-3 px-4 bg-slate-100 rounded-full">
            {income?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{income.name}</h2>
            <h2 className="text-sm text-gray-500">{income.totalItem} Item</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${income.amount}</h2>
      </div>

      {/* Icons displayed on hover */}
      {isHovered && (
        <div className="absolute top-3 right-3 flex gap-2">
          {/* Edit icon */}
          <PencilSquareIcon
            className="h-6 w-6 text-gray-500 hover:text-blue-500 cursor-pointer"
            onClick={() => setIsEditOpen(true)} // Open the edit dialog
          />
          {/* Trash icon */}
          <TrashIcon
            className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={handleDelete} // Trigger delete on click
          />
        </div>
      )}

      {/* Edit dialog */}
      {isEditOpen && (
        <EditIncomes
          income={income} // Pass the income data to the EditIncomes component
          refreshData={() => {
            refreshData(); // Call the parent refresh function
            setIsEditOpen(false); // Close the dialog after the edit is complete
          }}
        />
      )}
    </div>
  );
}

export default IncomeItem;
