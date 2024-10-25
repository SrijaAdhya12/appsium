import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../lib/appwrite'
import { Button } from '../components/ui/button'
const Home = () => {
	const navigate = useNavigate()
	const [currentUser, setCurrentUser] = useState(null)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const user = await account.get()
				setCurrentUser(user)
			} catch (error) {
				console.error('Error fetching user:', error)
				navigate('/login')
			}
		}
		fetchUser()
	}, [navigate])

	const logout = async () => {
		try {
			await account.deleteSession('current')
			navigate('/login')
		} catch (error) {
			console.error('Logout error:', error)
			if (error.code === 401) {
				console.log('Session already invalid. Redirecting to login.')
				navigate('/login')
			} else {
				console.error('Unexpected error during logout:', error)
			}
		}
	}

	return (
		<div>
			Home
			<Button variant="outline" onClick={logout}>
				Logout
			</Button>
			<h1>Welcome {currentUser?.name}</h1>
		</div>
	)
}

export default Home
