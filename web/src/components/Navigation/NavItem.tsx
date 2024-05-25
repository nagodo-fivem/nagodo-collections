interface NavItemProps {
    label: string;
    selectedPage: string;
    callback: Function
}

const NavItem = ({label, selectedPage, callback}: NavItemProps) => {

    function handleClick() {
        callback(label.toLowerCase());
    }

    return (
        <div className={selectedPage === label.toLowerCase() ? "item selected" : "item"} onClick={handleClick}>
            {label}
        </div>
    )
}

export default NavItem;