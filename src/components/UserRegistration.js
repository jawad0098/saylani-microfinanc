import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UserRegistration = () => {
  const [cnic, setCnic] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("/api/register", { cnic, email, name })
      if (response.data.success) {
        alert("Registration successful. Please check your email for the password.")
        navigate("/login")
      }
    } catch (error) {
      console.error("Registration failed:", error)
      alert("Registration failed. Please try again.")
    }
  }

  return (
    <div className="user-registration">
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="CNIC" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default UserRegistration

