import React, { useEffect } from "react";

const MyNotes = () => {
    useEffect(() => {
        document.title = 'Мои заметки';
    });

    return (
        <div>
            <p>Это страница моих заметок</p>
        </div>
    );
};

export default MyNotes;