import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { account, ID } from '../lib/appwrite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { OAuthButtons } from '@/components'
const Login = () => {
	const navigate = useNavigate()
	const location = useLocation()

	const initialData = {
		email: '',
		password: '',
		name: ''
	}

	const [user, setUser] = useState(initialData)
	const [loggedInUser, setLoggedInUser] = useState(null)

	useEffect(() => {
		const checkSession = async () => {
			try {
				const currentUser = await account.get()
				setLoggedInUser(currentUser)
				const from = location.state?.from?.pathname || '/'
				navigate(from, { replace: true })
			} catch (error) {
				console.log('No active session.')
			}
		}
		checkSession()
	}, [navigate, location])

	const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const login = async (email, password) => {
		try {
			await account.createEmailPasswordSession(email, password)
			const currentUser = await account.get()
			setLoggedInUser(currentUser)
			const from = location.state?.from?.pathname || '/'
			navigate(from, { replace: true })
		} catch (error) {
			console.error('Login failed: Please check your credentials and try again.')
		}
	}


	return (
		<Card className="sm:w-full mx-4 my-40 sm:max-w-md sm:mx-auto">
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Enter your email and password to login</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input placeholder="pritam@gmail.com" id="email" name="email" type="email" onChange={handleChange} value={user.email} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						placeholder="pritam@69"
						id="password"
						name="password"
						type="password"
						onChange={handleChange}
						value={user.password}
					/>
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4 justify-center">
				<Button className="w-full" onClick={() => login(user.email, user.password)}>
					Login
				</Button>
				<OAuthButtons />
				<h1 className="font-semibold text-sm">
					Don't have an account?{' '}
					<Link className="underline" to="/register">
						Register
					</Link>
				</h1>
			</CardFooter>
		</Card>
	)
}

export default Login
