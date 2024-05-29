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
    const [visible, setVisible] = useState(true);
    const [type, setType] = useState<string>("delete-property");

    function openContextMenu() {

        setVisible(true);
    }

    function handleCancelClick() {
        setVisible(false);
    }

    return (
        <ContextMenuProvider value = {{openContextMenu: openContextMenu}}>
            {props.children}
            <Context visible = {visible} type={type} cancelClick={handleCancelClick}/>
        </ContextMenuProvider>
    )
}


interface ContextProps {
    visible: boolean;
    type: string;
    cancelClick: () => void;
}


const Context = ({visible, type, cancelClick}: ContextProps) => {

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

                        <div className="btn save"> 
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

