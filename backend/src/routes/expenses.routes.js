const express = require("express");

const {
    getExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense
} = require("../controllers/expenses.controller");

const router = express.Router();

router.get("/", getExpenses);
router.get("/:id", getExpense);
router.post("/", createExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);

module.exports = router;