import styles from './TopBar.module.css'
import HoverIcon from './topbar/HoverIcon'

export default function TopBar() {
  return (
    <div className={styles.topBar}>
        <HoverIcon text="-" />
    </div>
  )
}
