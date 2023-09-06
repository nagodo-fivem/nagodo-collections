import exp from "constants";
import { useState } from "react";

interface CardTextInputProps {
    title: string;
    type?: string;
    value: string | number;
    onChange: Function;
}

export function CardProperty(props: CardTextInputProps) {  
    const [expanded, setExpanded] = useState<boolean>(true);

    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.value);
    }

    function handleColorChange(e: React.ChangeEvent<HTMLInputElement>) {

    }
    
    function handleExpand() {
        setExpanded(!expanded);
    }
    

    function getClassName() {
        return expanded ? "card-text-input expanded" : "card-text-input";
    }

    function getIconClassName() {
        return expanded ? "fa-solid fa-chevron-up expand" : "fa-solid fa-chevron-down expand";
    }

    function getAdditionalClassName() {
        return expanded ? "additional expanded" : "additional";
    }


    return (
        <div className = {getClassName()}>
            <p className='title'>{props.title}</p>

            <i className = {getIconClassName()} onClick={handleExpand}></i>

            <input type = {props.type} value={props.value} onChange={handleChange} autoComplete='none'/>

            <div className = {getAdditionalClassName()}>
                <p className='color'>Color</p>
                <div className='current-color-preview'></div>
                <p className='use-default'>Use default collection color</p>
                <input className='use-default-checkbox' type = "checkbox" />
            </div>
        </div>
    );
}