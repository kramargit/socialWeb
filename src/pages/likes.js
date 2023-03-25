import React, { useEffect } from "react";

const Likes = () => {
    useEffect(() => {
        document.title = 'Понравившиеся';
    });

    return (
        <div>
            <p>Это страница понравившихся заметок</p>
        </div>
    );
};

export default Likes;