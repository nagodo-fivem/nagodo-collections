import React, {useState} from 'react';
import { fetchNui } from "../../../utils/fetchNui";


function NewCollectionInput(props: {setNewCollectionName: Function, currentResponse: string, allCollectionNames: string[]}) {
    const [value, setValue] = useState<string>("")
    const [currentError, setCurrentError] = useState<string>("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
        props.setNewCollectionName(e.target.value);
        

        if (props.allCollectionNames === undefined) return;

        if (props.allCollectionNames.includes(e.target.value)) {
            setCurrentError("Collection name already exists")
        } else {
            setCurrentError("")
        }

    }

    return (
        <div className='newCollectionInput'>
            <p className='title'><i className="fa-solid fa-hashtag"></i>Collection name</p>
            <input type="text" value={value} onChange={handleChange} />
            <p className='error'>{currentError}</p>
            <p className='response'>{props.currentResponse}</p>
        </div>
    )
}

function ColorInput() {
    return (
        <div className='newCollectionInput'>
            <p className='title'><i className="fa-solid fa-hashtag"></i>Default health color</p>
        </div>
    )
}


interface AddNewCollectionProps {
    allCollectionsNames: string[];
    setAddingNewCollection: Function;
    fetchAllCollections: Function;
}

export function AddNewCollection(props: AddNewCollectionProps) {
    const [currentResponse, setCurrentResponse] = useState<string>("")

    let newCollectionName: string = "";

    function setNewCollectionName(name: string) {
        newCollectionName = name;
    }

    function getNewCollectionName() {
        return newCollectionName;
    }

    function handleAccept() {
        if (newCollectionName === "") return;

        if (props.allCollectionsNames.includes(newCollectionName)) return;

        fetchNui<any>('createNewCollection', {name: newCollectionName}).then(
            (response: string) => {
                props.setAddingNewCollection(false);
                props.fetchAllCollections();
            }
        );
    }

    return (
        <div className='addNewCollection'>
            <NewCollectionInput setNewCollectionName = {setNewCollectionName} currentResponse = {currentResponse} allCollectionNames = {props.allCollectionsNames}/>
            <ColorInput />
            <NewCollectionAcceptBtn getNewCollectionName={getNewCollectionName} allCollectionNames = {props.allCollectionsNames} callback = {handleAccept}/>
        </div>
    );
}


interface NewCollectionAcceptBtnProps {
    getNewCollectionName: Function;
    allCollectionNames: string[];
    callback: Function;
}

function NewCollectionAcceptBtn(props: NewCollectionAcceptBtnProps) {

    function handleClick() {
        props.callback();
    }

    return (
        <div className='newCollectionAccept' onClick={handleClick}>
            <p className='title'>Accept</p>
        </div>
    )
}




