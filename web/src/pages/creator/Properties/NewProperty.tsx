import { useState } from "react";
import { getImagePath } from "../../../helpers/ItemImagePath";
import DropDown from "../../../components/Dropdown/Dropdown";
import Input from "../../../components/Input/Input";
import { TypeDropdownOptions } from "./PropertiesOverview";

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
                <DropDown title = "Type" options = {TypeDropdownOptions} onChange={setType}/>
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
                        Create
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProperty;