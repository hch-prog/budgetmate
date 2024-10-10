"use client";
import React, { useState, useEffect } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import axios from "axios";

interface Budget {
  id: number;
  name: string;
  amount: number;
  icon: string;
  totalItem: number;
}

interface EditBudgetProps {
  budget: Budget;
  refreshData: () => void;
}

function EditBudget({ budget, refreshData }: EditBudgetProps) {
  const [emojiIcon, setEmojiIcon] = useState(budget.icon);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const [name, setName] = useState(budget.name);
  const [amount, setAmount] = useState(budget.amount);

  const { user } = useUser();
  const userId = user?.id;

  const onEditBudget = async () => {
    try {
      const response = await axios.put("/api/budget", {
        id: budget.id,
        name,
        amount,
        icon: emojiIcon,
        userId,
      });

      if (response.status === 200) {
        refreshData();
        toast("Income Source Updated!");
      }
    } catch (error) {
      console.error("Error updating income source:", error);
      toast("Failed to update income source.");
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => refreshData()}>
      <DialogContent className="bg-white bg-opacity-95 backdrop-blur-md rounded-lg shadow-lg relative">
        <DialogHeader>
          <DialogTitle className="text-black">Edit Budget Source</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                className="text-lg"
                onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
              >
                {emojiIcon}
              </Button>
              {openEmojiPicker && (
                <div className="absolute z-20 mt-2">
                  <EmojiPicker
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
              )}
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Source Name</h2>
                <Input
                  placeholder={budget.name} // Show current budget name
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-2">
                <h2 className="text-black font-medium my-1">Monthly Amount</h2>
                <Input
                  type="number"
                  placeholder={String(budget.amount)} // Show current budget amount
                  value={String(amount)}
                  onChange={(e) => setAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              disabled={!(name && amount)}
              onClick={onEditBudget}
              className="mt-5 w-full rounded-full"
            >
              Update Income Source
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBudget;
