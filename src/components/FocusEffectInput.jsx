import React from 'react';
import styled from 'styled-components';

const controller = {
    focusColor: 'green', 
    initLabelSize: '1.6rem',
    focusedLabelSize: '1.3rem',
    inputFontSize: '1.5rem',
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
    font-size:2rem;
    font-weight:bold;
    text-align: center;
`;

const FormInput = styled.input`
    width:100%;
    height:100%;
    color: ${({ focusColor }) => focusColor || controller.focusColor};
    padding-top: 30px;
    padding-left: 4px;
    border:none;
    font-size: ${({ inputFontSize }) => inputFontSize || controller.inputFontSize};;
`;

const LabelContent = styled.span`
    position:absolute; 
    bottom:5px;
    left:0px; 
    transition: all 0.3s ease;
`;

const InputLabel = styled.label`
width:100%;
height:100%;
position:absolute; 
padding-left: 0px;
padding-top: 2px;
font-size: ${({ initLabelSize }) => initLabelSize || controller.initLabelSize};;
bottom:0px; 
left:7px;
pointer-events:none;
border-bottom: 0.5px solid black;
overflow: hidden;
&::after {
    content:'';
    position:absolute;
    height:100%;
    width:100%;
    border-bottom: 1px solid ${({ focusColor }) => focusColor || controller.focusColor};;
    left:0px;
    bottom:0px;
    transform: translateX(-100%);
    transition: 0.3s ease;
}
`;

const FormDiv = styled.div`
    position: relative; 
    height: 50px;
    width:100%;
    :focus-within ${InputLabel} ${LabelContent},
    & ${FormInput}:valid ~ ${InputLabel} > ${LabelContent} {
        transform: translateY(-150%);
        border-bottom: none;
        font-size: ${({ focusedLabelSize }) => focusedLabelSize || controller.focusedLabelSize};;
        color: ${({ focusColor }) => focusColor || controller.focusColor};;
    }
    :focus-within ${InputLabel}::after,
    & ${FormInput}:valid ~ ${InputLabel}::after {
        transform: translateY(-0%);
    }
`;

const FormHolder = styled.div`
    height:auto;
    width:300px;
    display:flex;
`;

const FocusEffectInput = ({ labelName, focusColor, initLabelSize, focusedLabelSize, inputFontSize}) => {
    return (
            <>
                <PageWrapper>
                    <Title>Input Animation</Title>
                        <FormHolder>
                            <FormDiv
                            focusedLabelSize={focusedLabelSize}
                            focusColor={focusColor}
                            > 
                                <FormInput 
                                type="text" 
                                name="name" 
                                autoCapitalize 
                                autoComplete="off" 
                                required
                                focusColor={focusColor}
                                inputFontSize={inputFontSize}
                                ></FormInput>
                                <InputLabel 
                                for="name"
                                initLabelSize={initLabelSize}
                                >
                                    <LabelContent>{labelName || 'Name'}</LabelContent>
                                </InputLabel>
                            </FormDiv>
                    </FormHolder>
                </PageWrapper>
            </>
        
    );
};

export default FocusEffectInput;