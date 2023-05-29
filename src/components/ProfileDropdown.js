import AccountCircle from '@mui/icons-material/AccountCircle';
import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const ProfileDropdown = ({ userName }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const history = useHistory();
    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const loggout = () => {
        localStorage.removeItem('token');
        history.push('/');
    }
    return (
        <div className="relative">
            <AccountCircle
                className="avatar-icon"
                style={{ fontSize: 40, cursor: 'pointer', color: "white" }}
                onClick={toggleDropdown}
            />
            <p className='text-white'>{userName}</p>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <NavLink
                        to="/editar-perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Editar Perfil
                    </NavLink>
                    <NavLink
                        to="/editar-perfil"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Historico de pedidos
                    </NavLink>
                    <div
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => loggout()}
                    >
                        Sair
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
