import { auth } from "@/auth";
import prisma from "@/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Get current date info
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const firstDayOfLastMonth = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      1,
    );
    const lastDayOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

    // Get all expenses
    const allExpenses = await prisma.expense.findMany({
      where: { userId: user.id },
    });

    // Calculate total expenses
    const totalExpenses = allExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    // Calculate monthly expenses
    const monthlyExpenses = allExpenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= firstDayOfMonth && expenseDate <= lastDayOfMonth;
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate last month's expenses
    const lastMonthExpenses = allExpenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate >= firstDayOfLastMonth &&
          expenseDate <= lastDayOfLastMonth
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate monthly change percentage
    const monthlyChange =
      lastMonthExpenses === 0
        ? 0
        : ((monthlyExpenses - lastMonthExpenses) / lastMonthExpenses) * 100;

    // Calculate average expense
    const averageExpense =
      allExpenses.length === 0 ? 0 : totalExpenses / allExpenses.length;

    return NextResponse.json({
      totalExpenses,
      monthlyExpenses,
      averageExpense,
      monthlyChange,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch expense stats" },
      { status: 500 },
    );
  }
}
