"use client"

import type React from "react"
import { useState, useEffect } from "react"

interface Application {
  id: string
  category: string
  subcategory: string
  amount: number
  status: "pending" | "approved" | "rejected"
  tokenNumber?: string
  guarantor1: {
    name: string
    email: string
    location: string
    cnic: string
  }
  guarantor2: {
    name: string
    email: string
    location: string
    cnic: string
  }
}

export default function AdminDashboard() {
  const [applications, setApplications] = useState<Application[]>([])
  const [filter, setFilter] = useState({ city: "", country: "" })

  useEffect(() => {
    // Here you would typically fetch the applications from your backend
    // For now, we'll use some dummy data
    setApplications([
      {
        id: "1",
        category: "Wedding",
        subcategory: "Valima",
        amount: 500000,
        status: "pending",
        guarantor1: { name: "John Doe", email: "john@example.com", location: "Karachi", cnic: "1234567890123" },
        guarantor2: { name: "Jane Doe", email: "jane@example.com", location: "Lahore", cnic: "9876543210987" },
      },
      {
        id: "2",
        category: "Education",
        subcategory: "University Fees",
        amount: 100000,
        status: "approved",
        tokenNumber: "A123",
        guarantor1: { name: "Alice Smith", email: "alice@example.com", location: "Islamabad", cnic: "2345678901234" },
        guarantor2: { name: "Bob Smith", email: "bob@example.com", location: "Rawalpindi", cnic: "8765432109876" },
      },
    ])
  }, [])

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilter((prev) => ({ ...prev, [name]: value }))
  }

  const updateApplicationStatus = (applicationId: string, status: "pending" | "approved" | "rejected") => {
    setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, status } : app)))
  }

  const addTokenNumber = (applicationId: string, tokenNumber: string) => {
    setApplications((prev) => prev.map((app) => (app.id === applicationId ? { ...app, tokenNumber } : app)))
  }

  const filteredApplications = applications.filter(
    (app) =>
      (filter.city === "" ||
        app.guarantor1.location.toLowerCase().includes(filter.city.toLowerCase()) ||
        app.guarantor2.location.toLowerCase().includes(filter.city.toLowerCase())) &&
      (filter.country === "" ||
        app.guarantor1.location.toLowerCase().includes(filter.country.toLowerCase()) ||
        app.guarantor2.location.toLowerCase().includes(filter.country.toLowerCase())),
  )

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="Filter by City"
            className="px-4 py-2 border rounded-md"
            value={filter.city}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="country"
            placeholder="Filter by Country"
            className="px-4 py-2 border rounded-md"
            value={filter.country}
            onChange={handleFilterChange}
          />
        </div>
        {filteredApplications.map((app) => (
          <div key={app.id} className="mb-8 p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Application {app.id}</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Category:</strong> {app.category}
                </p>
                <p>
                  <strong>Subcategory:</strong> {app.subcategory}
                </p>
                <p>
                  <strong>Amount:</strong> PKR {app.amount}
                </p>
                <p>
                  <strong>Status:</strong> {app.status}
                </p>
                {app.tokenNumber && (
                  <p>
                    <strong>Token Number:</strong> {app.tokenNumber}
                  </p>
                )}
              </div>
              <div>
                <select
                  value={app.status}
                  onChange={(e) =>
                    updateApplicationStatus(app.id, e.target.value as "pending" | "approved" | "rejected")
                  }
                  className="mb-4 px-4 py-2 border rounded-md"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                {app.status === "approved" && !app.tokenNumber && (
                  <input
                    type="text"
                    placeholder="Add Token Number"
                    className="px-4 py-2 border rounded-md"
                    onBlur={(e) => addTokenNumber(app.id, e.target.value)}
                  />
                )}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Guarantor 1</h3>
                <p>
                  <strong>Name:</strong> {app.guarantor1.name}
                </p>
                <p>
                  <strong>Email:</strong> {app.guarantor1.email}
                </p>
                <p>
                  <strong>Location:</strong> {app.guarantor1.location}
                </p>
                <p>
                  <strong>CNIC:</strong> {app.guarantor1.cnic}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Guarantor 2</h3>
                <p>
                  <strong>Name:</strong> {app.guarantor2.name}
                </p>
                <p>
                  <strong>Email:</strong> {app.guarantor2.email}
                </p>
                <p>
                  <strong>Location:</strong> {app.guarantor2.location}
                </p>
                <p>
                  <strong>CNIC:</strong> {app.guarantor2.cnic}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

