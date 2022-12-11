import classes from '../styles/Main.module.css';
import { MdSearchOff } from 'react-icons/md'

function Error() {
  return (
    <div className={classes.void}>
      <div className={classes.void_content}>
        <MdSearchOff className={classes.icon}></MdSearchOff>
        <h3 className={classes.text}>Apologies... This page does not exist</h3>
      </div>
    </div>
  )
}

export default Error;