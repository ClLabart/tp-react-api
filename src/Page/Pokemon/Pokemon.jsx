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
                                return navigate("/login");
                        }
                    }
                    return res.json();
                })
                .then((data) => {
                    if (data['hydra:totalItems'] <= 0) {
                        return navigate("/pokemon/1");
                    }
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
        <div className="pokemon test">
            <Link className="back" to="/">
                Home
            </Link>
            <aside className="changePage1">
                <Link to={`/pokemon/${parseInt(id) - 1}`}>&lt;</Link>
            </aside>
            {isLoading ? (
                <div className="loader"></div>
            ) : (
                pokemon["hydra:member"].map((item) => {
                    return (
                        <div key={item.id}>
                            <header>
                                <p>{item.name}</p>
                            </header>
                            <p>#{id.toString().padStart(3, "0")}</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="200"
                                height="200"
                                viewBox="-25 -25 250 250"
                                className="float"
                            >
                                <path
                                    d="M193.91491854427832 65.64904550348612 C181.02098348006427 34.51339472890009 107.93255557061366 0.16907577983328093 74.38190964969327 3.3371144295623623 C54.55059041343997 5.209697925082809 20.487325662806718 34.783641117557345 11.8706536113842 52.743060772883624 C1.5112112580677 74.33487388913854 -2.408126952322794 129.8456044147991 12.567453986057458 148.53400763917833 C35.788651553948085 177.51232275679214 125.0587708693904 200.39073968148676 157.29571426340982 181.9585329727521 C183.75973607834675 166.82712567785714 205.57860769356543 93.8139579438659 193.91491854427832 65.64904550348612Z"
                                    stroke="none"
                                    fill={item.color.name}
                                />
                            </svg>
                            <img
                                loading="lazy"
                                src={item.front_default}
                                alt={"photo de : " + item.name}
                            />
                        </div>
                    );
                })
            )}
            <aside className="changePage2">
                <Link to={`/pokemon/${parseInt(id) + 1}`}>&gt;</Link>
            </aside>
        </div>
    );
};

export default Pokemon;
