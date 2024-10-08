"use client";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SideNav from "../../components/SideNav";
import DashboardHeader from "../../components/DashboardHeader";
import { useUser } from "@clerk/nextjs";

function DashboardLayout({ children }) {
  const { user } = useUser();
  
  useEffect(() => {
    if (user) {
      checkUserBudgets();
    }
  }, [user]);

  const checkUserBudgets = async () => {
   
  };

  return (
    <div>
      <div className="fixed md:w-64 hidden md:block">
        <SideNav />
      </div>
      <div className="md:ml-64">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}


DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
