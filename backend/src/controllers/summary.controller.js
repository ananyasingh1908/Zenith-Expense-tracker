const summaryService = require("../services/summary.service");

async function getMonthlyTotal(req, res) {
    try {
        const now = new Date();

        const year = Number(req.query.year) || now.getFullYear();
        const month = Number(req.query.month) || now.getMonth() + 1;

        if (month < 1 || month > 12) {
            return res.status(400).json({
                success: false,
                message: "Month must be between 1 and 12"
            });
        }

        const total = await summaryService.getMonthlyTotal(year, month);

        res.json({
            success: true,
            year,
            month,
            total
        });
    } catch (error) {
        console.error("Monthly total error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to calculate monthly total",
            error: error.message
        });
    }
}

async function getCategoryTotals(req, res) {
    try {
        const now = new Date();

        const year = Number(req.query.year) || now.getFullYear();
        const month = Number(req.query.month) || now.getMonth() + 1;

        const categoryTotals =
            await summaryService.getCategoryTotals(year, month);

        res.json({
            success: true,
            year,
            month,
            data: categoryTotals
        });
    } catch (error) {
        console.error("Category totals error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to calculate category totals",
            error: error.message
        });
    }
}

module.exports = {
    getMonthlyTotal,
    getCategoryTotals
};