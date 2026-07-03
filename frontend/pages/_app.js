import '../styles/globals.css'
import MainContainer from '../components/MainContainer'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return <AuthProvider>
    <MainContainer>
      <Component {...pageProps} />
    </MainContainer>
  </AuthProvider>
}

export default MyApp
