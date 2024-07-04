import Link from "next/link"

const Custom404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-4">404</h1>
        <p className="text-lg mb-4">Page Not Found</p>
        <Link href="/">
          <p className="text-blue-500 hover:underline">Go back to Home</p>
        </Link>
      </div>
    </div>
  )
}

export default Custom404
