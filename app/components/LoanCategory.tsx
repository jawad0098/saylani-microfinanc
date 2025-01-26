import type React from "react"

interface LoanCategoryProps {
  name: string
  subcategories: string[]
  maxLoan: string
  period: string
}

export const LoanCategory: React.FC<LoanCategoryProps> = ({ name, subcategories, maxLoan, period }) => {
  return (
    <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
      <h2 className="mb-3 text-2xl font-semibold">{name}</h2>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">Subcategories: {subcategories.join(", ")}</p>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">Maximum loan: {maxLoan}</p>
      <p className="m-0 max-w-[30ch] text-sm opacity-50">Loan period: {period}</p>
    </div>
  )
}

