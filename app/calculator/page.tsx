"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"

interface LoanDetails {
  category: string
  subcategory: string
  initialDeposit: number
  loanPeriod: number
}

interface LoanBreakdown {
  totalLoan: number
  monthlyPayment: number
}

export default function Calculator() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    category: "",
    subcategory: "",
    initialDeposit: 0,
    loanPeriod: 0,
  })
  const [loanBreakdown, setLoanBreakdown] = useState<LoanBreakdown | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLoanDetails((prev) => ({ ...prev, [name]: value }))
  }

  const calculateLoan = () => {
    const totalLoan = loanDetails.initialDeposit * 2 // Example calculation
    const monthlyPayment = totalLoan / (loanDetails.loanPeriod * 12)
    setLoanBreakdown({ totalLoan, monthlyPayment })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Loan Calculator</h1>
      <div className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Loan Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={loanDetails.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="wedding">Wedding Loans</option>
            <option value="home">Home Construction Loans</option>
            <option value="business">Business Startup Loans</option>
            <option value="education">Education Loans</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
            Loan Subcategory
          </label>
          <select
            id="subcategory"
            name="subcategory"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={loanDetails.subcategory}
            onChange={handleInputChange}
          >
            <option value="">Select a subcategory</option>
            {/* Add subcategories based on selected category */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700">
            Initial Deposit (PKR)
          </label>
          <input
            type="number"
            id="initialDeposit"
            name="initialDeposit"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={loanDetails.initialDeposit}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="loanPeriod" className="block text-sm font-medium text-gray-700">
            Loan Period (years)
          </label>
          <input
            type="number"
            id="loanPeriod"
            name="loanPeriod"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={loanDetails.loanPeriod}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={calculateLoan}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Calculate
        </button>
      </div>
      {loanBreakdown && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Loan Breakdown</h2>
          <p>Total Loan: PKR {loanBreakdown.totalLoan.toFixed(2)}</p>
          <p>Monthly Payment: PKR {loanBreakdown.monthlyPayment.toFixed(2)}</p>
        </div>
      )}
      <div className="mt-8">
        <Link
          href="/register"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Proceed to Registration
        </Link>
      </div>
    </div>
  )
}

