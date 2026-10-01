const express = require("express");

const {
    getMonthlyTotal,
    getCategoryTotals
} = require("../controllers/summary.controller");

const router = express.Router();

router.get("/monthly", getMonthlyTotal);
router.get("/categories", getCategoryTotals);

module.exports = router;