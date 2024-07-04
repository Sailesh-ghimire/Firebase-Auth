import SignupForm from "@/components/signup"

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400">
      <div className="bg-white p-8 rounded shadow-md max-w-sm w-full">
        <SignupForm />
      </div>
    </div>
  )
}

export default SignupPage
