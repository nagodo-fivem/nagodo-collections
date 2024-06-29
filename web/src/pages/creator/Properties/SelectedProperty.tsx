import { useState } from "react";
import "./properties.scss";
import DropDown from "../../../components/Dropdown/Dropdown";
import { TypeDropdownOptions } from "./PropertiesOverview";
import Input from "../../../components/Input/Input";
import { getImagePath } from "../../../helpers/ItemImagePath";
import IProperty from "./IProperty";
import { useParent } from "../Context/contextMenuProvider";
import { fetchNui } from "../../../utils/fetchNui";

interface SelectedPropertyProps{
    show: boolean;
    cancelBtnCallback: () => void;
    selectedProperty: IProperty;
    handlePropertySaved: () => void;
    changeCallback: (property: IProperty) => void;
}

const SelectedProperty = ({show, cancelBtnCallback, selectedProperty, handlePropertySaved, changeCallback}: SelectedPropertyProps) => {
    const { openDeletePropertyContextMenu } = useParent();
    
    console.log(selectedProperty);
    console.log(selectedProperty.identifier);

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
        cancelBtnCallback();
    }


    function handleDeleteClick() {
        openDeletePropertyContextMenu(selectedProperty.identifier);
    }

    function handleSaveClick() {
        fetchNui<any>("saveProperty", {
            identifier: selectedProperty.identifier,
            type: selectedProperty.type,
            label: selectedProperty.label,
            image: selectedProperty.image
        }).then((response) => {
            handlePropertySaved();
        });
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
                <div className="btn delete small" onClick={handleDeleteClick}>
                    <div className="text">
                        Delete
                    </div>
                </div>
                <div className="btn save small" onClick={handleSaveClick}>
                    <div className="text">
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectedProperty;