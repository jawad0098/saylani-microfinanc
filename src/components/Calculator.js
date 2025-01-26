import React, { useState } from "react"
import { Link } from "react-router-dom"

const Calculator = () => {
  const [category, setCategory] = useState("")
  const [subcategory, setSubcategory] = useState("")
  const [initialDeposit, setInitialDeposit] = useState(0)
  const [loanPeriod, setLoanPeriod] = useState(0)
  const [loanBreakdown, setLoanBreakdown] = useState(null)

  const calculateLoan = () => {
    // This is a simplified calculation. You may want to implement a more complex one based on your specific requirements.
    const totalLoan = initialDeposit * 2 // Example: loan is twice the initial deposit
    const monthlyPayment = totalLoan / (loanPeriod * 12)

    setLoanBreakdown({
      totalLoan,
      monthlyPayment,
    })
  }

  const getSubcategories = (category) => {
    switch (category) {
      case "wedding":
        return ["Valima", "Furniture", "Valima Food", "Jahez"]
      case "home":
        return ["Land Purchase", "Construction", "Renovation"]
      case "business":
        return ["Equipment", "Inventory", "Marketing"]
      case "education":
        return ["Tuition", "Books", "Accommodation"]
      default:
        return []
    }
  }

  return (
    <div className="calculator">
      <h2>Loan Calculator</h2>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Category</option>
        <option value="wedding">Wedding Loans</option>
        <option value="home">Home Construction Loans</option>
        <option value="business">Business Startup Loans</option>
        <option value="education">Education Loans</option>
      </select>
      <select
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        disabled={!category}
      >
        <option value="">Select Subcategory</option>
        {getSubcategories(category).map((sub) => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>
      <input
        type="number"
        value={initialDeposit}
        onChange={(e) => setInitialDeposit(Number(e.target.value))}
        placeholder="Initial Deposit"
      />
      <input
        type="number"
        value={loanPeriod}
        onChange={(e) => setLoanPeriod(Number(e.target.value))}
        placeholder="Loan Period (in years)"
      />
      <button onClick={calculateLoan}>Calculate</button>
      {loanBreakdown && (
        <div className="loan-breakdown">
          <h3>Loan Breakdown</h3>
          <p>Total Loan: PKR {loanBreakdown.totalLoan}</p>
          <p>Monthly Payment: PKR {loanBreakdown.monthlyPayment.toFixed(2)}</p>
        </div>
      )}
      <Link to="/register">
        <button>Proceed</button>
      </Link>
    </div>
  )
}

export default Calculator

