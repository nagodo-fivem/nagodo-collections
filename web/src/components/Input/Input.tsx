import { useState } from "react";
import "./input.scss";

interface InputProps {
    title: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

const Input = ({title, placeholder, onChange}: InputProps) => {

    function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value);
    }

    return (
        <div className="input-element" >
            <div className="title">
                {title}
            </div>
            <div className="wrapper">
                <input className="input" onChange={handleChange} type="text" placeholder={placeholder ? placeholder : "Enter..."}/>
            </div>
            
            
        </div>
    )
}

export default Input;