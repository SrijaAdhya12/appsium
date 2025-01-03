import { Account } from 'appwrite'
import { useState } from 'react'
import { client } from '../lib/appwrite'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks'

const account = new Account(client)

const OAuthButtons = () => {
	const { toast } = useToast()
	const [error, setError] = useState('')

	const handleOAuthSignIn = async (provider) => {
		try {
			account.createOAuth2Session(
				provider,
				import.meta.env.VITE_YOUR_SUCCESS_URL, // URL to redirect after successful login
				import.meta.env.VITE_YOUR_FAILURE_URL // URL to redirect after failed login
			)
		} catch (err) {
			setError(err.message || 'An error occurred during OAuth sign-in')
			toast({ title: 'Login Failed', description: error, variant: 'destructive' })
		}
		toast({
			title: 'Login Successful',
			description: `Successfully logged in with ${provider}.`,
			variant: 'success'
		})
	}

	return (
		<div className="flex flex-col w-full gap-2">
			{error && <div className="text-red-500 text-sm mb-2">{error}</div>}

			<Button variant="outline" onClick={() => handleOAuthSignIn('google')}>
				Login with Google
			</Button>

			<Button variant="outline" onClick={() => handleOAuthSignIn('github')}>
				Login with GitHub
			</Button>
		</div>
	)
}

export default OAuthButtons
