import '../styles/globals.css'
import MainContainer from '../components/MainContainer'
import { AuthProvider } from '../contexts/AuthContext'
import { ThemeProvider } from '../contexts/ThemeContext'
import { LanguageProvider } from '../contexts/LanguageContext'

function MyApp({ Component, pageProps, router }) {
  return <ThemeProvider><LanguageProvider><AuthProvider>
      <MainContainer routeKey={router.asPath}><Component {...pageProps} /></MainContainer>
  </AuthProvider></LanguageProvider></ThemeProvider>
}

export default MyApp
