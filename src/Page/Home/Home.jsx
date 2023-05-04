import React, { useMemo, useState } from "react";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState({});

    const getPokemons = async () => {
        setIsLoading(true);
        try {
            await fetch("https://localhost:8000/api/pokemon", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setPokemons(data);
                    console.log(data);
                })
                .catch((error) => {
                    console.error(error);
                });
        } finally {
            setIsLoading(false);
            //code
        }
    };

    useMemo(() => getPokemons(), []);

    return (
        <div>
            Home page
            {isLoading ? (
                <p>Loading</p>
            ) : (
                <ul>
                    {pokemons["hydra:member"].map((item) => {
                        return (
                            <li key={item.id}>
                                {item.id} : {item.name}
                                <img src={item.front_default} alt={'photo de : ' + item.name}/>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default HomePage;
