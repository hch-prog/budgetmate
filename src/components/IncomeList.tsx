"use client";
import React, { useEffect, useState } from "react";
import CreateIncomes from "./CreateIncomes";
import { useUser } from "@clerk/nextjs";
import IncomeItem from "./IncomeItem";
import axios from "axios";

function IncomeList() {
  const [incomelist, setIncomelist] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      getIncomelist();
    }
  }, [user]);

  const getIncomelist = async () => {
    const response = await axios.get(`/api/income`);
    setIncomelist(response.data);
  };

  return (
    <div className="mt-7">
      <div
        className="grid grid-cols-1
        md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        <CreateIncomes refreshData={() => getIncomelist()} />
        {incomelist?.length > 0
          ? incomelist.map((income, index) => (
              <IncomeItem
                income={income}
                key={index}
                refreshData={() => getIncomelist()} // Pass the refresh function to IncomeItem
              />
            ))
          : [1, 2, 3, 4, 5].map((item, index) => (
              <div
                key={index}
                className="w-full bg-slate-200 rounded-lg
        h-[150px] animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default IncomeList;
