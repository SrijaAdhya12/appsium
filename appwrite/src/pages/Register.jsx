import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { account, ID } from '../lib/appwrite'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link } from 'react-router-dom'
import { OAuthButtons } from '@/components'
import { useToast } from '@/hooks'

const Register = () => {
	const navigate = useNavigate()
	const location = useLocation()
	const { toast } = useToast()
	const initialData = {
		email: '',
		password: '',
		name: ''
	}

	const [user, setUser] = useState(initialData)
	const [loggedInUser, setLoggedInUser] = useState(null)
	const [errors, setErrors] = useState({
		name: '',
		email: '',
		password: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

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

	const validateForm = () => {
		let tempErrors = {
			name: '',
			email: '',
			password: ''
		}
		let isValid = true

		// Name validation
		if (!user.name.trim()) {
			tempErrors.name = 'Name is required'
			isValid = false
		} else if (user.name.trim().length < 2) {
			tempErrors.name = 'Name must be at least 2 characters'
			isValid = false
		}

		// Email validation
		if (!user.email) {
			tempErrors.email = 'Email is required'
			isValid = false
		} else if (!/\S+@\S+\.\S+/.test(user.email)) {
			tempErrors.email = 'Please enter a valid email address'
			isValid = false
		}

		// Password validation
		if (!user.password) {
			tempErrors.password = 'Password is required'
			isValid = false
		} else if (user.password.length < 8) {
			tempErrors.password = 'Password must be at least 8 characters'
			isValid = false
		} else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(user.password)) {
			tempErrors.password = 'Password must contain both letters and numbers'
			isValid = false
		}

		setErrors(tempErrors)
		return isValid
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setUser({ ...user, [name]: value })
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors({ ...errors, [name]: '' })
		}
	}

	const login = async (email, password) => {
		try {
			await account.createEmailPasswordSession(email, password)
			const currentUser = await account.get()
			setLoggedInUser(currentUser)
			const from = location.state?.from?.pathname || '/'
			navigate(from, { replace: true })
			toast({
				title: 'Account created successfully!',
				description: 'Welcome to your account.',
				variant: 'default',
				duration: 3000
			})
		} catch (error) {
			toast({
				title: 'Registration failed',
				description: 'An error occurred during registration. Please try again.',
				variant: 'destructive',
				duration: 5000
			})
			console.error('Login failed: Please check your credentials and try again.')
		}
	}

	const register = async () => {
		if (!validateForm()) {
			return
		}

		setIsSubmitting(true)
		try {
			await account.create(ID.unique(), user.email, user.password, user.name)
			await login(user.email, user.password)
			toast({
				title: 'Account created successfully!',
				description: 'Welcome to your account.',
				variant: 'default',
				duration: 3000
			})
		} catch (error) {
			console.error('Registration failed: An error occurred during registration. Please try again.')
			toast({
				title: 'Registration failed',
				description: 'An error occurred during registration. Please try again.',
				variant: 'destructive',
				duration: 5000
			})
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Card className="sm:w-full mx-4 my-40 sm:max-w-md sm:mx-auto">
			<CardHeader>
				<CardTitle>Register</CardTitle>
				<CardDescription>Create a new account</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="name">Name</Label>
					<Input
						placeholder="Pritam"
						id="name"
						name="name"
						type="text"
						onChange={handleChange}
						value={user.name}
						className={errors.name ? 'border-red-500' : ''}
					/>
					{errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email</Label>
					<Input
						placeholder="pritam@gmail.com"
						id="email"
						name="email"
						type="email"
						onChange={handleChange}
						value={user.email}
						className={errors.email ? 'border-red-500' : ''}
					/>
					{errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
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
						className={errors.password ? 'border-red-500' : ''}
					/>
					{errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
				</div>
			</CardContent>
			<CardFooter className="flex flex-col gap-4 justify-center">
				<Button className="w-full" onClick={register} disabled={isSubmitting}>
					{isSubmitting ? 'Registering...' : 'Register'}
				</Button>
				<OAuthButtons />
				<h1 className="font-semibold text-sm">
					Already have an account?{' '}
					<Link className="underline" to="/login">
						Login
					</Link>
				</h1>
			</CardFooter>
		</Card>
	)
}

export default Register
