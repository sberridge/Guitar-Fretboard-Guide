import styles from './../styles/Header.module.scss';
type HeaderProps = {
    title: string
}
export default function Header(props:HeaderProps) {
    return <header className={styles["app-header"]}>                
        <h1 className={styles["app-header__title"]}>{props.title}</h1>
    </header>
}