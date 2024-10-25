import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { account, ID } from '../lib/appwrite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'

const Register = () => {
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

	const register = async () => {
		try {
			await account.create(ID.unique(), user.email, user.password, user.name)
			await login(user.email, user.password)
		} catch (error) {
			console.error('Registration failed: An error occurred during registration. Please try again.')
		}
	}

	return (
		<Card className="w-full max-w-md mx-auto my-40">
			<CardHeader className="text-center">
				<CardTitle>Appsium</CardTitle>
				<CardDescription>Create a new account</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input id="email" name="email" type="email" onChange={handleChange} value={user.email} />
				</div>
				<div className="space-y-2">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						onChange={handleChange}
						value={user.password}
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input id="name" name="name" type="text" onChange={handleChange} value={user.name} />
				</div>
				<h1 className="text-muted-foreground">
					Already have an account?{' '}
					<Link className="text-blue-500" to="/login">
						Login
					</Link>
				</h1>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button className="w-full" onClick={register}>
					Register
				</Button>
			</CardFooter>
		</Card>
	)
}

export default Register
