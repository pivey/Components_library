import React from 'react';
import styled from 'styled-components';

const controller = {
    focusColor: 'green', 
    initLabelSize: '1.6rem',
    focusedLabelSize: '1.3rem',
    inputFontSize: '1.5rem',
    initFontColor: 'black',
}

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
    &.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
    }
`;

const InputLabel = styled.label`
    color:  ${({ initFontColor }) => initFontColor || controller.initFontColor};
    width:100%;
    height:100%;
    position:absolute; 
    padding-left: 0px;
    padding-top: 2px;
    font-size: ${({ initLabelSize }) => initLabelSize || controller.initLabelSize};
    bottom:0px; 
    left:7px;
    pointer-events:none;
    border-bottom: 0.5px solid ${({ initFontColor }) => initFontColor || controller.initFontColor};;
    overflow: hidden;
    &::after {
        content:'';
        position:absolute;
        height:100%;
        width:100%;
        border-bottom: 1.5px solid ${({ focusColor }) => focusColor || controller.focusColor};;
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

const FocusEffectInput = ({ labelName, focusColor, initLabelSize, focusedLabelSize, inputFontSize, initFontColor}) => {
    return (
            <>
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
                    initFontColor={initFontColor}
                    initLabelSize={initLabelSize}
                    focusColor={focusColor}
                    >
                        <LabelContent
                        className="noselect"
                        >{labelName || 'Name'}</LabelContent>
                    </InputLabel>
                </FormDiv>
            </> 
        
    );
};

export default FocusEffectInput;