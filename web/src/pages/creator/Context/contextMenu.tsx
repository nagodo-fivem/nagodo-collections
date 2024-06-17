import { useState } from "react";
import { ContextMenuProvider } from "./contextMenuProvider";
import "./context.scss";
import ImageExporter from "./Images Exporter/ImageExporter";
import ItemsExporter from "./Items Exporter/ItemsExporter";

export interface ContextMenuData {
    visible: boolean;
    position: { x: number, y: number };
}

interface ContextMenuProps {
    children: React.ReactNode;
}

export const ContextMenu = (props: ContextMenuProps) => {
    const [visible, setVisible] = useState(true);
    const [type, setType] = useState<string>("export-card-images");
    
    const [cardCollectionToExport, setCardCollectionToExport] = useState<number>(-1);

    function openDeletePropertyContextMenu() {
        setType("delete-property");
        setVisible(true);
    }

    function openExportCardImagesContextMenu(collectionIdentifier: number) {
        setType("export-card-images");
        setVisible(true);
    }

    function openExportCardItemsContextMenu() {
        setType("export-card-items");
        setVisible(true);
    }

    function handleCancelClick() {
        setVisible(false);
    }

    function handleConfirmClick() {
        
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
}


const Context = ({visible, type, cancelClick, confirmClick, closeContext, cardCollectionToExport}: ContextProps) => {

    if (!visible) return null;

    function handleCloseContext() {
        closeContext();
    }

    return (
        <div className="contextmenu">

            {type === "delete-property" && (
                <div className="deleteproperty">
                    <div className="title"> Delete Property </div>

                    <div className="btns">
                        <div className="btn cancel" onClick={cancelClick}> 
                            <div className="text">
                                Cancel
                            </div>
                        </div>

                        <div className="btn save" onClick={confirmClick}> 
                            <div className="text">
                                Confirm
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {type === "export-card-images" && (
                <ImageExporter collectionIdentifier={cardCollectionToExport} closeContext={handleCloseContext}/>
            )}

            {type === "export-card-items" && (
                <ItemsExporter collectionIdentifier={cardCollectionToExport} closeContext = {handleCloseContext}/>
            )}

        </div>
    );
}

