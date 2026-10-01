require("dotenv").config();

const express = require("express");
const cors = require("cors");

const supabase = require("./config/database");
const expenseRoutes = require("./routes/expenses.routes");
const summaryRoutes = require("./routes/summary.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Expense APIs
app.use("/api/expenses", expenseRoutes);

// Summary APIs
app.use("/api/summary", summaryRoutes);

const PORT = process.env.PORT || 5000;

// Home
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "KHARCHA Backend is running"
    });
});

// Backend health
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Backend is healthy"
    });
});

// Database health
app.get("/api/health/db", async (req, res) => {
    try {
        const { data, error } = await supabase
            .from("expenses")
            .select("id")
            .limit(1);

        if (error) {
            console.error("Supabase error:", error);

            return res.status(500).json({
                success: false,
                message: "Database connection failed",
                error: error.message
            });
        }

        res.json({
            success: true,
            message: "Database connected successfully",
            recordsFound: data.length
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`KHARCHA Backend running on http://localhost:${PORT}`);
});