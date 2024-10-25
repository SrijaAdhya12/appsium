import { Routes, Route } from 'react-router-dom'
import { Private } from '@/Routes'
import { Login, Home, Register } from '@/pages'

const AppRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<Private component={<Home />} />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	)
}

export default AppRouter
