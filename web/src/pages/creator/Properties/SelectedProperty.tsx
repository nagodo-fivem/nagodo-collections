import { useState } from "react";
import IProperty from "./IProperty";
import "./properties.scss";
import DropDown from "../../../components/Dropdown/Dropdown";
import { TypeDropdownOptions } from "./PropertiesOverview";
import Input from "../../../components/Input/Input";
import { getImagePath } from "../../../helpers/ItemImagePath";

interface SelectedPropertyProps{
    show: boolean;
    cancelBtnCallback: () => void;
    selectedProperty: IProperty;
    changeCallback: (property: IProperty) => void;
}

const SelectedProperty = ({show, cancelBtnCallback, selectedProperty, changeCallback}: SelectedPropertyProps) => {
    

    function handleTypeChange(type: string) {
        changeCallback({...selectedProperty, type: type});
    }

    function handleLabelChange(label: string) {
        changeCallback({...selectedProperty, label: label});
    }

    function handleImageChange(image: string) {
        changeCallback({...selectedProperty, image: image});
    }

    function handleCancelClick() {

    }


    function getImage(path: string) {
        if (path.match('http')) {
            return path;
        } else {
            return getImagePath(path);
        }
    }

    if (!show) return null;

    return (
        <div className="newproperty">
            <div className="element">
                <DropDown title = "Type" options = {TypeDropdownOptions} currentValue = {selectedProperty.type} onChange={handleTypeChange}/>
            </div>
            <div className="element">
                <Input title = "Label" onChange={handleLabelChange} startValue = {selectedProperty.label}/>
            </div>
            <div className="element">
                <Input title = "Image" placeholder="Link or path" onChange={handleImageChange} startValue = {selectedProperty.image}/>
            </div>

            <div className="element">
                <div className="preview">

                    {selectedProperty.image === "" && (
                        <div className="noimage">
                            No image found
                        </div>
                    
                    )}
                    {selectedProperty.image != "" && (

                        <img src={getImage(selectedProperty.image)} alt=""></img>
                    )}
                </div>
            </div>

            <div className="buttons">
                <div className="btn cancel small" onClick={handleCancelClick}>
                    <div className="text">
                        Cancel
                    </div>
                </div>
                <div className="btn delete small">
                    <div className="text">
                        Delete
                    </div>
                </div>
                <div className="btn save small">
                    <div className="text">
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedProperty;