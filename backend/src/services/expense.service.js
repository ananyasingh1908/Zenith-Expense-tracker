const supabase = require("../config/database");

// Get all expenses
async function getAllExpenses(category) {
    let query = supabase
        .from("expenses")
        .select("*")
        .order("expense_date", { ascending: false })
        .order("created_at", { ascending: false });

    if (category) {
        query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
        throw error;
    }

    return data;
}

// Get one expense
async function getExpenseById(id) {
    const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw error;
    }

    return data;
}

// Create expense
async function createExpense(expense) {
    const { data, error } = await supabase
        .from("expenses")
        .insert([expense])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

// Update expense
async function updateExpense(id, expense) {
    const { data, error } = await supabase
        .from("expenses")
        .update({
            ...expense,
            updated_at: new Date().toISOString()
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

// Delete expense
async function deleteExpense(id) {
    const { data, error } = await supabase
        .from("expenses")
        .delete()
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
}

module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense
};