import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [pokemons, setPokemons] = useState({});
    const [page, setPage] = useState(1);

    const getPokemons = async () => {
        setIsLoading(true);
        try {
            await fetch(`https://localhost:8000/api/pokemon?page=${page}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("user")}`,
                },
            })
                .then((res) => {
                    if (!res.ok) {
                        switch (res.status) {
                            case 401:
                                return navigate("/login");
                        }
                    }
                    return res.json();
                })
                .then((data) => {
                    setPokemons(data);
                    console.log(data);
                    setIsLoading(false);
                });
        } catch (error) {
            throw new error();
        } finally {
            //code
        }
    };

    const pageChange = (newPage) => {
        if (newPage > 0) {
            setPage(newPage);
        }
    };

    useMemo(() => getPokemons(), [page]);

    return (
        <>
            <button onClick={() => pageChange(page - 1)}>&lt;</button>
            <button onClick={() => pageChange(page + 1)}>&gt;</button>
            <ul className="listPokemons">
                {isLoading ? (
                    <div className="loader"></div>
                ) : (
                    pokemons["hydra:member"].map((item) => {
                        return (
                            <li key={item.id}>
                                <Link to={`pokemon/${item.id}`}>
                                    <img
                                        loading="lazy"
                                        src={item.front_default}
                                        alt={"photo de : " + item.name}
                                    />
                                    <p>
                                        {item.name} / {item.id}
                                    </p>
                                    <span
                                        style={{
                                            background:
                                                item.color.name == "white"
                                                    ? "dimgrey"
                                                    : item.color.name == "pink"
                                                    ? "hotpink"
                                                    : item.color.name,
                                        }}
                                    ></span>
                                </Link>
                            </li>
                        );
                    })
                )}
            </ul>
        </>
    );
};

export default HomePage;
