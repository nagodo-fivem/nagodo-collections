import React, { useState } from 'react';
import { PropertySection } from './property-section';
import '../../../css/pages/adminmenu/property-editor.css'


export function PropertyEditor() {
    return (
        <div className="property-editor">
            <PropertySection label = "Backs"/>
            <PropertySection label = "Frames"/>
            <PropertySection label = "Elements" />
        </div>
    );
}