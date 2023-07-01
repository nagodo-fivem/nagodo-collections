import React, {useState} from 'react';
import '../../css/management.css';
import { Navigation } from "./m-navigation";
import { AllCollections } from "./m-collection-list";
import { CardEditor } from "./m-card-editor";


export function ManagementMenu() {
    const [currentPage, setCurrentPage] = useState<string>("editor")

    function Content() {
        
        if (currentPage === "collections") return (
            <div className="content">
                <div className='border'></div>
                <AllCollections />
            </div>
        )

        if (currentPage === "editor") return (
            <div className="content">
                <div className='border'></div>
                <CardEditor  />
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