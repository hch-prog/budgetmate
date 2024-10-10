import React, { useState } from "react";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { toast } from "sonner";
import EditBudget from "./EditBudget";

interface BudgetItemProps {
  budget: {
    id: number;
    name: string;
    amount: number;
    icon: string;
    totalSpend: number; 
    totalItem: number;
  };
  refreshData: () => void; 
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget, refreshData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const calculateProgressPerc = () => {
    const perc = (budget.totalSpend / budget.amount) * 100;
    return perc > 100 ? 100 : perc.toFixed(2);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/budget?id=${budget.id}`);
      toast("Budget deleted!");
      refreshData();
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast("Failed to delete budget.");
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
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Items</h2>
          </div>
        </div>
        <h2 className="font-bold text-primary text-lg">${budget.amount}</h2>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs text-slate-400">${budget.totalSpend} Spent</h2>
          <h2 className="text-xs text-slate-400">
            ${budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>
        <div className="w-full bg-slate-300 h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full"
            style={{
              width: `${calculateProgressPerc()}%`,
            }}
          ></div>
        </div>
      </div>

      {isHovered && (
        <div className="absolute top-3 right-3 flex gap-2">
          <PencilSquareIcon
            className="h-6 w-6 text-gray-500 hover:text-blue-500 cursor-pointer"
            onClick={() => setIsEditOpen(true)}
          />
          <TrashIcon
            className="h-6 w-6 text-gray-500 hover:text-red-500 cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      )}

      {isEditOpen && (
        <EditBudget
          budget={budget}
          refreshData={() => {
            refreshData();
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default BudgetItem;
