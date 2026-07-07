import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>

                <Image
                    src="/logo.png"
                    width={55}
                    height={55}
                    alt="Rikka"
                />

                <h2>Rikka</h2>

                <div className={styles.links}>
                    <Link href="/termos">Termos de Uso</Link>
                    <Link href="/privacidade">Política de Privacidade</Link>
                    <Link href="/suporte">Suporte</Link>
                </div>

                <span>
                    © {new Date().getFullYear()} Dreams Experience. Todos os direitos reservados.
                </span>

            </div>
        </footer>
    );
}