import React, {useState} from 'react';
import './App.css';
import { fetchNui } from "@utils/fetchNui";
import { useNuiEvent } from "@hooks/useNuiEvent";
import { _T, setTranslations } from "@utils/translation";
import Creator from './creator/Creator';
import { isEnvBrowser } from '@utils/misc';
import Opener from './cardOpener/Opener';
import ShowCard from './showCard/ShowCard';


const App: React.FC = () => {
    const [showType, setShowType] = useState<string>(isEnvBrowser() ? "opener" : "");

    //NUI Hooks
    useNuiEvent<any>('setTranslations', (data) => { 
        setTranslations(JSON.parse(data));
    })

    useNuiEvent<any>('setShowType', (data) => {
        setShowType(data.type);
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

    if (showType === "") return null;
    
    window.addEventListener("keydown", keyHandler);

    return (
        <div className="App">

            {showType === "creator" && (
                <Creator />  
            )}

            {showType === "opener" && (
                <Opener />
            )}

            {showType === "showCard" && (
                <ShowCard />
            )}

        </div>
    );
}


export default App;

