import { useState } from "react";
import "./dropdown.scss";

interface DropDownProps {
    title: string;
    options: string[];
    onChange: (option: string) => void;
}

const DropDown = ({title, options, onChange}: DropDownProps) => {
    const [selected, setSelected] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    function handleClick() {
        setOpen(!open);
    }

    function handleOptionClick(option: string) {
        setSelected(option);
        setOpen(false);
        onChange(option);
    }

    function Content({show}: {show: boolean}) {
        if (!show) return null;
        return (
            <div className="options">
                {options.map((option, index) => {
                    return (
                        <Option option={option} currentSelection={selected} callback = {handleOptionClick}/>
                    )
                })}
            </div>
        )
    }

    function CurrentSelection() {

        return (
            <div className="currentselection" >
                {selected ? selected : "Select"}
            </div>
        )
    }

    return (
        <div className="dropdown" >
            <div className="title">
                {title}
            </div>
            <div className="wrapper" onClick={handleClick}>
                <CurrentSelection />
                <i className={"fa-solid fa-chevron-" + (open ? "up" : "down")}></i>
                <Content show={open}/>
            </div>
            
            
        </div>
    )
}

interface OptionProps {
    option: string;
    currentSelection: string; 
    callback: (option: string) => void;
}

function Option({option, currentSelection, callback}: OptionProps) {
    return (
        <div className="option" onClick={() => {callback(option)}}>
            <div className={"label" + (currentSelection.toLowerCase() === option.toLowerCase() ? " selected" : "")}>
                {option}
            </div>
        </div>
    )
}

export default DropDown;