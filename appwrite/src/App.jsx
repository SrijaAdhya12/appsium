import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/components'
import { ThemeProvider } from '@/providers'
import { Toaster } from '@/components/ui/toaster'
const App = () => {
  return (
		<BrowserRouter>
			<ThemeProvider>
				<AppRouter />
				<Toaster />
			</ThemeProvider>
		</BrowserRouter>
  )
}

export default App