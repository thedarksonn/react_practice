const ExpenseSchema = require("../models/expenseModel")


exports.addExpense = async (req, res) => {

    const { title, amount, category, description, date } = req.body

    const expense = ExpenseSchema({ title, amount, category, description, date, })

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'all fields are erquired' })
        }
        if (amount <= 0 || !amount === 'number') {
            return res.status(400).json({ message: 'amount must be a possitive number' })
        }
        await expense.save()
        res.status(200).json({ message: 'expense added' })

    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}


exports.getExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseSchema.find().sort({ createdAt: -1 })
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
}


exports.deleteExpense = async (req, res) => {
    const { id } = req.params;

    ExpenseSchema.findByIdAndDelete(id)
        .then((expense) => {
            res.status(200).json({ message: 'expense deleted' })
        })
        .catch((err) => {
            res.status(500).json({ message: 'server error' })
        })
}