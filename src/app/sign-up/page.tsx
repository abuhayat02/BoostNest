"use client"

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'

function SignUp() {
  const [error, setError] = useState("")
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })
  const session = useSession()

  const [pending, setPending] = useState(false)
  const [see, setSee] = useState(false)

  const displayPassword = () => {
    setSee(!see)
  }



  const submitFormdata = async (event: React.FormEvent) => {

    event.preventDefault()
    setPending(true)
    const res = await fetch('/api/auth/signup', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    const data = await res.json()



    if (res.ok) {
      const response = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password
      })
      router.push('/')
      setPending(false)

    } else {
      setError(data.message)
      setPending(false)
    }

  }


  return (
    <div className='w-full h-screen flex justify-center relative items-center bg-gray-100'>
      <div className='bg-gradient-to-tr from-green-500 to-red-400 rounded-3xl  md:w-[600px] w-full h-full md:h-[600px] z-10 blur-3xl  absolute'>
      </div>
      <div className='md:w-[500px] z-50 h-fit border py-10 px-6 rounded-lg '>
        <p className='text-xl font-semibold text-center mb-4'>{error ? `${error}` : "Welcome to sign up our BoostNest website"}</p>
        <form onSubmit={submitFormdata} className='flex relative px-4 py-7 flex-col gap-4'>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Enter your name"
            className=' p-3 border border-gray-300 rounded'
          />
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your email"
            className='p-3 border border-gray-300 rounded'
          />
          <input
            type={see ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter your password"
            className='p-3 border  border-gray-300 rounded'
          />
          <div onClick={displayPassword} className='flex  flex-row right-6  justify-center cursor-pointer items-center text-xl bottom-27 absolute'>
            {see ? <FaRegEye /> :
              <FaEyeSlash />}
          </div>
          <button
            disabled={pending}
            type="submit"
            className='bg-white/85 text-green-500 py-3 rounded cursor-pointer hover:text-blue-500 hover:bg-white/20 transition'
          >
            {pending ? "Waiting...." : "Sign Up"}
          </button>

        </form>
        <div className="flex items-center px-4 ">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-white text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <p className='text-md text-center py-3  '>already have an account <Link className='text-blue-800 font-bold underline' href={'/sign-in'}>Sign in</Link></p>
      </div>

    </div>
  )
}

export default SignUp
