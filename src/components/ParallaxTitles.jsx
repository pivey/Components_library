import React, { useRef, useState, useEffect } from 'react';
import '../styles/Parallax.css'
import styled from 'styled-components';
import { flex, noSelect } from '../utils';
import amsterdamPic from '../photos/amsterdam.jpeg'
import lisbonPic from '../photos/lisbon.jpeg'
import ljubljanaPic from '../photos/ljubljana.jpeg'
import santoriniPic from '../photos/santorini.jpeg'
import splitPic from '../photos/split.jpeg'
import hamburger from '../icons/hamburger.svg'
import cross from '../icons/cross.svg'

const ArticleSection = styled.section`
    ${flex('center', 'center')}
    position:relative; 
    width:100%;
    min-height:100vh;
    padding:0rem 5rem;
`;

const ContentDiv = styled.div`
    text-align:center;
`;

const ParallaxTitle = styled.h2`
    ${noSelect}
    font-size:12vw;
    text-transform:uppercase;
    font-weight:bold;
    line-height:auto;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-position: 100%;
    background-attachment:fixed;
    background-image: ${({ bgcimg }) => `url(${bgcimg})`}
    
`;

const PlaceholderText = styled.p`
    max-width:800px;
    margin:2rem auto;
    padding:2rem 2rem;
    text-align: justify;
    text-justify: inter-word;
    line-height:1.5;
    border:2px dashed black;
    border-radius:5px;
`;

const ReadMoreBtn = styled.a`
    font-size:1.4rem;
    display:inline-block;
    padding:1rem 1.5rem;
    border:2px solid black;
    text-decoration:none; 
    margin-top:2rem;
    color:black;
`;

const PlacesNav = styled.nav`
    ${flex('flex-end', 'center')}
    width:100vw;
    height:auto;
    background: #E1DEE3;
    padding:1.8rem;
    z-index:1000;
    position:fixed;
`;

const NavTitle = styled.h2`
    padding:1rem;
    border:2px solid black;
    margin:auto;
`;

const NavUl = styled.ul`
    ${flex('space-between', 'center', 'column')}
    transition: all 0.5s;
    list-style-type:none;
    position:absolute;
    margin-top:13.5rem;
    right:0rem;
`;

const NavLi = styled.li`
    ${noSelect}
    font-size:1.8rem;
    padding:1rem;
    background: #E1DEE3;
    min-width:15rem;
    text-align:center;
    &:hover, &.selected {
        color:white;
        background:black;
        cursor:pointer
    }
`;

const NavClick = styled.div`
    ${flex('center', 'center')}
    ${noSelect}
    height:auto;
    width:auto;
    font-size:1.8rem;
    padding:.8rem;
    position:absolute;
    &:hover {
        cursor:pointer;
    }
`;

const Chevron = styled.img`
    transition: all 1s;
    width:2rem;
    height:2rem;
    margin-left:1rem;
`;

const controller = {
    Amsterdam: amsterdamPic,
    Lisbon: lisbonPic, 
    Ljubljana: ljubljanaPic,
    Santorini: santoriniPic,
    Split: splitPic, 
}

const ParallaxTitles = () => {
    const titles = Object.keys(controller);
    const photos = Object.values(controller);
    const amsterdamRef = useRef(null); 
    const lisbonRef = useRef(null); 
    const ljubljanaRef = useRef(null); 
    const santoriniRef = useRef(null); 
    const splitRef = useRef(null); 
    const navRef = useRef(null); 
    const refs = [amsterdamRef, lisbonRef, ljubljanaRef, santoriniRef, splitRef]
    const [navStatus, setNavStatus] = useState(false);

    const selected = (e) => {
        if (navRef.current) {
            const targetName = e.target.innerText;
            Array.from(navRef.current.children).map(el => el.innerText !== targetName ? el.classList.remove('selected') : el.classList.add('selected'))
       }
    }

    useEffect(() => {
    }, [navStatus])

    return (
        <>
            <PlacesNav>
                <NavTitle>Cities of the World</NavTitle>
                    <NavClick onClick={() => setNavStatus(!navStatus)}><Chevron src={!navStatus ? hamburger : cross}/></NavClick>
                    {navStatus && 
                    (<NavUl ref={navRef}>
                        {titles.map((el, i) => {
                            return (
                            <NavLi onClick={(e) => {
                                    refs[i].current.scrollIntoView({ behavior: "smooth" })
                                    selected(e)
                            }}>{el}</NavLi>
                            )
                        })}
                    </NavUl>
                    )}
            </PlacesNav>
            {titles.map((el, i) => {
                return (
                    <ArticleSection ref={refs[i]}>
                        <ContentDiv>
                            <ParallaxTitle bgcimg={photos[i]}>{el}</ParallaxTitle>
                            <PlaceholderText>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quae, vel vitae rem nesciunt sit nulla fugit. Quibusdam delectus aut natus similique odit cupiditate, adipisci commodi asperiores sit consequatur quasi deleniti quisquam maiores eius voluptate et at quas dolorem. Maiores recusandae molestias earum, praesentium cupiditate amet obcaecati debitis non, natus autem soluta est adipisci, eaque quia animi. Odit, aut ducimus. Ratione nesciunt voluptates accusantium vero ad deserunt. Quae numquam magni voluptate fugit? Provident magnam harum nisi eligendi optio inventore libero, eum dignissimos illo corporis eaque, iusto pariatur ab odit quasi. Exercitationem maiores distinctio facere corporis. Facilis esse velit reprehenderit accusantium architecto ipsam eaque rem tempora quia, temporibus autem alias consequuntur eos explicabo totam consequatur placeat maxime soluta quam laborum repellat sint voluptas. In maiores eveniet culpa dolorem odio, temporibus veniam tempore voluptate fuga aperiam facilis quaerat ea accusamus enim, expedita quasi ullam voluptatem aliquid explicabo. Nulla officiis atque temporibus vitae quae aliquid perferendis odio dolore eligendi autem dignissimos omnis minima molestias quos hic, ad aliquam cum architecto consequuntur natus. Possimus provident esse pariatur totam voluptatum placeat deleniti, at nemo omnis sit dolores repellendus ipsa animi earum atque, vero modi dignissimos veritatis harum nostrum id aliquid porro. Officia officiis itaque similique!</PlaceholderText>
                            <ReadMoreBtn href="###">Read More</ReadMoreBtn>
                        </ContentDiv>
                    </ArticleSection>
                )
            })}
        </>
    );
};

export default ParallaxTitles;