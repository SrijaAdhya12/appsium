import React from 'react'
import { useNavigate } from 'react-router-dom'
import { account, ID } from '../lib/appwrite'
import { Button } from '../components/ui/button'

const Home = () => {
	const navigate = useNavigate()

	const logout = async () => {
	    try {
	        await account.deleteSession('current');
	        navigate('/login');
	    } catch (error) {
	        console.error('Logout error:', error);
	        if (error.code === 401) {
	            console.log('Session already invalid. Redirecting to login.');
	            navigate('/login');
	        } else {
	            console.error('Unexpected error during logout:', error);
	        }
	    }
	};

	return (
		<div>
			Home
			<Button variant="outline" onClick={logout}>
				Logout
			</Button>
		</div>
	)
}

export default Home;


