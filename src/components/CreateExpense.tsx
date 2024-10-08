"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

function CreateExpense() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const { user } = useUser();
  const userId = user?.id;

  const onCreateExpense = async () => {
    try {
      const result = await axios.post(`/api/expenses`, {
        name,
        amount,
        userId,
      });

      if (result.status === 200) {
        toast("New Expense Created!");
      }
    } catch (error) {
      console.error("Error creating expense:", error);
      toast("Failed to create expense.");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <h2 className="text-lg cursor-pointer text-blue-600 hover:underline">
            Create New Expense +
          </h2>
        </DialogTrigger>
        <DialogContent className="bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-lg relative">
          <DialogHeader>
            <DialogTitle>Create New Expense</DialogTitle>
            <DialogDescription>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Name</h2>
                <Input
                  placeholder="e.g. Car"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Amount</h2>
                <Input
                  type="number"
                  placeholder="e.g. 100"
                  onChange={(e) => setAmount(Number(e.target.value))}
                  value={amount}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                onClick={onCreateExpense}
                className="mt-5 w-full rounded-full"
              >
                Create Expense
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateExpense;
