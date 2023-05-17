import React, { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

const Pokemon = () => {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});

    const getPokemons = async () => {
        setIsLoading(true);
        try {
            await fetch(`https://localhost:8000/api/pokemon?id=${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        switch (res.status) {
                            case 401:
                                return Navigate("/login");
                        }
                    }
                    return res.json();
                })
                .then((data) => {
                    setPokemon(data);
                    console.log(data);
                    setIsLoading(false);
                });
        } catch (error) {
            throw new error();
        } finally {
            //code
            console.log(pokemon);
        }
    };

    useMemo(() => getPokemons(), [id]);

    return (
        <>
            <Link to="/">Home</Link>
            <Link to={`/pokemon/${parseInt(id) - 1}`}>&lt;</Link>
            <Link to={`/pokemon/${parseInt(id) + 1}`}>&gt;</Link>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                pokemon["hydra:member"].map((item) => {
                    return (
                        <div key={item.id}>
                            <p>#{id.toString().padStart(3, "0")}</p>
                            <img
                                loading="lazy"
                                src={item.front_default}
                                alt={"photo de : " + item.name}
                            />
                            <p>{item.name}</p>
                        </div>
                    );
                })
            )}
        </>
    );
};

export default Pokemon;
