"use client";
import React, { useEffect, useState } from "react";
import CreateBudget from "./CreateBudget";
import { useUser } from "@clerk/nextjs";
import BudgetItem from "./BudgetItem";
import axios from "axios";

function BudgetList() {
  const [budgetList, setBudgetList] = useState([]);
  const { user } = useUser();

  // Fetch budget list on user change
  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  // Fetch the budget list
  const getBudgetList = async () => {
    try {
      const result = await axios.get(`/api/budget`);
      setBudgetList(result.data);
    } catch (error) {
      console.error("Error fetching budget list:", error);
    }
  };

  return (
    <div className="mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Pass refreshData to CreateBudget to refresh the list after adding */}
        <CreateBudget refreshData={() => getBudgetList()} />

        {/* Check if budgetList has data and map over it */}
        {budgetList?.length > 0
          ? budgetList.map((budget, index) => (
              <BudgetItem
                budget={budget}
                key={index}
                refreshData={() => getBudgetList()} // Pass refreshData to BudgetItem for refreshing after edit or delete
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default BudgetList;
