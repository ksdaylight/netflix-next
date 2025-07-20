import Input from "@/components/Input"
import { useCallback, useState } from "react"
import axios from "axios"
import { signIn } from "next-auth/react"

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

const Auth = () => {

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [variant, setVariant] = useState<string>('login');

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
    }, []);

    const login = useCallback(async () => {
        try {
            await signIn('credentials', {
                email,
                password,
                redirect: true,
                callbackUrl: '/profiles'
            })
        } catch (error) {
            console.log(error)
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email, name, password
            });

            login();
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password, login]);


    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className="w-full h-full bg-black lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" className="h-12" alt="Logo"></img>
                </nav>
                <div className="flex justify-center">
                    <div className="self-center w-full px-16 py-16 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-md">
                        <h2 className="mb-8 text-4xl font-semibold text-white">
                            {variant === 'login' ? 'Sign in' : 'Register'}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === 'register' && (
                                <Input label="Username" onChange={(e: any) => { setName(e.target.value) }} id="username" type="username" value={name} />
                            )}
                            <Input label="Email" onChange={(e: any) => { setEmail(e.target.value) }} id="email" type="email" value={email} />
                            <Input label="Password" onChange={(e: any) => { setPassword(e.target.value) }} id="password" type="password" value={password} />
                        </div>
                        <button onClick={variant === 'login' ? login : register} className="w-full py-3 mt-10 text-white transition bg-red-600 rounded-md hover:bg-red-700">
                            {variant === 'login' ? 'Login' : 'Sign up'}
                        </button>
                        <div className="flex flex-row items-center justify-center gap-4 mt-8">
                            <div className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
                                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                            >
                                <FcGoogle size={30} />
                            </div>
                            <div className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-80"
                                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                            >
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <p className="mt-12 text-neutral-500">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                                {variant === 'login' ? 'Create an account' : 'Sign in'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth