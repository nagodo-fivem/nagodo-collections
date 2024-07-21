import Input from "@components/Input/Input";
import { useParent } from "../Context/contextMenuProvider";
import ICollection from "./ICollection";
import { _T } from "@utils/translation";

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
        openExportCardImagesContextMenu(selectedCollection.identifier, selectedCollection.label);
    }

    function handleExportItemsClick() {
        openExportCardItemsContextMenu(selectedCollection.identifier, selectedCollection.label);
    }

    if (!show) return null;

    return (
        <div className="editingcollection">
            <div className="element">
                <Input title = "Label" onChange={handleLabelChange} startValue = {selectedCollection.label}/>
            </div>

            <div className="element">
                <div className="title">
                    {_T("ACTIONS")}
                </div>
                <div className="button" onClick={handleEditCardsClick}>
                    <div className="label"><i className="fa-solid fa-folder-open"></i>{_T("EDIT_CARDS")}</div>
                </div>
                <div className="button" onClick={handleExportCardImagesClick}>
                    <div className="label"><i className="fa-solid fa-file-export"></i>{_T("EXPORT_CARD_IMAGES")}</div>
                </div>
                <div className="button" onClick={handleExportItemsClick}>
                    <div className="label"><i className="fa-solid fa-file-export"></i>{_T("EXPORT_ITEMS")}</div>
                </div>
            </div>

            <div className="buttons">
                <div className="btn cancel small" onClick={handleCancelClick}>
                    <div className="text">
                        {_T("CANCEL")}
                    </div>
                </div>
                <div className="btn delete small">
                    <div className="text">
                    {_T("DELETE")}
                    </div>
                </div>
                <div className="btn save small">
                    <div className="text">
                    {_T("SAVE")}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default EditingCollection;