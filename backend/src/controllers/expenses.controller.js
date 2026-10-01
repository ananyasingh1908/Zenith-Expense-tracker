const expenseService = require("../services/expense.service");

async function getExpenses(req, res) {
    try {
        const { category } = req.query;

        const expenses = await expenseService.getAllExpenses(category);

        res.json({
            success: true,
            count: expenses.length,
            data: expenses
        });
    } catch (error) {
        console.error("Get expenses error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch expenses",
            error: error.message
        });
    }
}

async function getExpense(req, res) {
    try {
        const expense = await expenseService.getExpenseById(req.params.id);

        res.json({
            success: true,
            data: expense
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "Expense not found",
            error: error.message
        });
    }
}

async function createExpense(req, res) {
    try {
        const {
            description,
            amount,
            category,
            expense_date,
            mood,
            notes
        } = req.body;

        if (!description || amount === undefined || !category) {
            return res.status(400).json({
                success: false,
                message: "description, amount and category are required"
            });
        }

        if (Number(amount) < 0) {
            return res.status(400).json({
                success: false,
                message: "Amount cannot be negative"
            });
        }

        const expense = await expenseService.createExpense({
            description,
            amount: Number(amount),
            category,
            expense_date:
                expense_date ||
                new Date().toISOString().split("T")[0],
            mood: mood || null,
            notes: notes || null
        });

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense
        });
    } catch (error) {
        console.error("Create expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create expense",
            error: error.message
        });
    }
}

async function updateExpense(req, res) {
    try {
        const allowedFields = [
            "description",
            "amount",
            "category",
            "expense_date",
            "mood",
            "notes"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] =
                    field === "amount"
                        ? Number(req.body[field])
                        : req.body[field];
            }
        }

        if (updates.amount !== undefined && updates.amount < 0) {
            return res.status(400).json({
                success: false,
                message: "Amount cannot be negative"
            });
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No fields provided for update"
            });
        }

        const expense = await expenseService.updateExpense(
            req.params.id,
            updates
        );

        res.json({
            success: true,
            message: "Expense updated successfully",
            data: expense
        });
    } catch (error) {
        console.error("Update expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update expense",
            error: error.message
        });
    }
}

async function deleteExpense(req, res) {
    try {
        const expense = await expenseService.deleteExpense(req.params.id);

        res.json({
            success: true,
            message: "Expense deleted successfully",
            data: expense
        });
    } catch (error) {
        console.error("Delete expense error:", error);

        res.status(404).json({
            success: false,
            message: "Expense not found",
            error: error.message
        });
    }
}

module.exports = {
    getExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense
};