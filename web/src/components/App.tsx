import React, {useState} from 'react';
import '../css/pages/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, setTranslations } from "../utils/translation";
import { AdminMenu } from "./adminmenu/admin-menu";
import { OpenPackMenu } from "./packageopener/op-menu";


const App: React.FC = () => {
    const [showType, setShowType] = useState<string>("openpack")

    //NUI Hooks
    useNuiEvent<any>('setTranslations', (data) => { 
        setTranslations(JSON.parse(data));
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
      
        content = <AdminMenu />
        
    } else if (showType === "showcase") {

    } else if (showType === "openpack") {
        
        content = <OpenPackMenu cardAmount={5} />

    } else if (showType === "folder") {

    }
    return (
        <div className="App">
            {content}
        </div>
    );
}


export default App;

