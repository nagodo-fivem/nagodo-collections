import { _T } from "@utils/translation";
import NavItem from "./NavItem";
import "./navbar.scss";

interface NavBarProps {
    selectedPage: string;
    navigationCallback: (page: string) => void;
}

const NavBar = ({selectedPage, navigationCallback}: NavBarProps) => {
    return (
        <div className="navbar">
            <NavItem label = {_T("NAV_COLLECTIONS")} selectedPage={selectedPage} callback={navigationCallback} />
            <NavItem label = {_T("NAV_PROPERTIES")} selectedPage={selectedPage} callback={navigationCallback} />
            <NavItem label = {_T("NAV_ANIMATIONS")} selectedPage={selectedPage} callback={navigationCallback} />
        </div>
    )
}

export default NavBar;