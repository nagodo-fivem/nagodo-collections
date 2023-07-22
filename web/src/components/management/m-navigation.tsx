interface NavigationProps {
    setCurrentPage: Function;
}

interface NavButtonProps {
    onclick: Function;
    onclickInput: string;
    label: string;
}

function NavButton(props: NavButtonProps) {
    return (
        <div className="navbutton" onClick={() => {props.onclick( props.onclickInput )}}>
            <div className="navbutton-text">
                <p><i className="fa-solid fa-bars"></i>{ props.label }</p>
            </div>
        </div>
    )
}

export function Navigation(props: NavigationProps) {


    return (
        <div className="navigation">
            <NavButton onclick={props.setCurrentPage} onclickInput="collections" label={"Collections"} />
            <NavButton onclick={props.setCurrentPage} onclickInput="editor" label={"Editor"} />
        </div>
    );
}
