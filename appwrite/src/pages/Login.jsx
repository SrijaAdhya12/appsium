import React, { useState } from 'react'
import { account, ID } from '../lib/appwrite'

const Login = () => {
	const initialData = {
		email: '',
		password: '',
		name: ''
	}
	const [user, setUser] = useState(initialData)
	const [loggedInUser, setLoggedInUser] = useState(null)
	const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value })

	const login = async (email, password) => {
		await account.createEmailPasswordSession(email, password)
		setLoggedInUser(await account.get())
	}

	return (
		<div>
			<p>{loggedInUser ? `Logged in as ${loggedInUser.name}` : 'Not logged in'}</p>

			<form>
				<input name="email" type="email" placeholder="Email" value={user.email} onChange={handleChange} />
				<input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} />
				<input name="name" type="text" placeholder="Name" value={user.name} onChange={handleChange} />

				<button type="button" onClick={() => login(user.email, user.password)}>
					Login
				</button>

				<button
					type="button"
					onClick={async () => {
						await account.create(ID.unique(), user.email, user.password, user.name)
						login(user.email, user.password)
					}}
				>
					Register
				</button>

				<button
					type="button"
					onClick={async () => {
						await account.deleteSession('current')
						setLoggedInUser(null)
					}}
				>
					Logout
				</button>
			</form>
		</div>
	)
}

export default Login
