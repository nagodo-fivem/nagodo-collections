import { useState } from "react";
import { ContextMenuProvider } from "./contextMenuProvider";
import "./context.scss";
import ImageExporter from "./ImagesExporter/ImageExporter";
import ItemsExporter from "./ItemsExporter/ItemsExporter";
import { fetchNui } from "@utils/fetchNui";
import { _T } from "@utils/translation";

export interface ContextMenuData {
    visible: boolean;
    position: { x: number, y: number };
}

interface ContextMenuProps {
    children: React.ReactNode;
}

export const ContextMenu = (props: ContextMenuProps) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<string>("export-card-images");
    
    const [cardCollectionToExport, setCardCollectionToExport] = useState<number>(-1);
    const [cardCollectionName, setCardCollectionName] = useState<string>("");
    const [propertyToDelete, setPropertyToDelete] = useState<number>(-1);

    function openDeletePropertyContextMenu(propertyIdentifier: number) {
        setType("delete-property");
        setPropertyToDelete(propertyIdentifier);
        setVisible(true);
    }

    function openExportCardImagesContextMenu(collectionIdentifier: number, collectionName: string) {
        setCardCollectionName(collectionName);
        setCardCollectionToExport(collectionIdentifier);
        setType("export-card-images");
        setVisible(true);
    }

    function openExportCardItemsContextMenu(collectionIdentifier: number, collectionName: string) {
        setCardCollectionName(collectionName);
        setCardCollectionToExport(collectionIdentifier);
        setType("export-card-items");
        setVisible(true);
    }

    function handleCancelClick() {
        setVisible(false);
    }

    function handleConfirmClick() {
        if (type === "delete-property") {
            fetchNui<any>("deleteProperty", {
                identifier: propertyToDelete
            }).then((response) => {
                setVisible(false);
            });
        }
    }

    return (
        <ContextMenuProvider value = {{
                openDeletePropertyContextMenu: openDeletePropertyContextMenu, 
                openExportCardImagesContextMenu: openExportCardImagesContextMenu,
                openExportCardItemsContextMenu: openExportCardItemsContextMenu
            }}>
            {props.children}
            <Context 
                visible = {visible} 
                type={type} 
                cancelClick={handleCancelClick} 
                confirmClick = {handleConfirmClick}
                closeContext = {handleCancelClick}
                cardCollectionToExport = {cardCollectionToExport}
                cardCollectionName = {cardCollectionName}
            />
        </ContextMenuProvider>
    )
}


interface ContextProps {
    visible: boolean;
    type: string;
    cancelClick: () => void;
    confirmClick: () => void;
    closeContext: () => void;

    cardCollectionToExport: number;
    cardCollectionName: string;
}


const Context = ({visible, type, cancelClick, confirmClick, closeContext, cardCollectionToExport, cardCollectionName}: ContextProps) => {

    if (!visible) return null;

    function handleCloseContext() {
        closeContext();
    }

    return (
        <div className="contextmenu">

            {type === "delete-property" && (
                <div className="deleteproperty">
                    <div className="title"> {_T('DELETE_PROPERTY')} </div>

                    <div className="btns">
                        <div className="btn cancel" onClick={cancelClick}> 
                            <div className="text">
                            {_T('CANCEL')}
                            </div>
                        </div>

                        <div className="btn save" onClick={confirmClick}> 
                            <div className="text">
                            {_T('CONFIRM')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {type === "export-card-images" && (
                <ImageExporter collectionIdentifier={cardCollectionToExport} closeContext={handleCloseContext}/>
            )}

            {type === "export-card-items" && (
                <ItemsExporter collectionIdentifier={cardCollectionToExport} collectionName={cardCollectionName} closeContext = {handleCloseContext}/>
            )}

        </div>
    );
}

