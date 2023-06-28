import React, {useState} from 'react';
import '../css/App.css';
import { fetchNui } from "../../utils/fetchNui";
import { useNuiEvent } from "../../hooks/useNuiEvent";
import { Navigation } from "./m-navigation";
import { AllCollections } from "./m-collection-list";


export function ManagementMenu() {
    const [currentPage, setCurrentPage] = useState<string>("collections1")

    function Content() {
        let collections_loaded: boolean = false;
        
        function Collections() {

          
            

            

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

           
        }

        if (currentPage === "collections") return (
            <div className="content">
                <div className='border'></div>
                <AllCollections />
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