import React, {useState} from 'react';
import '../../css/pages/adminmenu/adminmenu.css';
import { Navigation } from "./navigation";
import { AllCollections } from "./collections/collection-list";
import { CardEditor } from "./editor/card-editor";
import { PropertyEditor } from './properties/property-editor';


export function AdminMenu() {
    const [currentPage, setCurrentPage] = useState<string>("collections")

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

        if (currentPage === "properties") return (
            <div className="content">
                <div className='border'></div>
                <PropertyEditor />
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