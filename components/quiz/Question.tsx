import classes from '../../styles/Main.module.css';

function Question(props: {content: string}) {
  return (
    <span className={classes.question}>{props.content}</span>
  )
}

export default Question;