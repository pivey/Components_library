import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { flex, capitalize, ellipsis } from '../utils';

const PageWrapper = styled.div`
    ${flex('flex-start', 'center', 'column')}
    width:100vw;
    height:100vh;
    position:absolute;
`;

const MotherHolder = styled.div`
    width:auto;
    height:auto;
    margin-top: 25vh;
`;

const SearchInput = styled.input`
    padding:0.5rem;
    margin:0px;
`;

const DrinksList = styled.ul`
    width:auto;
    height:auto;
    overflow-x:scroll;
    max-height:30rem;
`;

const DrinkItemLink = styled.a`
    ${ellipsis}
    font-weight:bold;
    text-decoration:none;
    color:black;
    font-size:1.5rem;
    &:hover {
        color:blue;
        transition: 0.2s;
    }
`;

function SearchCocktail(query) {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await fetch(`https://the-cocktail-db.p.rapidapi.com/filter.php?i=${query}`, {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "the-cocktail-db.p.rapidapi.com",
                        "x-rapidapi-key": "20663496b8mshdb68e09e740f322p10cd85jsnc6538e41caad",
                    }
                })
                const json = await response.json();
                setResults(
                    json.drinks.map(el => {
                        return el;
                    })
                )
            } catch (error) {
                if (error) console.log('Sorry, there were no drinks containing that ingredient');
            } finally {
                setLoading(false);
            }
        }
        query !== '' && fetchData();

    }, [query])

    return [results, loading];
}

const AsyncHooks = () => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [results, loading] = SearchCocktail(query);

    const submitHandler = (e) => {
        e.preventDefault();
        setQuery(capitalize(search))
        setSearch('');
    }

    return (
        <PageWrapper>
            <MotherHolder>
                <h2>Async React hooks</h2>
                <form onSubmit={submitHandler}>
                    <SearchInput
                        type="text"
                        placeholder="type your search here"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    >
                    </SearchInput>
                    <button type="submit">Search</button>
                </form>
                <br></br>
                {console.log(results)}
            </MotherHolder>
            <DrinksList>
                {loading ? <h2>Your drink is on it's way sir</h2>
                    : results.map((el, i) => {
                        return (
                            <>
                                <DrinkItemLink key={i} href={el.strDrinkThumb} target="_blank">{el.strDrink}</DrinkItemLink>
                                <br></br>
                                <br></br>
                            </>
                        )
                    })}
                
            </DrinksList>
        </PageWrapper>
    );
};

export default AsyncHooks;