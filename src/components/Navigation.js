import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Домашняя страница</Link>
                </li>
                <li>
                    <Link to='/mynotes'>Мои записи</Link>
                </li>
                <li>
                    <Link to='/likes'>Понравившиеся</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
