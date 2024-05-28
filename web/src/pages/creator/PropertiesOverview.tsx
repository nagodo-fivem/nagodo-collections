import { useState } from "react";
import { getImagePath } from "../../helpers/ItemImagePath";
import DropDown from "../../components/Dropdown/Dropdown";
import Input from "../../components/Input/Input";
import  IProperty from "./IProperty";

interface PropertiesOverviewProps {
    properties: IProperty[];
}

let emptyProperty: IProperty = {identifier: 0, type: "", label: "", image: ""};

const PropertiesOverview = ({properties}: PropertiesOverviewProps) => {
    const [addingProperty, setAddingProperty] = useState(false);
    const [editingProperty, setEditingProperty] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState<IProperty>(emptyProperty);

    function handleNewPropertyBtn() {
        setAddingProperty(true);
        setEditingProperty(false);
    }

    function handleCancelClick() {
        setAddingProperty(false);
        setEditingProperty(false);
        setSelectedProperty(emptyProperty);
    }

    function handlePropertyClick(property: IProperty) {
        setAddingProperty(false);
        setEditingProperty(true);
        console.log(property);
        setSelectedProperty(property);
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

                <NewProperty show = {addingProperty} cancelBtnCallback = {handleCancelClick}/>
                <SelectedProperty show = {editingProperty} cancelBtnCallback = {handleCancelClick} selectedProperty={selectedProperty}/>

                <Action type = {"button"} label = "New property" onClick = {handleNewPropertyBtn}/>
                
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

    function validateImage(image: string) {
        if (image.match('http')) {
            return image;
        } else {
            return getImagePath(image);
        }
    }

    return (
        <img src={validateImage(image)} alt=""></img>
    )
}

interface ActionProps {
    type: "button" | "input";
    label: string;
    onClick?: () => void;
}

const Action = ({type, label, onClick}: ActionProps) => {

    if (type === "input") {
        return (
            <div className="action">
    
            </div>
        )
    }

    //Button
    return (
        <div className="action button" onClick={onClick}>
            <div className="label">
                {label}
            </div>
        </div>
    )
}

interface SelectedPropertyProps{
    show: boolean;
    cancelBtnCallback: () => void;
    selectedProperty: IProperty;
}

const SelectedProperty = ({show, cancelBtnCallback, selectedProperty}: SelectedPropertyProps) => {
    
    if (!show) return null;
    return (
        null
    )
}

interface NewPropertyProps {
    show: boolean;
    cancelBtnCallback: () => void;
}

const NewProperty = ({show, cancelBtnCallback} : NewPropertyProps) => {
    const [type, setType] = useState("frame");
    const [identifier, setIdentifier] = useState("");
    const [label, setLabel] = useState("");
    const [image, setImage] = useState(getImagePath(""));

    function handleImageChange(path: string) {
        if (path.match('http')) {
            setImage(path);
        } else {
            setImage(getImagePath(path));
        }
    }

    function handleCancelClick() {
        setType("frame");
        setLabel("");
        setImage(getImagePath(""));
        cancelBtnCallback();
    }

    if (!show) return null;

    return (
        <div className="newproperty">
            <div className="element">
                <DropDown title = "Type" options = {["Frame", "Element" ,"Overlay","Back" ]} onChange={setType}/>
            </div>
            <div className="element">
                <Input title = "Label" onChange={setLabel} />
            </div>
            <div className="element">
                <Input title = "Image" placeholder="Link or path" onChange={handleImageChange} />
            </div>
            <div className="element">
                <div className="preview">

                    {image === "" && (
                        <div className="noimage">
                            No image found
                        </div>
                    
                    )}
                    {image != "" && (

                        <img src={image} alt=""></img>
                    )}
                </div>
            </div>

            <div className="buttons">
                <div className="btn cancel" onClick={handleCancelClick}>
                    <div className="text">
                        Cancel
                    </div>
                </div>
                <div className="btn save">
                    <div className="text">
                        Save
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PropertiesOverview;