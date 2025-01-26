import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const subcategories = {
  Wedding: ["Valima", "Mehndi", "Barat"],
  Education: ["University Fees", "Child Fees"],
  Business: ["Buy Stall", "Advance Rent for Shop", "Shop Assets", "Shop Machinery"],
  Housing: ["Structure", "Finishing", "Loan"],
}

const LoanRequestForm = () => {
  const [loanDetails, setLoanDetails] = useState({
    category: "",
    subcategory: "",
    amount: "",
    period: "",
  })
  const [guarantor1, setGuarantor1] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  })
  const [guarantor2, setGuarantor2] = useState({
    name: "",
    email: "",
    location: "",
    cnic: "",
  })
  const [personalInfo, setPersonalInfo] = useState({
    address: "",
    phoneNumber: "",
  })
  const [documents, setDocuments] = useState({
    statementFile: null,
    salarySheetFile: null,
  })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("loanDetails", JSON.stringify(loanDetails))
    formData.append("guarantor1", JSON.stringify(guarantor1))
    formData.append("guarantor2", JSON.stringify(guarantor2))
    formData.append("personalInfo", JSON.stringify(personalInfo))
    formData.append("statementFile", documents.statementFile)
    formData.append("salarySheetFile", documents.salarySheetFile)

    try {
      const response = await axios.post("/api/loan-request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      if (response.data.success) {
        alert("Loan request submitted successfully.")
        navigate("/user-dashboard")
      }
    } catch (error) {
      console.error("Loan request submission failed:", error)
      alert("Loan request submission failed. Please try again.")
    }
  }

  return (
    <div className="loan-request-form">
      <h2>Loan Request Form</h2>
      <form onSubmit={handleSubmit}>
        <h3>Loan Details</h3>
        <input
          type="text"
          value={loanDetails.category}
          onChange={(e) => setLoanDetails({ ...loanDetails, category: e.target.value })}
          placeholder="Loan Category"
          required
        />
        <select
          value={loanDetails.subcategory}
          onChange={(e) => setLoanDetails({ ...loanDetails, subcategory: e.target.value })}
          className="text-center"
          required
        >
          <option value="" disabled>Select Subcategory</option>
          {subcategories[loanDetails.category]?.map((subcat) => (
            <option key={subcat} value={subcat}>{subcat}</option>
          ))}
        </select>
        <input
          type="number"
          value={loanDetails.amount}
          onChange={(e) => setLoanDetails({ ...loanDetails, amount: e.target.value })}
          placeholder="Loan Amount"
          required
        />
        <input
          type="number"
          value={loanDetails.period}
          onChange={(e) => setLoanDetails({ ...loanDetails, period: e.target.value })}
          placeholder="Loan Period (in years)"
          required
        />

        <h3>Guarantor 1</h3>
        <input
          type="text"
          value={guarantor1.name}
          onChange={(e) => setGuarantor1({ ...guarantor1, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={guarantor1.email}
          onChange={(e) => setGuarantor1({ ...guarantor1, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={guarantor1.location}
          onChange={(e) => setGuarantor1({ ...guarantor1, location: e.target.value })}
          placeholder="Location"
          required
        />
        <input
          type="text"
          value={guarantor1.cnic}
          onChange={(e) => setGuarantor1({ ...guarantor1, cnic: e.target.value })}
          placeholder="CNIC"
          required
        />

        <h3>Guarantor 2</h3>
        <input
          type="text"
          value={guarantor2.name}
          onChange={(e) => setGuarantor2({ ...guarantor2, name: e.target.value })}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={guarantor2.email}
          onChange={(e) => setGuarantor2({ ...guarantor2, email: e.target.value })}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={guarantor2.location}
          onChange={(e) => setGuarantor2({ ...guarantor2, location: e.target.value })}
          placeholder="Location"
          required
        />
        <input
          type="text"
          value={guarantor2.cnic}
          onChange={(e) => setGuarantor2({ ...guarantor2, cnic: e.target.value })}
          placeholder="CNIC"
          required
        />

        <h3>Personal Information</h3>
        <input
          type="text"
          value={personalInfo.address}
          onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
          placeholder="Address"
          required
        />
        <input
          type="tel"
          value={personalInfo.phoneNumber}
          onChange={(e) => setPersonalInfo({ ...personalInfo, phoneNumber: e.target.value })}
          placeholder="Phone Number"
          required
        />

        <h3>Documents</h3>
        <input
          type="file"
          onChange={(e) => setDocuments({ ...documents, statementFile: e.target.files[0] })}
          accept=".pdf,.doc,.docx"
        />
        <label>Statement (Optional)</label>
        <input
          type="file"
          onChange={(e) => setDocuments({ ...documents, salarySheetFile: e.target.files[0] })}
          accept=".pdf,.doc,.docx"
        />
        <label>Salary Sheet (Optional)</label>

        <button type="submit">Submit Loan Request</button>
      </form>
    </div>
  )
}

export default LoanRequestForm

