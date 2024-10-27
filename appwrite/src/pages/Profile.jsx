import { useState, useEffect } from 'react'
import { account } from '@/lib/appwrite'
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Calendar } from 'lucide-react'
import { House } from 'lucide-react'
import { Link } from 'react-router-dom'
const Profile = () => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await account.get()
				setUser(userData)
			} catch (error) {
				console.error('Error fetching user data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchUser()
	}, [])

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		})
	}

	if (loading) {
		return <div className="flex justify-center items-center h-screen text-white">Loading...</div>
	}

    return (
		<div>
			<div className="sm:mx-auto sm:container m-4">
				<Link to="/">
					<House />
				</Link>
			</div>
			<div className="min-h-screen flex items-center justify-center p-4">
				<Card className="w-full max-w-md  overflow-hidden">
					<div className="bg-gradient-to-r from-purple-500 to-pink-500 h-32 flex items-center justify-center">
						<h1 className="text-3xl font-bold text-white">Profile Information</h1>
					</div>
					<CardContent className="mt-8 space-y-6">
						<div className="relative">
							<div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
								<div className="w-24 h-24 bg-background rounded-full flex items-center justify-center text-4xl font-bold border-4  border-muted">
									{user?.name?.charAt(0).toUpperCase() || '?'}
								</div>
							</div>
						</div>
						<div className="text-center pt-8">
							<p className="text-sm text-gray-400">All information is read-only</p>
						</div>
						<div className="space-y-4">
							<div className="flex items-center border space-x-4 p-3  rounded-lg">
								<User className="text-purple-400" />
								<div>
									<p className="text-sm text-gray-400">Name</p>
									<p className="font-semibold">{user?.name || 'N/A'}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4 p-3 border rounded-lg">
								<Mail className="text-pink-400" />
								<div>
									<p className="text-sm text-gray-400">Email</p>
									<p className="font-semibold">{user?.email || 'N/A'}</p>
								</div>
							</div>
							<div className="flex items-center space-x-4 p-3 border rounded-lg">
								<Calendar className="text-blue-400" />
								<div>
									<p className="text-sm text-gray-400">Account Created</p>
									<p className="font-semibold">{formatDate(user?.$createdAt) || 'N/A'}</p>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default Profile
