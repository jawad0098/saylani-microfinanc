import Link from "next/link"
import { LoanCategory } from "./components/LoanCategory"

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

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Saylani Microfinance App
        </p>
      </div>

      <div className="relative flex place-items-center">
        <h1 className="text-4xl font-bold">Welcome to Saylani Microfinance</h1>
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">
        {loanCategories.map((category, index) => (
          <LoanCategory key={index} {...category} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/calculator"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Use Loan Calculator{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">Calculate your loan and see repayment options.</p>
        </Link>
      </div>
    </main>
  )
}

