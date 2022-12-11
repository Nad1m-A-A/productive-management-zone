import { ChangeEvent, forwardRef} from 'react';
import classes from '../../styles/Main.module.css'

type InputProps = {
    changeHandler?: (e: ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
    defaultValue?: string;
    type?: string;
    maxLength?: number;
    min?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => 
    <input
    className={classes.input}
    onChange={props.changeHandler} 
    ref={ref} 
    defaultValue={props.defaultValue}
    autoFocus={props.autoFocus}
    placeholder={props.placeholder}
    disabled={props.disabled}
    type={props.type}
    maxLength={props.maxLength}
    min={props.min}
    />
)

Input.displayName = 'CustomInput';
export default Input;