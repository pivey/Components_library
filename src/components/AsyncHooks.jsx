import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { flex, capitalize } from '../utils';

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
    ${flex('flex-start', 'center', 'column')}
    width:30rem;
    height:auto;
    max-height:40rem;
    font-weight:bold;
    font-size:1.5rem;
    overflow-x: scroll;
    padding:2.5rem 0rem 1rem 0rem;
    margin:0rem;
    border:2px dashed black;
`;

const DrinkItemLink = styled.a`
    font-weight:bold;
    text-decoration:none;
    color:black;
    font-size:1.8rem;
    display:inline-block;
`;

const DrinkListItem = styled.li`
    height:auto;
    width:auto;
    display:block;
    margin-bottom:.5rem;
    &:hover ${DrinkItemLink} {
        color:blue;
        transition: 0.2s;
        cursor:pointer;
    }
`;

const DrinkPic = styled.img`
    width:12rem;
    height:12rem;
    &:hover ${DrinkItemLink}, && {
        color:blue;
        transition: 0.2s;
        cursor:pointer;
    }
`;

const DrinkHolder = styled.div`
    ${flex('flex-start', 'center', 'column')}
    width:auto;
    height:auto;
    margin-bottom:2rem;
`;

const UpdatePageTitle = title => {
    useEffect(() => {
        document.title = title;
    }, [title]);
}

const SearchCocktail = query => {
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
    const [selectedDrink, setSelectedDrink] = useState(null);

    const title = selectedDrink ? `you're favourite cocktail is a ${selectedDrink}` : 'Components Library'

    UpdatePageTitle(title);

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
            </MotherHolder>
            { results.length > 0 &&  
                <DrinksList>
                    {loading ? <h2>Your drink is on it's way sir</h2>
                        : results.map((el, i) => {
                            return (
                                <DrinkHolder key={el.strDrink}>
                                    <DrinkListItem key={i}>
                                        <DrinkItemLink 
                                            key={i} 
                                            href={el.strDrinkThumb} 
                                            target="_blank"
                                            onClick={() => setSelectedDrink(el.strDrink)}
                                            >{el.strDrink}</DrinkItemLink>
                                    </DrinkListItem>
                                    <DrinkPic key={i + 1} src={el.strDrinkThumb}/>
                                </DrinkHolder>
                            )
                        })}
                </DrinksList>}
        </PageWrapper>
    );
};

export default AsyncHooks;