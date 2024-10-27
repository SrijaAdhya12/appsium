import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../lib/appwrite'
const Landing = () => {
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


	return (
		<div>
			Home
			<h1 className="text-2xl font-bold">Welcome {currentUser?.name}!</h1>
		</div>
	)
}

export default Landing
