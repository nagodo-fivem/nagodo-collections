import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, SetTranslations } from "../utils/translation";
import { AdminMenu } from "./adminmenu";


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
                <AdminMenu />
            </div>
        )
    } else if (showType === "showcase") {

    } else if (showType === "openpack") {

    } else if (showType === "folder") {

    }
    return null;
}



// This is the entry point for the NUI
// function NuiHooks(): React.FC {
//     useNuiEvent<string>('opencontract', (data) => {
//         Data.menuType = "contract"
//         console.log("here1")
//         Refresh()
//     })
//     useNuiEvent<string>('closecontract', (data) => {
//         Data.menuType = ""
//         Refresh()
//     })
// }

export default App;


//Post 
// fetchNui<ReturnData>('getClientData').then(retData => {
//     console.log('Got return data from client scripts:')
//     console.dir(retData)
//     setClientData(retData)
//   }).catch(e => {
//     console.error('Setting mock data due to error', e)
//     setClientData({ x: 500, y: 300, z: 200})
//   })

//Receive Nui Message
