import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from '@/components'
import { ThemeProvider } from '@/providers'
const App = () => {
  return (
		<BrowserRouter>
			<ThemeProvider>
				<AppRouter />
			</ThemeProvider>
		</BrowserRouter>
	)
}

export default App