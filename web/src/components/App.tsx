import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, SetTranslations } from "../utils/translation";
import { ManagementMenu } from "./management/m-menu";
import { OpenPackMenu } from "./openpack/op-menu";


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

    let content;
    if (showType === "admin") {
      
        content = <ManagementMenu />
        
    } else if (showType === "showcase") {

    } else if (showType === "openpack") {
        
        content = <OpenPackMenu amount={8} />

    } else if (showType === "folder") {

    }
    return (
        <div className="App">
            {content}
        </div>
    );
}


export default App;

