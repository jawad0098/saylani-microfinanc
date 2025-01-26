import React from "react"
import { Link } from "react-router-dom"

const LandingPage = () => {
  const loanCategories = [
    {
      name: "Wedding Loans",
      subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
      maxLoan: "5 Lakh",
      period: "3 years",
    },
    {
      name: "Home Construction Loans",
      subcategories: ["Structure", "Finishing", "Loan"],
      maxLoan: "10 Lakh",
      period: "5 years",
    },
    {
      name: "Business Startup Loans",
      subcategories: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
      maxLoan: "10 Lakh",
      period: "5 years",
    },
    {
      name: "Education Loans",
      subcategories: ["University Fees", "Child Fees Loan"],
      maxLoan: "Based on requirement",
      period: "4 years",
    },
  ]

  return (
    <div className="landing-page">
      <h1>Saylani Microfinance App</h1>
      <h2>Loan Categories</h2>
      {loanCategories.map((category, index) => (
        <div key={index} className="loan-category">
          <h3>{category.name}</h3>
          <p>Subcategories: {category.subcategories.join(", ")}</p>
          <p>Maximum loan: {category.maxLoan}</p>
          <p>Loan period: {category.period}</p>
        </div>
      ))}
      <Link to="/calculator">
        <button>Use Loan Calculator</button>
      </Link>
    </div>
  )
}

export default LandingPage

