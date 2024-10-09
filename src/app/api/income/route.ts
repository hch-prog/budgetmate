import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, amount, icon, userId } = body;


    if (!name || !amount || !userId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }


    const newIncome = await prisma.income.create({
      data: {
        name,
        amount,
        icon,
        userId,
      },
    });

    return NextResponse.json(newIncome, { status: 200 });
  } catch (error) {

    console.error("Detailed error:", error);
    return NextResponse.json(
      { error: "Error Occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const allIncome = await prisma.income.findMany();
    return NextResponse.json(allIncome, { status: 200 })
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { error: "Error Occured" },
      { status: 400 }
    )
  }
}



export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, amount, icon, userId } = body;

   
    if (!id || !name || !amount || !icon || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedIncome = await prisma.income.update({
      where: { id },
      data: { name, amount, icon, userId },
    });

    return NextResponse.json(updatedIncome, { status: 200 });

  } catch (error) {
    console.error("Error updating income:", error);

    return NextResponse.json(
      { error: "Error occurred while updating income" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
   
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

  
    if (!id) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

   
    const deleteIncome = await prisma.income.delete({ where: { id: Number(id) } });

  
    return NextResponse.json(deleteIncome, { status: 200 });

  } catch (error) {
    console.error("Error deleting income:", error);
    return NextResponse.json(
      { error: "Error occurred while deleting income" },
      { status: 500 }
    );
  }
}

