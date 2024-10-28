import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ImagePlus, X } from 'lucide-react'
import { account } from '@/lib/appwrite'
import { PenLine } from 'lucide-react'
const PostForm = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState(null)

	const [userData, setUserData] = useState(null)
	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const user = await account.get()
				console.log(user)
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

	const handleSubmit = (e) => {
		e.preventDefault()
		// Handle post creation logic here
		console.log({ title, description, image })
		setIsOpen(false)
		// Reset form
		setTitle('')
		setDescription('')
		setImage(null)
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" className="w-full justify-start text-left text-muted-foreground mt-4 p-6">
					<Avatar className="w-8 h-8 mr-2">
						{avatarUrl ? <AvatarImage src={avatarUrl} alt={userData?.name || 'User avatar'} /> : null}
						<AvatarFallback className="rounded-md"> {initials}</AvatarFallback>
					</Avatar>
					What's on your mind? <PenLine />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create post</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="title">Title</Label>
						<Input
							id="title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Enter post title"
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="description">Description</Label>
						<Textarea
							id="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="What's on your mind?"
							rows={4}
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="image">Image</Label>
						<div className="flex items-center space-x-2">
							<Label
								htmlFor="image"
								className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:border-primary"
							>
								{image ? (
									<div className="relative w-full h-full">
										<img
											src={URL.createObjectURL(image)}
											alt="Preview"
											className="object-cover w-full h-full rounded-md"
										/>
										<Button
											type="button"
											variant="destructive"
											size="icon"
											className="absolute top-1 right-1"
											onClick={() => setImage(null)}
										>
											<X className="w-4 h-4" />
										</Button>
									</div>
								) : (
									<div className="flex flex-col items-center">
										<ImagePlus className="w-8 h-8 text-muted-foreground" />
										<span className="mt-2 text-sm text-muted-foreground">Add photo/video</span>
									</div>
								)}
							</Label>
							<Input
								id="image"
								type="file"
								accept="image/*"
								className="hidden"
								onChange={(e) => setImage(e.target.files?.[0] || null)}
							/>
						</div>
					</div>
					<Button type="submit" className="w-full">
						Create Post
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	)
}

export default PostForm
