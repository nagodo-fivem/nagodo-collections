import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, SetTranslations } from "../utils/translation";
import { ManagementMenu } from "./management/m-menu";


const App: React.FC = () => {
    const [showType, setShowType] = useState<string>("admin")

    //NUI Hooks
    useNuiEvent<any>('setTranslations', (data) => { 
        SetTranslations(JSON.parse(data));
    })

    useNuiEvent<any>('setShowType', (type) => {
        setShowType(type);
    })

    const keyHandler = (e: KeyboardEvent) => {
        if (["Escape"].includes(e.code)) { 
            EscapePressed();          
        }
    }

    function EscapePressed() {
        fetchNui<string>('close', {}).then(
            (response) => {
                setShowType("");
            }
        );

    }
    

    window.addEventListener("keydown", keyHandler)


    if (showType === "admin") {
        return (
            <div className="App">
                <ManagementMenu />
            </div>
        )
    } else if (showType === "showcase") {

    } else if (showType === "openpack") {

    } else if (showType === "folder") {

    }
    return null;
}


export default App;

