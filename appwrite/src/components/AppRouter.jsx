import { Routes, Route } from 'react-router-dom'
import { Private } from '@/Routes'
import { Login, Home } from '@/pages'

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Private component={<Home />} />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}

export default AppRouter
