import { useState } from "react";
import { ContextMenuProvider } from "./contextMenuProvider";
import "./context.scss";
import ImageExporter from "./Images Exporter/ImageExporter";

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

    function openExportCardImagesContextMenu() {
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

    cardCollectionToExport: number;
}


const Context = ({visible, type, cancelClick, confirmClick, cardCollectionToExport}: ContextProps) => {

    if (!visible) return null;

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
                <ImageExporter collectionIdentifier={cardCollectionToExport}/>
            )}

        </div>
    );
}

