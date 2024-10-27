import { Link } from 'react-router-dom'
import { Menu, User, Home, Settings, LogOut } from 'lucide-react'
import { Button } from '@/components/ui'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { account } from '@/lib/appwrite'
import { useNavigate } from 'react-router-dom'
const Sidebar = () => {
	const navigate = useNavigate()
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
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="right" className="w-72">
				<nav className="flex flex-col space-y-4">
					<Link to="/" className="flex items-center py-2">
						<Home className="mr-2" />
						Home
					</Link>
					<Link to="/profile" className="flex items-center py-2">
						<User className="mr-2" />
						Profile
					</Link>
					<Link onClick={logout}  className="flex items-center py-2">
						<LogOut className="mr-2" />
						Logout
					</Link>
					<Link to="/settings" className="flex items-center py-2">
						<Settings className="mr-2" />
						Settings
					</Link>
				</nav>
			</SheetContent>
		</Sheet>
	)
}

export default Sidebar
