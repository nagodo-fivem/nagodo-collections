import Input from "../../../components/Input/Input";
import ICollection from "./ICollection";

interface EditingCollectionProps{
    show: boolean;
    cancelBtnCallback: () => void;
    selectedCollection: ICollection;
    changeCallback: (collection: ICollection) => void;
    handleEditCardsClick: () => void;
}

const EditingCollection = ({show, cancelBtnCallback, selectedCollection, changeCallback, handleEditCardsClick}: EditingCollectionProps) => {
    
    function handleLabelChange(label: string) {
        changeCallback({...selectedCollection, label: label});
    }

    function handleCancelClick() {
        cancelBtnCallback();
    }

    if (!show) return null;

    return (
        <div className="editingcollection">
            <div className="element">
                <Input title = "Label" onChange={handleLabelChange} startValue = {selectedCollection.label}/>
            </div>

            <div className="element">
                <div className="title">
                    Actions
                </div>
                <div className="button" onClick={handleEditCardsClick}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>Edit Cards</div>
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

export default EditingCollection;