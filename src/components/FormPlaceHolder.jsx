import React from 'react';
import styled from 'styled-components';
import FocusEffectInput from './FocusEffectInput';

const controller = {
    focusColor: 'green',
    initLabelSize: '1.6rem',
    focusedLabelSize: '1.3rem',
    inputFontSize: '1.5rem',
    initFontColor: 'black',
}

const PageWrapper = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    justify-content: center;
    align-items:center; 
    flex-direction:column;
`;

const Title = styled.div`
    margin-bottom:4rem;
    height:auto;
    width:auto;
    font-size:1.5rem;
    font-weight:bold;
    text-align: center;
`;

const FormHolder = styled.div`
    height:auto;
    width:300px;
    display:flex;
`;

const FormPlaceHolder = () => {
    return (
        <>
            <PageWrapper>
                <Title>Input Animation</Title>
                <FormHolder>
                    <FocusEffectInput {...controller}/>
                </FormHolder>
            </PageWrapper>
        </>

    );
};

export default FormPlaceHolder;