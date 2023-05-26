import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, SetTranslations } from "../utils/translation";

const App: React.FC = () => {
    const [showType, setShowType] = useState<string>("admin")

    //NUI Hooks
    useNuiEvent<any>('setTranslations', (data) => { 
        SetTranslations(JSON.parse(data));
    })

    useNuiEvent<any>('setShowType', (data) => {
        setShowType(data);
    })


    const keyHandler = (e: KeyboardEvent) => {
        if (["Escape"].includes(e.code)) { 
            EscapePressed();          
        }
    }

    function EscapePressed() {
        fetchNui("close_mdt");
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

function AdminMenu() {
    const [currentPage, setCurrentPage] = useState<string>("collections")

    function Navigation() {
        return (
            <div className="navigation">
                <div className="navbutton" onClick={() => {setCurrentPage("collections")}}>
                    <div className="navbutton-text">
                        <p><i className="fa-solid fa-bars"></i>Collections</p>
                    </div>
                </div>

                <div className="navbutton" onClick={() => {setCurrentPage("ting")}}>
                    <div className="navbutton-text">
                        <p>Ting her</p>
                    </div>
                </div>
            </div>
        );
    }
    
    function Content() {
        
        function Collections() {
            interface Collection {
                name: string;
                id: number;
            }

            const [allCollections, setAllCollections] = useState<Collection[]>([])
            const [addingNewCollection, setAddingNewCollection] = useState<boolean>(false)

            function LoadCollections() {
                fetchNui<Collection[]>('getAllCollections').then((response) => {
                    setAllCollections(response);
                })
            }

            LoadCollections();

            function NewCollection() {
                return (
                    <div className='collectionItem' onClick={() => {setAddingNewCollection(true)}}>
                        <i className="fa-solid fa-folder-plus icon"></i>
                        <p className='title'>New</p>
                    </div>
                )
            }

            function CollectionItem(props: any) {
                var name: string = props.name;

                if (name === undefined) name = "Name is undefined";

                var maxNameLength: number = 15;
                if (name.length > maxNameLength) name = name.substring(0, maxNameLength) + "...";
            
                return (
                    <div className='collectionItem'>
                        <i className="fa-solid fa-folder icon"></i>
                        <p className='title'>{name}</p>
                    </div>
                )
            }

            function AddNewCollection() {
                let newCollectionName: string = "";
                const [allCollectionNames, setAllCollectionNames] = useState<string[]>(["din mor"])
                const [currentResponse, setCurrentResponse] = useState<string>("")
                
                function NewCollectionInput(props: any) {
                    const [value, setValue] = useState<string>("")
                    const [currentError, setCurrentError] = useState<string>("")

                    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
                        setValue(e.target.value)
                        newCollectionName = value;

                        if (allCollectionNames.includes(e.target.value)) {
                            setCurrentError("Collection name already exists")
                        } else {
                            setCurrentError("")
                        }

                    }

                    return (
                        <div className='newCollectionInput'>
                            <p className='title'><i className={props.icon}></i>{props.title}</p>
                            <input type="text" value={value} onChange={handleChange} />
                            <p className='error'>{currentError}</p>
                            <p className='response'>{currentResponse}</p>
                        </div>
                    )
                }

                function acceptNewCollection() {
                    if (allCollectionNames.includes(newCollectionName)) return;

                    fetchNui<string>('createNewCollection', {
                        name: newCollectionName
                    }).then((response) => {
                        setCurrentResponse(response);
                        
                    })
                }

                function NewCollectionAccept() {

                    return (
                        <div className='newCollectionAccept' onClick={acceptNewCollection}>
                            <p className='title'>Accept</p>
                        </div>
                    )
                }

                return (
                    <div className='addNewCollection'>
                        <NewCollectionInput title = "Collection name" icon = "fa-solid fa-hashtag"/>
                        <NewCollectionAccept />
                    </div>
                );
            }

            function ReturnBtn() {
                return (
                    <div className='returnBtn' onClick={() => {setAddingNewCollection(false)}}>
                        
                        <p className='title'><i className="fa-solid fa-arrow-left icon"></i>Back</p>
                    </div>
                )
            }

            if (addingNewCollection) {
                return (
                    <div className='collections'>
                        <ReturnBtn />
                        <AddNewCollection />
                    </div>
                )
            } 
                

            return (
                <div className="collections">
                    <NewCollection />
                    {allCollections.map((collection) => (
                        <CollectionItem name={collection.name} key={collection.id} />
                    ))}
                </div>
            );
        }

        if (currentPage === "collections") return (
            <div className="content">
                <div className='border'></div>
                <Collections />
            </div>
        )

        return null;
    }

    return (
        <div className="adminmenu">
            <Navigation />
            <Content />
        </div>
    );
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
