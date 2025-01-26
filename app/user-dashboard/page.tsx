"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"

interface LoanRequest {
  id: string
  category: string
  subcategory: string
  amount: number
  status: "pending" | "approved" | "rejected"
}

interface Slip {
  tokenNumber: string
  date: string
  time: string
  officeLocation: string
  qrCode: string
}

export default function UserDashboard() {
  const [loanRequests, setLoanRequests] = useState<LoanRequest[]>([])
  const [slip, setSlip] = useState<Slip | null>(null)

  useEffect(() => {
    // Here you would typically fetch the loan requests from your backend
    // For now, we'll use some dummy data
    setLoanRequests([
      { id: "1", category: "Wedding", subcategory: "Valima", amount: 500000, status: "pending" },
      { id: "2", category: "Education", subcategory: "University Fees", amount: 200000, status: "approved" },
    ])
  }, [])

  const generateSlip = (loanRequestId: string) => {
    // Here you would typically fetch the slip data from your backend
    // For now, we'll use some dummy data
    setSlip({
      tokenNumber: "A123",
      date: "2023-06-15",
      time: "10:00 AM",
      officeLocation: "Saylani Welfare Head Office, Karachi",
      qrCode: "/placeholder.svg?height=200&width=200",
    })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8 ">User Dashboard</h1>
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Loan Requests</h2>
        {loanRequests.map((request) => (
          <div key={request.id} className="mb-4 p-4 border rounded-lg shadow-sm text-center">
            <p>Category: {request.category}</p>
            <p>Subcategory: {request.subcategory}</p>
            <p>Amount: PKR {request.amount}</p>
            <p>Status: {request.status}</p>
            {request.status === "approved" && (
              <button
                onClick={() => generateSlip(request.id)}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Generate Slip
              </button>
            )}
          </div>
        ))}
      </div>
      {slip && (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4">Appointment Slip</h2>
          <p>Token Number: {slip.tokenNumber}</p>
          <p>Date: {slip.date}</p>
          <p>Time: {slip.time}</p>
          <p>Office Location: {slip.officeLocation}</p>
          <img src={slip.qrCode || "/placeholder.svg"} alt="QR Code" className="mt-4" />
          <button
            onClick={() => window.print()}
            className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Print Slip
          </button>
        </div>
      )}
      <div className="mt-8">
        <Link
          href="/loan-request"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          New Loan Request
        </Link>
      </div>
    </div>
  )
}

