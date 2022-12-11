import classes from '../../styles/Main.module.css';

type eventType = (e : React.MouseEvent<HTMLButtonElement>) => void;

type ButtonProps = {
    handleClick: eventType;
    handleMouseEnter?: eventType;
    handleMouseLeave?: eventType;
    children?: any;
    content? : string;
    value? : string;
    disabled? : boolean;
    className?: string;
}

function Button({handleClick, handleMouseEnter, handleMouseLeave, content, value, disabled, className, children} : ButtonProps) {
    return (
        <button className={className + ' ' + classes.btn} 
        disabled={disabled} 
        value={value} 
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
            {children !== undefined ? children : content}
        </button>
    )
}

export default Button;