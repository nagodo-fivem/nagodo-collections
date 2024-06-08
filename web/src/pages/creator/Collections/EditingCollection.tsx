import Input from "../../../components/Input/Input";
import { useParent } from "../Context/contextMenuProvider";
import ICollection from "./ICollection";

interface EditingCollectionProps{
    show: boolean;
    cancelBtnCallback: () => void;
    selectedCollection: ICollection;
    changeCallback: (collection: ICollection) => void;
    handleEditCardsClick: () => void;
}

const EditingCollection = ({show, cancelBtnCallback, selectedCollection, changeCallback, handleEditCardsClick}: EditingCollectionProps) => {
    const { openExportCardImagesContextMenu, openExportCardItemsContextMenu } = useParent();


    function handleLabelChange(label: string) {
        changeCallback({...selectedCollection, label: label});
    }

    function handleCancelClick() {
        cancelBtnCallback();
    }

    function handleExportCardImagesClick() {
        openExportCardImagesContextMenu();
    }

    function handleExportItemsClick() {
        openExportCardItemsContextMenu();
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
                <div className="button" onClick={handleExportCardImagesClick}>
                    <div className="label"><i className="fa-solid fa-file-export"></i>Export card images</div>
                </div>
                <div className="button" onClick={handleExportItemsClick}>
                    <div className="label"><i className="fa-solid fa-file-export"></i>Export items</div>
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