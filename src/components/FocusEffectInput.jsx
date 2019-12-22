import React from 'react';
import styled from 'styled-components';

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
    font-size:2rem;
    font-weight:bold;
    text-align: center;
`;

const LabelContent = styled.span`
    position:absolute; 
    bottom:5px;
    left:0px; 
    transition: all 0.3s ease;
`;

const FormInput = styled.input`
    width:100%;
    height:100%;
    color: green;
    padding-top: 30px;
    padding-left: 4px;
    border:none;d
    font-size: 1.5rem;
    :focus  &${Title} {
        border: 2px solid orange;
    }
`;

const InputLabel = styled.label`
position:absolute; 
padding-left: 0px;
padding-top: 2px;
font-size: 1.6rem;
bottom:0px; 
left:7px;
width:100%;
height:100%;
pointer-events:none;
border-bottom: 0.5px solid black;
overflow: hidden;
&::after {
    content:'';
    position:absolute;
    height:100%;
    width:100%;
    border-bottom: 2px solid green;
    left:0px;
    bottom:0px;
    transform: translateX(-100%);
    transition: 0.3s ease;
}
`;

const FormDiv = styled.div`
    font-size:16px;
    position: relative; 
    height: 50px;
    width:50%;
    :focus-within ${InputLabel} ${LabelContent}{
        transform: translateY(-150%);
        border-bottom: none;
        font-size: 1.4rem;
        color: green;
    }
    :focus-within ${InputLabel}::after {
        transform: translateY(-0%);
        font-size: 1.4rem;
        color: green;
    }
`;

const FocusEffectInput = ({labelName}) => {
    return (
            <>
            <PageWrapper>
                <Title>Input Animation</Title>
                    <FormDiv> 
                        <FormInput type="text" name="name" autoCapitalize autoComplete="off" required></FormInput>
                        <InputLabel for="name">
                        <LabelContent>{labelName || 'Name'}</LabelContent>
                        </InputLabel>
                    </FormDiv>
            </PageWrapper>
            </>
        
    );
};

export default FocusEffectInput;