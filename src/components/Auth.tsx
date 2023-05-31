import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm"
import { XMarkIcon } from "@heroicons/react/20/solid"
import { useAtom } from "jotai"
import { modalVisibilityAtom } from "../atoms"

const Auth = () => {
  const [ modalVisibility, setModalVisibility ] = useAtom(modalVisibilityAtom)
  const [tab, setTab] = useState("login")

  console.log(modalVisibility)

  return (
    <div className={`${modalVisibility} fixed z-10 inset-0 overflow-y-auto`} id="modal">
      <div
        className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
      >
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div
          className="inline-block dark:bg-gray-900 text-gray-100 align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        >
          <div className="py-4 text-left px-6">
            <div className="flex justify-between items-center pb-4">
              <p className="text-2xl font-bold text-center">Your Account</p>
              <div className="modal-close cursor-pointer z-50" onClick={() => setModalVisibility("hidden")}>
                <XMarkIcon className="h-6 w-6" />
              </div>
            </div>

            <ul className="flex flex-wrap mb-4">
              <li className="flex-auto text-center">
                <p
                  className={`block rounded py-3 px-4 transition cursor-pointer ${tab === "login" ? "bg-blue-400 text-gray-100" : "hover:text-blue-400"}`}
                  onClick={() => setTab("login")}>
                  Login
                </p>
              </li>
              <li className="flex-auto text-center">
                <p
                  className={`block rounded py-3 px-4 transition cursor-pointer ${tab === "register" ? "bg-blue-400 text-gray-100" : "hover:text-blue-400"}`}
                  onClick={() => setTab("register")}>
                  Register
                </p>
              </li>
            </ul>
            {tab === "login" ?
              <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth