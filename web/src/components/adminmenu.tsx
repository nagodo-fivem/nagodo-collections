import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, SetTranslations } from "../utils/translation";
import { Card } from "./card";

export function AdminMenu() {
    const [currentPage, setCurrentPage] = useState<string>("collections1")

    function Content() {
        let collections_loaded: boolean = false;
        
        function Collections() {

            const [adminCollections, setAdminCollections] = useState<Collection[]>([{name: "Test", id: 1}])
            const [allCollectionNames, setAllCollectionNames] = useState<string[]>(["din mor"])
            
            const [addingNewCollection, setAddingNewCollection] = useState<boolean>(false)
            const [manageCollection, setManageCollection] = useState<boolean>(true)

            interface Collection {
                name: string;
                id: number;
            }
          
            function NewCollection() {
                return (
                    <div className='collectionItem' onClick={() => {setAddingNewCollection(true)}}>
                        <i className="fa-solid fa-folder-plus icon"></i>
                        <p className='title'>New</p>
                    </div>
                )
            }

            function CollectionItem(props: {name: string, pressable?: boolean}) {
                var name: string = props.name;

                if (name === undefined) name = "Name is undefined";

                var maxNameLength: number = 15;
                if (name.length > maxNameLength) name = name.substring(0, maxNameLength) + "...";
            

                if (props.pressable) {
                    return (
                        <div className='collectionItem' onClick={() => {setManageCollection(true)}}>
                            <i className="fa-solid fa-folder icon"></i>
                            <p className='title'>{name}</p>
                        </div>
                    )
                }

                return (
                    <div className='collectionItem' onClick={() => {}}>
                        <i className="fa-solid fa-folder icon"></i>
                        <p className='title'>{name}</p>
                    </div>
                )
            }

            

            if (addingNewCollection) {
                return (
                    <div className='collections'>
                        <ReturnBtn type = {"collections"} setAddingNewCollection={setAddingNewCollection}/>
                        <AddNewCollection allCollectionNames={allCollectionNames} />
                    </div>
                )
            } 

            if (manageCollection) {
                return (
                    <div className='manageCollection'>
                        <ReturnBtn type = {"manageCollection"} setManageCollection={setManageCollection}/>
                        <ManageCollection />  

                    </div>
                );
            }

            async function getAdminCollections() {
                fetchNui<any>('getAdminCollections', {}).then(
                    (response) => {
                        console.log(response);
                        setAdminCollections(response);

                        var names = adminCollections.map((collection) => {
                            return collection.name;
                        })
                        console.log(names);
                        setAllCollectionNames(names);
                    }
                );
            }
                
            if (collections_loaded === false) {
                getAdminCollections();
                collections_loaded = true;
                return (
                    <div className="collections">
                        <CollectionItem name= "Loading..." />
                    </div>
                )
            }

            return (
                <div className="collections">
                    <NewCollection />
                    {adminCollections.map((collection) => (
                        <CollectionItem name={collection.name} key={collection.id} pressable = {true}/>
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
            <Navigation setCurrentPage = {setCurrentPage} />
            <Content />
        </div>
    );
}

function ManageCollection() {
    return (
        <div className='allCards'>
            <Card size = {2}/>
            <Card size = {1}/>
            <Card size = {1}/>
        </div>
    );
}


function AddNewCollection(mainProps: {allCollectionNames: string[]}) {
    let newCollectionName: string = "";
    const [currentResponse, setCurrentResponse] = useState<string>("")
    
    function NewCollectionInput(props: any) {
        const [value, setValue] = useState<string>("")
        const [currentError, setCurrentError] = useState<string>("")

        function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
            setValue(e.target.value)
            newCollectionName = e.target.value;

            if (mainProps.allCollectionNames === undefined) return;

            if (mainProps.allCollectionNames.includes(e.target.value)) {
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
        if (mainProps.allCollectionNames != undefined) {
            if (mainProps.allCollectionNames.includes(newCollectionName)) return;
        };

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



function Navigation(props: any) {
    return (
        <div className="navigation">
            <div className="navbutton" onClick={() => {props.setCurrentPage("collections")}}>
                <div className="navbutton-text">
                    <p><i className="fa-solid fa-bars"></i>Collections</p>
                </div>
            </div>

            <div className="navbutton" onClick={() => {props.setCurrentPage("ting")}}>
                <div className="navbutton-text">
                    <p>Ting her</p>
                </div>
            </div>
        </div>
    );
}

function ReturnBtn(props: {type: string, setAddingNewCollection?: any, setManageCollection?: any}) {
    if (props.type === "collections") {
        return (
            <div className='returnBtn' onClick={() => {props.setAddingNewCollection(false)}}>
                
                <p className='title'><i className="fa-solid fa-arrow-left icon"></i>Back</p>
            </div>
        )
    }
    else if (props.type === "manageCollection") {
        return (
            <div className='returnBtn' onClick={() => {props.setManageCollection(false)}}>
                
                <p className='title'><i className="fa-solid fa-arrow-left icon"></i>Back</p>
            </div>
        )
    }


    return null;
}