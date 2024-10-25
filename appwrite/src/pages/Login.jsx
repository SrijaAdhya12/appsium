import React, { useEffect, useState } from 'react'
import { account, ID } from '../lib/appwrite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Login = () => {
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
			} catch (error) {
				console.log('No active session.')
			}
		}
		checkSession()
	}, [])

	const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const login = async (email, password) => {
		try {
			const currentUser = await account.get() 
			setLoggedInUser(currentUser)
			console.log(`Already logged in as ${currentUser.name}`)
			return 
		} catch (error) {
			// If an error occurs, proceed to login
		}

		try {
			await account.createEmailPasswordSession(email, password)
			const currentUser = await account.get()
			setLoggedInUser(currentUser)
			console.log(`Logged in as ${currentUser.name}`)
		} catch (error) {
			console.error('Login failed: Please check your credentials and try again.')
		}
	}

	const register = async () => {
		try {
			await account.create(ID.unique(), user.email, user.password, user.name)
			await login(user.email, user.password)
			console.log("Your account has been created and you're now logged in.")
		} catch (error) {
			console.error('Registration failed: An error occurred during registration. Please try again.')
		}
	}

	const logout = async () => {
		try {
			await account.deleteSession('current')
			setLoggedInUser(null)
			console.log('You have been logged out.')
		} catch (error) {
			console.error('Logout failed: An error occurred during logout. Please try again.')
		}
	}

	return (
		<Card className="w-full max-w-md my-28 mx-auto">
			<CardHeader>
				<CardTitle className="text-2xl font-bold">Appsium</CardTitle>
				<CardDescription>
					{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Login or create a new account'}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Email"
							value={user.email}
							onChange={handleChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Password"
							value={user.password}
							onChange={handleChange}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="name">Name</Label>
						<Input
							id="name"
							name="name"
							type="text"
							placeholder="Name"
							value={user.name}
							onChange={handleChange}
						/>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
				<Button className="w-full sm:w-auto" onClick={() => login(user.email, user.password)}>
					Login
				</Button>
				<Button className="w-full sm:w-auto" variant="outline" onClick={register}>
					Register
				</Button>
				<Button className="w-full sm:w-auto" variant="secondary" onClick={logout}>
					Logout
				</Button>
			</CardFooter>
		</Card>
	)
}

export default Login
