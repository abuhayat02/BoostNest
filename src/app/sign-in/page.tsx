"use client"

import { set } from 'mongoose'
import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

function SignIn() {
  const router = useRouter()
  const session = useSession()
  const [see, setSee] = useState(false)
  const [error, setError] = useState<string>('')
  const [pending, setPending] = useState<boolean>(false)
  const [form, setForm] = useState<{ email: string, password: string }>({
    email: '',
    password: ''
  })
  const displayPassword = () => {
    setSee(!see)
  }


  const loginInformation = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password
    })
    if (res?.ok) {
      setPending(false)
      router.push('/')
    } else {
      setPending(false)
      setError('something is wrong')
    }

  }

  return (
    <div className='w-full h-screen flex justify-center relative items-center bg-gray-100'>
      <div className='bg-gradient-to-tr from-green-400 to-red-400 rounded-3xl  md:w-[600px] w-full h-full md:h-[600px] z-10 blur-3xl  absolute'>
      </div>
      <div className='md:w-[500px] z-50 h-fit border py-10 px-6 rounded-lg '>
        <p className='text-xl font-semibold text-center mb-4'>Welcome to sign in our BoostNest website</p>
        <form onSubmit={loginInformation} className='flex relative px-4 py-3 flex-col gap-4'>
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
            placeholder="Enter your password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className='p-3 border  border-gray-300 rounded'
          />
          <div onClick={displayPassword} className='flex  flex-row right-6  justify-center cursor-pointer items-center text-xl bottom-23 absolute'>
            {see ? <FaRegEye /> :
              <FaEyeSlash />}
          </div>
          <button
            type="submit"
            className='bg-white/85 text-green-500 py-3 rounded cursor-pointer hover:text-blue-500 hover:bg-white/20 transition'
          >
            {
              pending ? "waiting..." : "Sign In"
            }
          </button>

        </form>
        <div className="flex items-center px-4 ">
          <hr className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-white text-sm">OR</span>
          <hr className="flex-grow border-t border-gray-300" />
        </div>
        <div className="flex items-center px-4 py-3">

          <button
            type="button"
            className='flex w-full hover:text-blue-800 cursor-pointer items-center justify-center gap-3 border border-gray-300 py-3 rounded hover:bg-gray-100 transition'
            onClick={() => signIn('google')}
          >
            <FcGoogle className="text-2xl" />
            <span className="text-white hover:text-blue-800 font-medium">Sign in with Google</span>
          </button>
        </div>

        <p className='text-md text-center py-3  '> Create an account <Link className='text-blue-800 font-bold underline' href={'/sign-up'}>Sign up</Link></p>
      </div>

    </div>
  )
}

export default SignIn
