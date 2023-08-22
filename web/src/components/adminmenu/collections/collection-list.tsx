import React, {useState} from 'react';
import { fetchNui } from "../../../utils/fetchNui";
import { ManageCollection } from './manage-collection';
import { AddNewCollection } from './add-new-collection';

interface Collection {
    name: string;
    id: number;
}

function NewCollection(props: {setAddingNewCollection: Function}) {
    return (
        <div className='collectionItem' onClick={() => {props.setAddingNewCollection(true)}}>
            <i className="fa-solid fa-folder-plus icon"></i>
            <p className='title'>New</p>
        </div>
    )
}

function CollectionItem(props: {name: string, pressable?: boolean, setManageCollection?: Function}) {
    var name: string = props.name;

    if (name === undefined) name = "Name is undefined";

    var maxNameLength: number = 15;
    if (name.length > maxNameLength) name = name.substring(0, maxNameLength) + "...";


    if (props.pressable) {
        
        return (
            <div className='collectionItem' onClick={() => {
                if (props.setManageCollection === undefined) return;
                props.setManageCollection(true)
                }}>
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

export function AllCollections() {
    const [allCollections, setAllCollections]          = useState<Collection[]> ([{name: "Test", id: 1}])
    const [allCollectionsNames, setAllCollectionNames] = useState<string[]>     (["din mor"])
    const [addingNewCollection, setAddingNewCollection] = useState<boolean>     (false)
    const [manageCollection, setManageCollection]       = useState<boolean>     (false)

    let collections_loaded: boolean = true;
    
    async function getAllCollections() {
        fetchNui<any>('getAllCollections', {}).then(
            (response) => {

                setAllCollections(response);

                var names = allCollections.map((collection) => {
                    return collection.name;
                })
    
                setAllCollectionNames(names);
            }
        );
    }
        
    if (!collections_loaded) {
        getAllCollections();
        collections_loaded = true;
        return (
            <div className="collections">
                <CollectionItem name= "Loading..." pressable = {false}/>
            </div>
        )
    }


    if (addingNewCollection) {
        return (
            <div className='collections'>
                <Actions children = {
                    <ReturnBtn event={setAddingNewCollection}/>
                }/>
                
                <AddNewCollection allCollectionsNames={allCollectionsNames} />
            </div>
        )
    } 

    if (manageCollection) {
        return (
            <div className='manageCollection'>
                <Actions children = {
                    <span>
                        <ReturnBtn event={setManageCollection}/> 
                        <ReturnBtn event={setManageCollection}/>

                    </span>
                    
                }/>
                <ManageCollection />  

            </div>
        );
    }

    return (
        <div className="collections">
            <NewCollection setAddingNewCollection={setAddingNewCollection}/>

            {allCollections.map((collection) => (
                <CollectionItem name={collection.name} key={collection.id} pressable = {true} setManageCollection={setManageCollection}/>
            ))}
        </div>
    );
}

function Actions(props: {children: React.ReactNode}) {
    return (
        <div className='actions'>
            {props.children}
        </div>
    )
}


function ReturnBtn(props: {event: Function}) {
    return (
        <div className='action' onClick={() => {props.event(false)}}>
            
            <p className='title'><i className="fa-solid fa-arrow-left icon"></i>Back</p>
        </div>
    )

   
}
