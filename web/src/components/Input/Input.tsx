import { useState } from "react";
import "./input.scss";

interface InputProps {
    title: string;
    placeholder?: string;
    onChange: (value: string) => void;
    startValue?: string;
}

const Input = ({title, placeholder, onChange, startValue}: InputProps) => {
    const [currentValue, setCurrentValue] = useState<string>("");
    const [init, setInit] = useState<boolean>(false);
    const [lastCurrentValue, setLastCurrentValue] = useState<string>("");

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentValue(event.target.value);
        onChange(event.target.value);
    }

    function getValue() {
        if (startValue && startValue !== lastCurrentValue) {
            setInit(false);
        }

        if (startValue && !init) {
            setLastCurrentValue(startValue);
            setCurrentValue(startValue);
            setInit(true);
        }

        return currentValue;
    }

    return (
        <div className="input-element" >
            <div className="title">
                {title}
            </div>
            <div className="wrapper">
                <input className="input" value={getValue()} onChange={handleChange} type="text" placeholder={placeholder ? placeholder : "Enter..."}/>
            </div>
            
            
        </div>
    )
}

export default Input;