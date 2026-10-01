const supabase = require("../config/database");

// Get total spending for a month
async function getMonthlyTotal(year, month) {
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

    const nextMonth = new Date(year, month, 1);
    const endDate = nextMonth.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("expenses")
        .select("amount")
        .gte("expense_date", startDate)
        .lt("expense_date", endDate);

    if (error) {
        throw error;
    }

    const total = data.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    );

    return total;
}

// Get spending grouped by category
async function getCategoryTotals(year, month) {
    const startDate = `${year}-${String(month).padStart(2, "0")}-01`;

    const nextMonth = new Date(year, month, 1);
    const endDate = nextMonth.toISOString().split("T")[0];

    const { data, error } = await supabase
        .from("expenses")
        .select("category, amount")
        .gte("expense_date", startDate)
        .lt("expense_date", endDate);

    if (error) {
        throw error;
    }

    const categoryTotals = {};

    for (const expense of data) {
        const category = expense.category;

        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += Number(expense.amount);
    }

    return categoryTotals;
}

module.exports = {
    getMonthlyTotal,
    getCategoryTotals
};
