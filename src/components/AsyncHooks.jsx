import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { flex, capitalize, UpdatePageTitle, SaveToLocalStorage } from '../utils';
import PiveyPops from './PiveyPops';

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
    max-width:20rem;
    font-weight:bold;
    text-decoration:none;
    color:black;
    font-size:1.8rem;
    display:inline-block;
    text-align:center;
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

const SearchCocktail = (query, openPopUp) => {
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
                openPopUp({
                    open: true,
                    title: "Not Found",
                    text: `Sorry, could not find any drinks containing ${query}`
                })
                    console.log('error while finding your drink');
            } finally {
                setLoading(false);
            }
        }
        query !== '' && fetchData();

    }, [openPopUp, query])

    return [results, loading];
}

const AsyncHooks = () => {
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('');
    const [selectedDrink, setSelectedDrink] = useState(null);
    const [count, setCount] = SaveToLocalStorage('button-count', 0);
    const [popUp, setPopUp] = useState({
        open: false,
        title: '',
        text: ''
    });
    const [results, loading] = SearchCocktail(query, setPopUp);
    const closePopUp = e => {
        setPopUp({
            ...popUp,
            open: e
        });
    };

    const props = {
        titleFontSize: "1.2rem",
        messageFontSize: "0.8rem",
        motherPadding: "1rem",
        titlePadding: "0.5rem 0.5rem",
        messagePadding: "0.5rem",
        maxW: "15rem",
        modalBGC: "rgba(0, 0, 0, 0.6)",
        popUpBGC: "#e1e5e8",
        motherRadius: "10px",
        btns: 1,
        hoverBGC: "darkGrey",
        hoverTxtColor: "purple",
        closePopUp: closePopUp,
        open: popUp.open,
        title: popUp.title,
        text: popUp.text
    };

    const title = selectedDrink ? `you're favourite cocktail is a ${selectedDrink}` : 'Components Library'

    UpdatePageTitle(title);

    const submitHandler = (e) => {
        e.preventDefault();
        setQuery(capitalize(search))
        setSearch('');
    }

    const CountButton = React.memo(function CountButton({ onClick, count }) {
        return <button type="button" onClick={onClick}>{count}</button>
    }, [])

    function DualCounter() {
        const [count1, setCount1] = useState(0);
        const [count2, setCount2] = useState(0);
        const increment1 = useCallback(() => setCount1(c => c + 1), []);
        const increment2 = useCallback(() => setCount2(c => c + 1), []);
        console.log({count1}, {count2});
        return (
            <>
                <CountButton count={count1} onClick={increment1} />
                <CountButton count={count2} onClick={increment2} />
            </>
        )
    }

    const Counter = React.memo(({ increment }) => {
        return <button onClick={increment}>Click Me</button>
    })

    const increment = useCallback(() => {
        setCount(c => c + 1)
    }, [setCount])


    return (
        
        <PageWrapper>
            { !loading && <PiveyPops {...props} />}
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
                    {/* <button 
                        type="button"
                        onClick={() => setCount( c => c + 1)} 
                        onDoubleClick={() => setCount(0)}
                    >{count}</button> */}
                    {/* {DualCounter()} */}
                    <Counter increment={increment}/>
                <div>count: {count}</div>
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
                                    <DrinkItemLink 
                                    href={el.strDrinkThumb}
                                    target="_blank">
                                        <DrinkPic 
                                        key={i + 1} 
                                        src={el.strDrinkThumb}
                                        onClick={() => setSelectedDrink(el.strDrink)}
                                        />
                                    </DrinkItemLink>
                                </DrinkHolder>
                            )
                        })}
                </DrinksList>}
        </PageWrapper>
    );
};

export default AsyncHooks;