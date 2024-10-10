import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, amount, createdAt, userId } = body;

    if (!name || !amount || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const createExpense = await prisma.expense.create({
      data: {
        name,
        amount,
        createdAt,
        userId,
      },
    });

    return NextResponse.json(createExpense, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while creating expense" },
      { status: 400 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required in the query params" },
        { status: 400 }
      );
    }

    const getExpense = await prisma.expense.findMany({
      where: { userId },
    });

    return NextResponse.json(getExpense, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while fetching expenses" },
      { status: 400 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const expenseId = url.searchParams.get("id");

    if (!expenseId) {
      return NextResponse.json(
        { error: "Expense Id is required" },
        { status: 400 }
      );
    }

    await prisma.expense.delete({
      where: { id: parseInt(expenseId) },
    });

    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while deleting expense" },
      { status: 400 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const expenseId = url.searchParams.get("id");

    const body = await req.json();
    const { name, amount, createdAt } = body;

    if (!expenseId) {
      return NextResponse.json(
        { error: "Expense ID is required" },
        { status: 400 }
      );
    }

    const expenseUpdated = await prisma.expense.update({
      where: { id: parseInt(expenseId) },
      data: { name, amount, createdAt },
    });

    return NextResponse.json(
      { message: "Expense updated successfully", data: expenseUpdated },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error occurred while updating expense" },
      { status: 500 }
    );
  }
}
