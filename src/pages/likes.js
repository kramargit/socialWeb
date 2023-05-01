import React, { useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

import NoteFeed from "../components/NoteFeed";
import { GET_MY_LIKES } from "../gql/query";

const Likes = () => {
    useEffect(() => {
        document.title = 'Понравившиеся';
    });

    const  { loading, error, data } = useQuery(GET_MY_LIKES);

    if (loading) return 'Загрузка...';
    if (error) return `Ошибка! ${error.message}`;
    if (data.me.likes.length !== 0) {
        return <NoteFeed notes={data.me.likes} />;
    } else {
        return <p>Нет понравившихся записей</p>;
    }
};

export default Likes;