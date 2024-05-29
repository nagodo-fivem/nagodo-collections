import { useState } from "react";
import "./dropdown.scss";

interface DropDownProps {
    title: string;
    options: IOption[];
    onChange: (option: string) => void;
    currentValue?: string;
}

export interface IOption {
    identifier: string;
    label: string;
}

const DropDown = ({title, options, onChange, currentValue}: DropDownProps) => {
    const [selected, setSelected] = useState<IOption>({identifier: "", label: ""});
    const [open, setOpen] = useState<boolean>(false);
    const [init, setInit] = useState<boolean>(false);
    const [lastCurrentValue, setLastCurrentValue] = useState<string>("");

    function handleClick() {
        setOpen(!open);
    }

    function handleOptionClick(option: IOption) {
        setSelected(option);
        setOpen(false);
        onChange(option.identifier);
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

        if (currentValue && currentValue !== lastCurrentValue) {
            setInit(false);
        }

        if (currentValue && !init) {
            setLastCurrentValue(currentValue);
            let selected = options.find(option => option.identifier.toLowerCase() === currentValue.toLowerCase());
            setSelected(selected ? selected : {identifier: "", label: ""});
            setInit(true);
        }

        return (
            <div className="currentselection" >
                {selected.identifier !== "" ? selected.label : "Select"}
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
    option: IOption;
    currentSelection: IOption; 
    callback: (option: IOption) => void;
}

function Option({option, currentSelection, callback}: OptionProps) {
    return (
        <div className="option" onClick={() => {callback(option)}}>
            <div className={"label" + (currentSelection.identifier.toLowerCase() === option.identifier.toLowerCase() ? " selected" : "")}>
                {option.label}
            </div>
        </div>
    )
}

export default DropDown;