import { useState } from "react";

interface PropertyEditorProps {
    label: string;
}

function Content(props: {shouldShow: boolean}) {
    if (!props.shouldShow) return null;

    return (
        <div className='section-content'>

        </div>
    )
}

export function PropertySection(props: PropertyEditorProps) {
    const [expanded, setExpanded] = useState<boolean>(true);

    function Header(props: {label: string, callback: Function}) {

        function getIconName() {
            return expanded ? 'fa-solid fa-chevron-up' : 'fa-solid fa-chevron-down';
        }

        return (
            <div className='header' onClick={() => {props.callback(!expanded)}}>
                <p className='title'>{props.label}</p>

                <i className = {getIconName()}></i>
            </div>
        );
    }

    

    return (
        <div className="property-section">
            <Header label = {props.label} callback={setExpanded} />
            <Content shouldShow = {expanded}/>
        </div>
    );
}