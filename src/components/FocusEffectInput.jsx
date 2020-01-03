import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { flex, noSelect, copyCat } from '../utils';

const controller = {
    focusColor: 'green', 
    initLabelSize: '1.6rem',
    focusedLabelSize: '1.3rem',
    inputFontSize: '1.5rem',
    initFontColor: 'black',
}

const FormInput = styled.input`
    transition: all 0.6s;
    width:100%;
    height:100%;
    color: ${({ focusColor }) => focusColor || controller.focusColor};
    padding-top: 30px;
    padding-left: 2px;
    border:none;
    font-size: ${({ inputFontSize }) => inputFontSize || controller.inputFontSize};
    &.invalid {
        color:red;
    }
    &.valid {
        color:green;
    }
`;

const LabelContent = styled.span`
    ${noSelect}
    position:absolute; 
    bottom:5px;
    left:0px; 
    transition: all 0.3s ease;
`;

const InputLabel = styled.label`
    color:  ${({ initFontColor }) => initFontColor || controller.initFontColor};
    width:95%;
    height:100%;
    position:absolute; 
    padding-left: 0px;
    padding-top: 2px;
    font-size: ${({ initLabelSize }) => initLabelSize || controller.initLabelSize};
    bottom:0px; 
    left:7px;
    pointer-events:none;
    border-bottom: 0.5px solid ${({ initFontColor }) => initFontColor || controller.initFontColor};
    overflow: hidden;
    &::after {
        content:'';
        position:absolute;
        height:100%;
        width:100%;
        border-bottom: 1px solid ${({ focusColor }) => focusColor || controller.focusColor};
        left:0px;
        bottom:0px;
        transform: translateX(-100%);
        transition: 0.3s ease;
    }
`;

const FormDiv = styled.div`
    position: relative; 
    margin-top:0.5rem;
    height: 50px;
    width:100%;
    :focus-within ${InputLabel} ${LabelContent},
    & ${FormInput}:valid ~ ${InputLabel} > ${LabelContent} {
        transform: translateY(-150%);
        border-bottom: none;
        font-size: ${({ focusedLabelSize }) => focusedLabelSize || controller.focusedLabelSize};
        color: ${({ focusColor }) => focusColor || controller.focusColor};
    }
    :focus-within ${InputLabel}::after,
    & ${FormInput}:valid ~ ${InputLabel}::after {
        transform: translateY(-0%);
    }
    :hover ${InputLabel}::after {
        content:'';
        position:absolute;
        height:100%;
        width:100%;
        border-bottom: 1px solid ${({ focusColor }) => focusColor || controller.focusColor};
        left:0px;
        bottom:0px;
        transform: translateX(-0%);
        transition: 0.3s ease;
    }
    :hover ${InputLabel} {
       color: ${({ focusColor }) => focusColor || controller.focusColor};
    }
`;

const FocusEffectInput = ({ labelName, stateName, focusColor, initLabelSize, focusedLabelSize, inputFontSize, initFontColor, attributeSetter, dataCollector, validation, stateValue}) => {
    const inputRef=useRef(null);
    const [userIsTyping, setUserIsTyping] = useState(false)
    let timer;

    const setValidateTimer =  () => {
        timer = setTimeout(() => {
            setUserIsTyping(false)
            console.log('you stopped typing')
        }, 800)
    }

    
    useEffect(() => {
        const clearValidateTimer = () => {
            clearTimeout(timer);
            setUserIsTyping(true);
        }
        window.addEventListener('keydown', () => {
            clearValidateTimer()
        })
    }, [timer, userIsTyping]) 
    
    console.log(userIsTyping)

    return (
            <>
                <FormDiv
                focusedLabelSize={focusedLabelSize}
                focusColor={focusColor}
                > 
                    <FormInput 
                        type="text" 
                        name={stateName} 
                        autoCapitalize="true"
                        autoComplete="off" 
                        required
                        focusColor={focusColor}
                        inputFontSize={inputFontSize}
                        ref={inputRef}
                        onFocus={() => dataCollector(inputRef)}
                        onChange={(e) => {
                            attributeSetter(e)
                            setValidateTimer()
                            !userIsTyping && validation()
                        }}
                        value={stateValue}
                    >
                    </FormInput>
                    <InputLabel 
                        htmlFor={stateName}
                        autoComplete="off"
                        initFontColor={initFontColor}
                        initLabelSize={initLabelSize}
                        focusColor={focusColor}
                    >
                        <LabelContent
                        >{labelName || 'Name'}</LabelContent>
                    </InputLabel>
                </FormDiv>
            </> 
        
    );
};

export default FocusEffectInput;