import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Settings = () => {
    useEffect(() => {
        document.title = 'Настройки';
    });

    return (
        <React.Fragment>
            <h1>Настройки</h1>
            <Link to='/registration'>Зарегистрировать пользователя</Link>
        </React.Fragment>
    );
};

export default Settings;