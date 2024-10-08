import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface BudgetRequestBody {
  name: string;
  amount: number;
  icon?: string;
  userId: string;
}

export async function POST(req: Request) {
  try {
    const body: BudgetRequestBody = await req.json();
    const { name, amount, icon, userId } = body;

    if (!name || typeof name !== "string") {
      return NextResponse.json({ error: "Invalid or missing name" }, { status: 400 });
    }

    if (amount == null || typeof amount !== "number") {
      return NextResponse.json({ error: "Invalid or missing amount" }, { status: 400 });
    }

    if (!userId || typeof userId !== "string") {
      return NextResponse.json({ error: "Invalid or missing userId" }, { status: 400 });
    }

    const makeBudget = await prisma.budget.create({
      data: {
        name,
        amount,
        icon: icon ?? "default-icon",
        userId,
      },
    });

    return NextResponse.json(makeBudget, { status: 201 });
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: "Error occurred while creating budget" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const budgets = await prisma.budget.findMany({
      include: {
        expenses: true,
      },
    });

    const updatedBudgets = budgets.map((budget) => {
      const totalSpend = budget.expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
      );
      return {
        ...budget,
        totalSpend,
      };
    });

    return NextResponse.json(updatedBudgets, { status: 200 });
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json({ error: "Error occurred while fetching budgets" }, { status: 500 });
  }
}
