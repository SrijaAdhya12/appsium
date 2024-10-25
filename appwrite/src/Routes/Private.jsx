import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { account } from '../lib/appwrite'

const Private = ({ component: Component }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [isLoading, setIsLoading] = useState(true)
	const location = useLocation()

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await account.get()
				setIsAuthenticated(true)
			} catch (error) {
				console.log('User is not authenticated')
			} finally {
				setIsLoading(false)
			}
		}

		checkAuth()
	}, [])

	if (isLoading) {
		return <div className="flex items-center justify-center min-h-screen">Loading...</div>
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return Component
}

export default Private
