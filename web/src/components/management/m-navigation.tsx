

export function Navigation(props: any) {

    function NavButton(props: {onclick: Function, onclickInput: string, label: string}) {
        return (
            <div className="navbutton" onClick={() => {props.onclick( props.onclickInput )}}>
                <div className="navbutton-text">
                    <p><i className="fa-solid fa-bars"></i>{ props.label }</p>
                </div>
            </div>
        )
    }

    return (
        <div className="navigation">
            <NavButton onclick={props.setCurrentPage} onclickInput="collections" label={"Collections"} />
            <NavButton onclick={props.setCurrentPage} onclickInput="ting" label={"Ting her"} />
        </div>
    );
}
