import React, { useState } from 'react';
import '../../../css/pages/adminmenu/property-editor.css'


interface PropertyEditorProps {
    label: string;
}

function PropertySection(props: PropertyEditorProps) {
    const [expanded, setExpanded] = useState<boolean>(false);

    function Header() {
        
    }

    return (
        <div className="property-section">

        </div>
    );
}


export function PropertyEditor() {
    return (
        <div className="property-editor">
            <PropertySection label = "Backs"/>
            <PropertySection label = "Frames"/>
            <PropertySection label = "Elements" />
        </div>
    );
}