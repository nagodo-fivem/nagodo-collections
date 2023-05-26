import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { _T, SetTranslations } from "../utils/translation";

export function AdminMenu() {
    const [currentPage, setCurrentPage] = useState<string>("collections1")

    function Content() {
        let collections_loaded: boolean = false;
        
        function Collections() {

            const [adminCollections, setAdminCollections] = useState<Collection[]>([])
            const [allCollectionNames, setAllCollectionNames] = useState<string[]>([])
            
            const [addingNewCollection, setAddingNewCollection] = useState<boolean>(false)

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

            function CollectionItem(props: any) {
                var name: string = props.name;

                if (name === undefined) name = "Name is undefined";

                var maxNameLength: number = 15;
                if (name.length > maxNameLength) name = name.substring(0, maxNameLength) + "...";
            

                if (props.pressable) {
                    return (
                        <div className='collectionItem'>
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

            function AddNewCollection() {
                let newCollectionName: string = "";
                const [currentResponse, setCurrentResponse] = useState<string>("")
                
                function NewCollectionInput(props: any) {
                    const [value, setValue] = useState<string>("")
                    const [currentError, setCurrentError] = useState<string>("")

                    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
                        setValue(e.target.value)
                        newCollectionName = e.target.value;

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
            <Navigation setCurrentPage = {setCurrentPage} />
            <Content />
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