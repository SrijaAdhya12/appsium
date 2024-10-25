import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { account, ID } from '../lib/appwrite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
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
		<Card className="w-full my-40 max-w-md mx-auto">
			<CardHeader className="text-center">
				<CardTitle>Appsium</CardTitle>
				<CardDescription>
					Login
				</CardDescription>
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
				<h1 className="text-muted-foreground">Don't have an account? <Link className="text-blue-500" to="/register">Register</Link></h1>
			</CardContent>
			<CardFooter className="flex justify-center">
				<Button className="w-full" onClick={() => login(user.email, user.password)}>Login</Button>
			</CardFooter>
		</Card>
	)
}

export default Login
