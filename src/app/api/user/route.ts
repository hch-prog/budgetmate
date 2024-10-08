import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
      const { userId } = await req.json();
  
     
      let user = await prisma.user.findUnique({ where: { uuid: userId } });
  
      
      if (!user) {
        user = await prisma.user.create({
          data: {
            uuid: userId, 
          },
        });

        const expenses = await prisma.expense.createMany({
            data: [
              { name: "Grocery Shopping", amount: 120, userId: userId },
              { name: "Rent Payment", amount: 1200, userId: userId },
              { name: "Movie Tickets", amount: 30, userId: userId },
            ],
          });
      
       
          const budgets = await prisma.budget.createMany({
            data: [
              { name: "Groceries", amount: 500, icon: "🛒", userId: userId },
              { name: "Rent", amount: 1200, icon: "🏠", userId: userId },
              { name: "Entertainment", amount: 200, icon: "🎮", userId: userId },
            ],
          });
      
         
          const incomes = await prisma.income.createMany({
            data: [
              { name: "Salary", amount: 3000, icon: "💼", userId: userId },
              { name: "Freelancing", amount: 1500, icon: "🖥️", userId: userId },
              { name: "Investments", amount: 400, icon: "📈", userId: userId },
            ],
          });
      
          return NextResponse.json(
            {
              message: "Created default budgets, incomes, and expenses.",
              budgets,
              incomes,
              expenses,
            },
            { status: 201 }
          );
      }
      
    } catch (error) {
      console.error("Error in POST request:", error);
      return NextResponse.json(
        { error: "An error occurred while processing the request." },
        { status: 500 }
      );
    }
  }
  
