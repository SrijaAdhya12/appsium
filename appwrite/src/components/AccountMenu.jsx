import React, { useEffect, useState } from 'react'
import { User } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useNavigate } from 'react-router-dom'
import { account } from '@/lib/appwrite'
const AccountMenu = () => {
	const [userData, setUserData] = useState(null)
	const navigate = useNavigate()
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await account.get()
				setUserData(user)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [])

	const getAvatarUrl = () => {
		if (!userData) return ''
		if (userData.$providers?.includes('google')) {
			return userData.prefs?.picture || ''
		} else if (userData.$providers?.includes('github')) {
			return userData.prefs?.avatarUrl || ''
		}
		return ''
	}

	const getInitials = () => {
		if (!userData) return '?'

		if (!userData.$providers?.includes('google') && !userData.$providers?.includes('github')) {
			if (userData.name) {
				const names = userData.name.split(' ')
				return names.map((name) => name.charAt(0).toUpperCase()).join('')
			}
			return userData.email?.charAt(0).toUpperCase() || '?'
		}

		return <User className="w-5 h-5" />
	}
	const avatarUrl = getAvatarUrl()
	const initials = getInitials()

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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar asChild className="rounded-md p-0">
					<Button variant="ghost" size="icon" title="User menu">
						{avatarUrl ? <AvatarImage src={avatarUrl} alt={userData?.name || 'User avatar'} /> : null}
						<AvatarFallback className="rounded-md"> {initials}</AvatarFallback>
						<span className="sr-only">User menu</span>
					</Button>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-background/80 backdrop-blur-md" align="end">
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default AccountMenu
