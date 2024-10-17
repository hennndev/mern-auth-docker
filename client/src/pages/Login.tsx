import { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import Spinner from '../components/Spinner'
import { Link, useNavigate } from 'react-router-dom'

type FormTypes = {
    email: string
    password: string
}

const Login = () => {
    const navigate = useNavigate()
    const [isError, setIsError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: {errors} } = useForm<FormTypes>()

    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
        try {
            const req = await fetch("http://localhost:3001/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: values.email,
                    password: values.password
                })
            })
            const res = await req.json()
            if(res.ok) {
                navigate("/")
            } else {
                throw res
            }
        } catch (error: any) {
            setIsError(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section>
            <nav className="w-max flex pt-10 text-gray-700" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link to="/" className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">
                            <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 block w-4 h-4 mx-1 text-gray-400 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <a href="#" className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600">Login</a>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180  w-4 h-4 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </div>
                    </li>
                </ol>
            </nav>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full pt-16">
                {isError ? (
                    <div className={clsx("p-4 mb-4 text-sm rounded-lg", isError && "text-red-800 bg-red-50")} role="alert">
                        <span className="font-medium">Gagal!</span> {isError}
                    </div>
                ): null}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input 
                        type="email" 
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Tulis email kamu disini" 
                        {...register("email", {
                            required: "Kolom input email diperlukan"
                        })}/>
                    {errors.email && <p className='text-red-600 text-sm font-medium mt-2'>{errors.email?.message}</p>}
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        {...register("password", {
                            required: "Kolom input password diperlukan"
                        })}/>
                    {errors.password && <p className='text-red-600 text-sm font-medium mt-2'>{errors.password?.message}</p>}
                </div>
                <div className="flex items-start mb-5">
                    <div className="flex items-center h-5">
                        <input 
                            id="remember" 
                            type="checkbox" 
                            value="" 
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <button type="submit" className="flexx text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {isLoading && (
                        <Spinner/>
                    )}
                    Submit
                </button>
            </form>
        </section>
    )
}

export default Login