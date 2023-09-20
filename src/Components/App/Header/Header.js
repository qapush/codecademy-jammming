import styles from './Header.module.css';

export default function Header({ children }) {
    return (
        <header>
            <div className={styles.logo}>
                <h1 >Ja<span style={{ color: 'var(--bright-green)' }}>mmm</span>ing</h1>
            </div>
            {children}
        </header>
    )
}