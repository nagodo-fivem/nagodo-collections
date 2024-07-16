import { useState } from "react";
import { fetchNui } from "@utils/fetchNui";
import Input from "@components/Input/Input";

interface NewCollectionProps {
    show: boolean;
    cancelBtnCallback: () => void;
    handleNewCollectionCreated: () => void;
}

const NewCollection = ({show, cancelBtnCallback, handleNewCollectionCreated} : NewCollectionProps) => {
    const [label, setLabel] = useState("");


    function handleCancelClick() {
        console.log("cancel1");
        setLabel("");
        cancelBtnCallback();
    }

    function handleCreateCollectionClick() {
        fetchNui<any>("createCollection", {
            label: label,
        }).then((response) => {
            handleNewCollectionCreated();
        });
    }

    if (!show) return null;

    return (
        <div className="newcollection">
            <div className="element">
                <Input title = "Label" onChange={setLabel} />
            </div>

            <div className="buttons">
                <div className="btn cancel" onClick={handleCancelClick}>
                    <div className="text">
                        Cancel
                    </div>
                </div>
                <div className="btn save" onClick={handleCreateCollectionClick}>
                    <div className="text">
                        Create
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewCollection;