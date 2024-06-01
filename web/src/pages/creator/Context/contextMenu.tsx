import { useState } from "react";
import { ContextMenuProvider } from "./contextMenuProvider";
import "./context.scss";

export interface ContextMenuData {
    visible: boolean;
    position: { x: number, y: number };
}

interface ContextMenuProps {
    children: React.ReactNode;
}

export const ContextMenu = (props: ContextMenuProps) => {
    const [visible, setVisible] = useState(false);
    const [type, setType] = useState<string>("delete-property");

    function openDeletePropertyContextMenu() {

        setVisible(true);
    }

    function handleCancelClick() {
        setVisible(false);
    }

    function handleConfirmClick() {
        
    }

    return (
        <ContextMenuProvider value = {{openDeletePropertyContextMenu: openDeletePropertyContextMenu}}>
            {props.children}
            <Context visible = {visible} type={type} cancelClick={handleCancelClick} confirmClick = {handleConfirmClick}/>
        </ContextMenuProvider>
    )
}


interface ContextProps {
    visible: boolean;
    type: string;
    cancelClick: () => void;
    confirmClick: () => void;
}


const Context = ({visible, type, cancelClick, confirmClick}: ContextProps) => {

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

        </div>
    );
}

