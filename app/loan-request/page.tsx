"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface LoanDetails {
  category: string
  subcategory: string
  amount: number
  period: number
}

interface Guarantor {
  name: string
  email: string
  location: string
  cnic: string
}

interface PersonalInfo {
  address: string
  phoneNumber: string
}

export default function LoanRequestForm() {
  const [loanDetails, setLoanDetails] = useState<LoanDetails>({
    category: "",
    subcategory: "",
    amount: 0,
    period: 0,
  })
  const [guarantor1, setGuarantor1] = useState<Guarantor>({
    name: "",
    email: "",
    location: "",
    cnic: "",
  })
  const [guarantor2, setGuarantor2] = useState<Guarantor>({
    name: "",
    email: "",
    location: "",
    cnic: "",
  })
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    address: "",
    phoneNumber: "",
  })
  const [documents, setDocuments] = useState({
    statementFile: null as File | null,
    salarySheetFile: null as File | null,
  })

  const router = useRouter()

  const handleLoanDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setLoanDetails((prev) => ({ ...prev, [name]: value }))
  }

  const handleGuarantorChange = (guarantorNumber: 1 | 2, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (guarantorNumber === 1) {
      setGuarantor1((prev) => ({ ...prev, [name]: value }))
    } else {
      setGuarantor2((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files) {
      setDocuments((prev) => ({ ...prev, [name]: files[0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Loan request data:", { loanDetails, guarantor1, guarantor2, personalInfo, documents })
    // For now, we'll just redirect to the user dashboard
    router.push("/user-dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Loan Request Form</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Loan Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Loan Category
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={loanDetails.category}
                onChange={handleLoanDetailsChange}
                required
              >
                <option value="">Select a category</option>
                <option value="wedding">Wedding Loans</option>
                <option value="home">Home Construction Loans</option>
                <option value="business">Business Startup Loans</option>
                <option value="education">Education Loans</option>
              </select>
            </div>
            <div>
              <label htmlFor="subcategory" className="block text-sm font-medium text-gray-700">
                Loan Subcategory
              </label>
              <select
                id="subcategory"
                name="subcategory"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={loanDetails.subcategory}
                onChange={handleLoanDetailsChange}
                required
              >
                <option value="">Select a subcategory</option>
                {/* Add subcategories based on selected category */}
              </select>
            </div>
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Loan Amount (PKR)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={loanDetails.amount}
                onChange={handleLoanDetailsChange}
                required
              />
            </div>
            <div>
              <label htmlFor="period" className="block text-sm font-medium text-gray-700">
                Loan Period (years)
              </label>
              <input
                type="number"
                id="period"
                name="period"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={loanDetails.period}
                onChange={handleLoanDetailsChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Guarantor 1</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="guarantor1-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="guarantor1-name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor1.name}
                onChange={(e) => handleGuarantorChange(1, e)}
                required
              />
            </div>
            <div>
              <label htmlFor="guarantor1-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="guarantor1-email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor1.email}
                onChange={(e) => handleGuarantorChange(1, e)}
                required
              />
            </div>
            <div>
              <label htmlFor="guarantor1-location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="guarantor1-location"
                name="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor1.location}
                onChange={(e) => handleGuarantorChange(1, e)}
                required
              />
            </div>
            <div>
              <label htmlFor="guarantor1-cnic" className="block text-sm font-medium text-gray-700">
                CNIC
              </label>
              <input
                type="text"
                id="guarantor1-cnic"
                name="cnic"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor1.cnic}
                onChange={(e) => handleGuarantorChange(1, e)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Guarantor 2</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="guarantor2-name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="guarantor2-name"
                name="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor2.name}
                onChange={(e) => handleGuarantorChange(2, e)}
                required
              />
            </div>
            <div>
              <label htmlFor="guarantor2-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="guarantor2-email"
                name="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor2.email}
                onChange={(e) => handleGuarantorChange(2, e)}
                required
              />
            </div>
            <div>
              <label htmlFor="guarantor2-location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="guarantor2-location"
                name="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor2.location}
                onChange={(e) => handleGuarantorChange(2, e)}
                required
              />
            </div>
            <div>
              <label htmlFor="guarantor2-cnic" className="block text-sm font-medium text-gray-700">
                CNIC
              </label>
              <input
                type="text"
                id="guarantor2-cnic"
                name="cnic"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={guarantor2.cnic}
                onChange={(e) => handleGuarantorChange(2, e)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={personalInfo.address}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={personalInfo.phoneNumber}
                onChange={handlePersonalInfoChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Documents</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="statementFile" className="block text-sm font-medium text-gray-700">
                Statement (Optional)
              </label>
              <input
                type="file"
                id="statementFile"
                name="statementFile"
                className="mt-1 block w-full"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
            <div>
              <label htmlFor="salarySheetFile" className="block text-sm font-medium text-gray-700">
                Salary Sheet (Optional)
              </label>
              <input
                type="file"
                id="salarySheetFile"
                name="salarySheetFile"
                className="mt-1 block w-full"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Loan Request
          </button>
        </div>
      </form>
    </div>
  )
}

