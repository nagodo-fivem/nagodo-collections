import NavItem from "./NavItem";
import "./navbar.scss";

interface NavBarProps {
    selectedPage: string;
    navigationCallback: (page: string) => void;
}

const NavBar = ({selectedPage, navigationCallback}: NavBarProps) => {
    return (
        <div className="navbar">
            <NavItem label="Collections" selectedPage={selectedPage} callback={navigationCallback} />
            <NavItem label="Properties" selectedPage={selectedPage} callback={navigationCallback} />
        </div>
    )
}

export default NavBar;