import React, { useState, useEffect } from "react"
import axios from "axios"

const UserDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([])
  const [slip, setSlip] = useState(null)

  useEffect(() => {
    fetchLoanRequests()
  }, [])

  const fetchLoanRequests = async () => {
    try {
      const response = await axios.get("/api/user/loan-requests")
      setLoanRequests(response.data.loanRequests)
    } catch (error) {
      console.error("Failed to fetch loan requests:", error)
    }
  }

  const generateSlip = async (loanRequestId) => {
    try {
      const response = await axios.get(`/api/user/generate-slip/${loanRequestId}`)
      setSlip(response.data.slip)
    } catch (error) {
      console.error("Failed to generate slip:", error)
    }
  }

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <h3>Your Loan Requests</h3>
      {loanRequests.map((request) => (
        <div key={request.id} className="loan-request">
          <p>Category: {request.category}</p>
          <p>Subcategory: {request.subcategory}</p>
          <p>Amount: PKR {request.amount}</p>
          <p>Status: {request.status}</p>
          {request.status === "approved" && <button onClick={() => generateSlip(request.id)}>Generate Slip</button>}
        </div>
      ))}
      {slip && (
        <div className="slip">
          <h3>Appointment Slip</h3>
          <p>Token Number: {slip.tokenNumber}</p>
          <p>Date: {slip.date}</p>
          <p>Time: {slip.time}</p>
          <p>Office Location: {slip.officeLocation}</p>
          <img src={slip.qrCode || "/placeholder.svg"} alt="QR Code" />
          <button onClick={() => window.print()}>Print Slip</button>
        </div>
      )}
    </div>
  )
}

export default UserDashboard

