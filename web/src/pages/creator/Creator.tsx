import { useState } from 'react';
import NavBar from '../../components/Navigation/NavBar';
import './creator.scss';

const Creator = () => {
    const [selectedPage, setSelectedPage] = useState<string>("collections");

    function handleNavItemPressed(page: string) {
        setSelectedPage(page);
    }

    return (
        <div className='creator'>
            <NavBar selectedPage = {selectedPage} navigationCallback = {handleNavItemPressed} />
        </div>
    )
}

export default Creator;