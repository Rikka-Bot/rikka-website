import Navbar from './NavBar'
import Footer from './Footer'
import Head from 'next/head'

import styles from '../styles/MainContainer.module.css'

export default function MainContainer({ children }) {
    return(
    <>
    <Head>
      <link rel="shortcut icon" href="/favicon.ico"/>
      <title>Rikka Website</title>
      </Head>
    <Navbar />
    <div className={styles.container}>{children}</div>
    <Footer />
    </>
    )
}