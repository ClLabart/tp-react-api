import React, { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Pokemon.css";

const Pokemon = () => {
    var { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [pokemon, setPokemon] = useState({});

    const getPokemons = async () => {
        setIsLoading(true);
        try {
            await fetch(`https://localhost:8000/api/pokemon/${id}`, {
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
                    if (data["hydra:totalItems"] <= 0) {
                        return navigate("/pokemon/1");
                    }
                    setPokemon(data);
                    console.log(data);
                    setIsLoading(false);
                });
        } catch (error) {
            throw new error();
        }
    };

    useMemo(() => getPokemons(), [id]);

    return (
        <div className="pokemon">
            <Link className="changePage1" to={`/pokemon/${parseInt(id) - 1}`}>
                &lt;
            </Link>
            <Link className="changePage2" to={`/pokemon/${parseInt(id) + 1}`}>
                &gt;
            </Link>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                <div>
                    <header>
                        <Link className="back" to="/">
                            &#x2190;
                        </Link>
                        <h1>
                            {pokemon.name.charAt(0).toUpperCase() +
                                pokemon.name.slice(1)}
                        </h1>
                    </header>
                    <main>
                        <section>
                            <p>Habitat : <strong>{pokemon.habitat.name}</strong></p>
                            <ul>
                                {pokemon.types.map(type => {
                                    return(
                                        <li className="type" key={type.name}>
                                            {type.name}
                                        </li>
                                    )
                                })}
                            </ul>
                            <p><strong>{pokemon.weight}</strong> kg</p>
                        </section>
                        <p className="pokemonId">#{id.toString().padStart(3, "0")}</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="-25 -25 250 250"
                            className="float"
                        >
                            <path
                                d="M193.91491854427832 65.64904550348612 C181.02098348006427 34.51339472890009 107.93255557061366 0.16907577983328093 74.38190964969327 3.3371144295623623 C54.55059041343997 5.209697925082809 20.487325662806718 34.783641117557345 11.8706536113842 52.743060772883624 C1.5112112580677 74.33487388913854 -2.408126952322794 129.8456044147991 12.567453986057458 148.53400763917833 C35.788651553948085 177.51232275679214 125.0587708693904 200.39073968148676 157.29571426340982 181.9585329727521 C183.75973607834675 166.82712567785714 205.57860769356543 93.8139579438659 193.91491854427832 65.64904550348612Z"
                                stroke="none"
                                fill={pokemon.color.name}
                            />
                        </svg>
                        <img
                            className="sprite"
                            loading="lazy"
                            src={pokemon.front_default}
                            alt={"photo de : " + pokemon.name}
                        />
                    </main>
                </div>
            )}
        </div>
    );
};

export default Pokemon;
