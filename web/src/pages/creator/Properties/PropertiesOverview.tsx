import { useState } from "react";
import { getImagePath } from "../../../helpers/ItemImagePath";
import DropDown, { IOption } from "../../../components/Dropdown/Dropdown";
import Input from "../../../components/Input/Input";
import NewProperty from "./NewProperty";
import SelectedProperty from "./SelectedProperty";
import IProperty from "./IProperty";
import Action from "../Action/Action";

interface PropertiesOverviewProps {
    properties: IProperty[];
}

let emptyProperty: IProperty = {identifier: 0, type: "", label: "", image: ""};
let currentSelectedProperty: IProperty = {identifier: 0, type: "", label: "", image: ""};
export const TypeDropdownOptions: IOption[] = [{identifier: "frame", label: "Frame"}, {identifier: "element", label: "Element"}, {identifier: "image-overlay", label: "Overlay"}, {identifier: "back", label: "Back"}];

const PropertiesOverview = ({properties}: PropertiesOverviewProps) => {
    const [addingProperty, setAddingProperty] = useState(false);
    const [editingProperty, setEditingProperty] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<IProperty>(emptyProperty);

    function handleNewPropertyBtn() {
        setAddingProperty(true);
        setEditingProperty(false);
    }

    function handleNewPropertyCreated() {
        setAddingProperty(false);
    }

    function handleCancelClick() {
        setAddingProperty(false);
        setEditingProperty(false);
        setSelectedProperty(emptyProperty);
    }

    function handlePropertyClick(property: IProperty) {
        setAddingProperty(false);
        setEditingProperty(true);
        setSelectedProperty(property);
        currentSelectedProperty = property;
    }

    function handlePropertyChange(property: IProperty) {
        currentSelectedProperty = property;
    }

    function getFrameProperties() {
        return properties.filter(property => property.type === "frame");
    }

    function getElementProperties() {
        return properties.filter(property => property.type === "element");
    }

    function getBackProperties() {
        return properties.filter(property => property.type === "back");
    }

    function getImageOverlayProperties() {
        return properties.filter(property => property.type === "image-overlay");
    }

    return (
        <div className="properties">

            <div className="overview">
                <Property title = {"Frames"} properties = {getFrameProperties()} onPropertyClick={handlePropertyClick}/>
                <Property title = {"Elements"} properties={getElementProperties()} onPropertyClick={handlePropertyClick}/>
                <Property title = {"Image overlays"} properties={getImageOverlayProperties()} onPropertyClick={handlePropertyClick}/>
            
                <Property title = {"Backs"} properties={getBackProperties()} onPropertyClick={handlePropertyClick}/>
            
            </div>
            <div className="actions">

                <NewProperty show = {addingProperty} cancelBtnCallback = {handleCancelClick} handleNewPropertyCreated = {handleNewPropertyCreated}/>
                <SelectedProperty show = {editingProperty} cancelBtnCallback = {handleCancelClick} selectedProperty={currentSelectedProperty} changeCallback = {handlePropertyChange}/>

                <Action label = "New property" onClick = {handleNewPropertyBtn}/>
                
            </div>
            
        </div>
    )
}

interface PropertyProps {
    title: string;
    properties: IProperty[];
    onPropertyClick: (property: IProperty) => void;
}

const Property = ({title, properties, onPropertyClick}: PropertyProps) => {


    function handlePropertyClick(property: IProperty) {
        onPropertyClick(property);
    }

    return (
        <div className="property">
            <div className="title">{title}</div>
            <div className="line"></div>

            <div className="elements">
                {properties.map((property, index) => {
                    return (
                        <div className="element" key={index} onClick={() => {handlePropertyClick(property)}}>
                            <PropertyImage image = {property.image}/>
                            <div className="label">
                                {property.label}
                            </div>

                        </div>
                    )
                })}

            </div>

        </div>
    )
}

interface PropertyImageProps {
    image: string;
}

const PropertyImage = ({image}: PropertyImageProps) => {


    return (
        <img src={getImagePath(image)} alt=""></img>
    )
}


export default PropertiesOverview;