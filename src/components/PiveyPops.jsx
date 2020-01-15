import React from "react";
import styled, { css } from "styled-components";

const flex = (justify, align, direction = "row") => `
    display:flex;
    flex-direction:${direction};
    justify-content:${justify};
    align-items:${align};`;

const noSelect = css`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              supported by Chrome, Opera and Firefox */
`;

const defaults = {
    Modalbgc: "transparent",
    btnRadius: "10px",
    btnTxtColor: "white",
    hoverBGC: "#ff8800",
    hoverTxtColor: "white",
    btnLeftColor: "#D81734",
    btnRightColor: "#2191FB",
    motherPadding: "1rem",
    popUpBGC: "#e1e5e8",
    popUpMotherRadius: "5px",
    titlePadding: "0.5rem 0.5rem",
    txtColor: "black"
};

const Modal = styled.div`
  ${flex("center", "center")}
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ bgc }) => bgc || defaults.bgc};
  visibility: ${({ display }) => (display === "true" ? "visible" : "hidden")};
  z-index: 999;
`;

const SubmitBtn = styled.button`
  ${noSelect}
  ${flex("center", "center")}
    width: 4rem;
  height: auto;
  max-width: auto;
  background-color: ${({ btnBGC }) => btnBGC || defaults.btnLeftColor};
  border-radius: ${({ radius }) => radius || defaults.btnRadius};
  padding: 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  color: ${({ color }) => color || defaults.btnTxtColor};
  border: 2px solid transparent;
  &:hover {
    background-color: ${({ hoverBGC }) => hoverBGC || defaults.hoverBGC};
    color: ${({ hoverTxt }) => hoverTxt || defaults.hoverTxtColor};
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
`;

const ConfirmBtn = styled(SubmitBtn)`
  background-color: ${({ btnBGC }) => btnBGC || defaults.btnRightColor};
`;

const ButtonHolder = styled.div`
  ${flex("space-between", "center")}
  ${({ center }) =>
        center && flex("center", "center")}
    padding: 0.5rem 1.5rem;
  height: auto;
  width: 100%;
`;

const PopUpMother = styled.div`
  ${flex("space-around", "center", "column")}
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  padding: ${({ padding }) => padding || defaults.motherPadding};
  margin-left: 0;
  border-radius: ${({ motherRadius }) =>
        motherRadius || defaults.popUpMotherRadius};
  background-color: ${({ bgc }) => bgc || defaults.popUpBGC};
  &:focus {
    outline: 0;
  }
`;

const Title = styled.p`
    height: auto;
    max-width: ${({ maxW }) => maxW || "auto"}
    font-weight: bold;
    text-justify: inter-word;
    font-size:${({ fs }) => fs};
    text-align: center;
    margin-bottom: 0.5rem;
    margin-top: 0.5rem;
    text-justify: inter-character;
    padding:${({ padding }) => padding || defaults.titlePadding};
    color: ${({ color }) => color || defaults.txtColor};
    word-wrap: break-word;
    line-height: 1rem;
`;

const PopUpMessage = styled(Title)`
  margin: 0rem;
  padding: ${({ padding }) => padding};
  text-align: center;
  font-size: ${({ fs }) => fs};
`;

const PiveyPops = ({
    closePopUp,
    title,
    text,
    open,
    motherPadding,
    titlePadding,
    messagePadding,
    maxW,
    modalBGC,
    popUpBGC,
    btns,
    confirm,
    titleFontSize,
    messageFontSize,
    btnRadius,
    btnTxtColor,
    btnRightColor,
    btnLeftColor,
    txtColor,
    popUpRadius,
    hoverBGC,
    hoverTxtColor
}) => {
    if (btns === undefined) btns = 1;

    return (
        <Modal display={open.toString()} bgc={modalBGC}>
            <PopUpMother
                padding={motherPadding}
                bgc={popUpBGC}
                motherRadius={popUpRadius}
            >
                <Title
                    fs={titleFontSize}
                    color={txtColor}
                    padding={titlePadding}
                    maxW={maxW}
                >
                    {title}
                </Title>
                <PopUpMessage
                    padding={messagePadding}
                    maxW={maxW}
                    fs={messageFontSize}
                    color={txtColor}
                >
                    {text}
                </PopUpMessage>
                {btns === 1 ? (
                    <ButtonHolder center>
                        <SubmitBtn
                            type="button" //
                            btnBGC={btnLeftColor} //
                            radius={btnRadius} //
                            color={btnTxtColor} //
                            hoverBGC={hoverBGC} //
                            hoverTxt={hoverTxtColor} //
                            onClick={() => closePopUp(false)}
                        >
                            Close
            </SubmitBtn>
                    </ButtonHolder>
                ) : (
                        <ButtonHolder>
                            <SubmitBtn
                                type="button" //
                                btnBGC={btnLeftColor} //
                                radius={btnRadius} //
                                color={btnTxtColor} //
                                hoverBGC={hoverBGC} //
                                hoverTxt={hoverTxtColor} //
                                onClick={() => closePopUp(false)}
                            >
                                Close
            </SubmitBtn>
                            <ConfirmBtn
                                type="button" //
                                btnBGC={btnRightColor} //
                                radius={btnRadius} //
                                color={btnTxtColor} //
                                hoverBGC={hoverBGC} //
                                hoverTxt={hoverTxtColor} //
                                onClick={() => {
                                    confirm(true);
                                    closePopUp(false);
                                }}
                            >
                                Confirm
            </ConfirmBtn>
                        </ButtonHolder>
                    )}
            </PopUpMother>
        </Modal>
    );
};

export default PiveyPops;
