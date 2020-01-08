import React, { useReducer, useEffect, useState } from 'react';
import styled from 'styled-components';
import { flex, noSelect } from '../utils';
import FocusEffectInput from './FocusEffectInput';
import penicon from '../icons/pen-square-solid.svg'

const sayHi = (input) =>  {
    console.log(`${input}`)
}

const PageWrapper = styled.div`
    ${flex('flex-start', 'flex-start')}
    position:absolute;
`;

const BackgroundText = styled.p`
    height: 100vh;
    width:50vw;
    padding:2rem;
    margin:0px;
    font-size:1.8rem;
    text-align:justify;
    line-height:1.4;
    z-index:998;
`;

const Modal = styled.div`
    ${flex('center', 'center', 'column')}
    height:100vh;
    width:100vw;
    background:rgba(38, 12, 12, 0.15);
    z-index:999;
    position:fixed;
`;

const FormMother = styled.div`
    height:auto;
    width:auto;
    background:white;
    padding: 6rem 5rem 1rem 5rem;
    // border: 2px solid transparent;
    border-radius: 5px;
    z-index: 1000;
    position:relative;
`;

const FormHolder = styled.form`
    ${flex('center', 'center', 'column')}
    font-size:2.5rem;
`;

const LabelInputHolder = styled.div`
    ${flex('space-between', 'center')}
    height:auto;
    width:100%;
    margin: 0rem;
`;

const FormSubmitBtn = styled.button`
    ${noSelect}
    font-weight:bold;
    border-radius:5px;
    transition: all 0.2s
    padding: 1rem 2.5rem;
    font-size:1.4rem
    margin:2.5rem 0rem 1rem 0rem;
    border: 1px solid grey;
    pointer-events: none; 
    opacity:0.3;
    &.clickable {
        pointer-events:auto; 
        opacity:1;
        background: #6610F2;
        color:white;
        border: 1px solid white;
    &:hover {
        cursor: pointer;
        transform: scale(0.95)
        }
    }
    &.noClick {
     pointer-events: none;
     opacity: 0.15;
    }
`;

const LoggedInMessage = styled.div`
    max-width:50%;
    height:auto;
    text-align:center; 
    font-size:1.8rem;
    border: 2px solid #6610F2;
    background: white;
    color:#6610F2;
    margin-top:2rem;
    z-index:1000;
    padding:1rem
    visibility: ${({ visible }) => visible ? 'visible' : 'hidden'};
`;

const ButtonHolder = styled.div`
    height:auto;
    width:auto;
    padding:1rem;
    margin-bottom:4rem;
    z-index:1000;
`;

const FillInputBtn = styled.button`
    transition: all 0.25s
    padding:1rem;
    height:auto;
    width:auto;
    font-size:1.4rem;
    font-weight:bold;
    margin: 0rem 2rem
    border: 2px solid transparent;
    border-radius:5px;
    background:white;
    &:hover {
        cursor: pointer;
        background:white; 
        color:#6610F2;
        border:2px solid #6610F2;
        transform: scale(0.98)
    }
`;

const Banner = styled.div`
    height:auto;
    padding: 1.2rem;
    padding-left: 1.5rem;
    width:auto;
    border-left: .8rem solid #6610F2;
    color: #6610F2;
    font-size:2.5rem;
    font-weight:bold;  
    position:absolute;
    left:0rem;
    top:2rem;
`;

const IconHolder = styled.div`
    height:50px;
    width:80px;
    background:white;
    position:absolute;
    top:3rem;
    right:-2rem;
`;

const PenDiv = styled.img`
    transition: all 1.2s ease-in-out;
    height:8rem;
    width:8rem;
    filter: invert(13%) sepia(99%) saturate(6389%) hue-rotate(266deg) brightness(91%) contrast(110%);
    position:absolute
    right:-2rem;
    top:-2rem
    &:hover {
    -ms-transform: rotate(360deg); /* IE 9 */
    -webkit-transform: rotate(360deg); /* Chrome, Safari, Opera */
    transform: rotate(360deg);
    filter: invert(38%) sepia(75%) saturate(1338%) hue-rotate(154deg) brightness(100%) contrast(88%);
    }
    
`;

function dynamicFormReducer(state, action) {
    switch (action.type) {
        case 'reset': {
            return {
                name: '',
                email: '',
                age: '',
                address: '',
                isLoggedIn: false,
            }
        }
        case `${action.type}`: {
            return {
                ...state,
                [action.type]: action.payload,
            };
        }
        default:
            return state;
    }
}

const initState = {
    name: '',
    email: '',
    age: '',
    address: '',
    isLoggedIn: false, 
};

const DynamicForm = () => {
    const [state, dispatch] = useReducer(dynamicFormReducer, initState);
    const [currentRef, setCurrentRef] = useState(null);
    const [fillInputs, setfillInputs] = useState(false);

    const inputFields = {
        name: /^[a-z\d]{1,15}$/i,
        email: /^([A-Za-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        age: /^[1-9]{1,2}$/,
        address: /^\d+\s[A-z]+\s[A-z]+/,
        // address: /\b\d{1,6} +.{2,25}\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|blvd|plaza|parkway|pkwy)[.,]?(.{0,25} +\b\d{5}\b)?/ig,
    }

    const validateForSubmit = () => {
        const values = Object.values(state);
        const regex = Object.values(inputFields);
        values.splice(values.length - 1);
        const result = values.map((el, i) => {
            return regex[i].test(el)
        })
        const res = result.reduce((sum, next) => sum && next, true);
        return res;
    }

    useEffect(() => {
        const validateTestData = () => {
            const allInput = document.querySelectorAll('input');
            const inputsArr = Array.from(allInput);
            inputsArr.map(el => {
                const tested = inputFields[el.name].test(state[el.name]);
                if (!tested) {
                    el.classList.add('invalid');
                    el.classList.remove('valid');
                }
                if (tested) {
                    el.classList.add('valid');
                    el.classList.remove('invalid');
                }
            })
        }
        
        if(state.name && fillInputs) {
            validateTestData();
        }
        
    }, [state, fillInputs, inputFields, currentRef])

    // const classReset = () => {
    //     currentRef.current.classList.remove('invalid')
    //     currentRef.current.classList.remove('valid');
    // }
    
    const  submitHandler = (e) => {
        e.preventDefault();
        console.log(state)
        dispatch({ type: 'isLoggedIn', payload: true });
        setTimeout(() => {
            dispatch({ type: 'reset' }); 
            dispatch({ type: 'isLoggedIn', payload: false });
        }, 1000)
        setCurrentRef(null);
        setfillInputs(!fillInputs)
    }

    const validateInput = (inputValue, regex, ref) => {
        const tested = regex.test(inputValue);  
        if (!tested) {
            ref.current.classList.add('invalid');
            ref.current.classList.remove('valid');
        }
        if (tested) {
            ref.current.classList.add('valid');
            ref.current.classList.remove('invalid');
        } 
    }

    const insertCorrectInfo = () => {
        const values = ['harry', 'harry@gmail.com', Number(35), '73 greenwich street']
        const keys = Object.keys(state);
        keys.splice(keys.length - 1);
        keys.map((el, i) => {
            dispatch({ type: el, payload: values[i] })
        })
        setfillInputs(true)
        // setTimeout(() => validateTestData(), 0);
    }

    const insertIncorrectInfo = () => {
        const values = ['???)()(&&', '(((%%%)))harry@gmail.com', Number(0), '42 flanders ==//&&%%']
        const keys = Object.keys(state);
        keys.splice(keys.length - 1);
        keys.map((el, i) => {
            dispatch({ type: el, payload: values[i] })
        })
        setfillInputs(true)
        // setTimeout(() => validateTestData(), 0);
    }

    function getKeyByValue(object, value) {
        const found = Object.keys(object).find(key => object[key] === value);
        return `${found}`;
    }

    const controller = {
        focusColor: '#6610F2',
        initLabelSize: '1.6rem',
        focusedLabelSize: '1.3rem',
        inputFontSize: '1.5rem',
        initFontColor: '#454745',
        onClick: sayHi,
        onChange: dispatch,
    }

    const attributeSetter = (e) => {
        e.target.setAttribute(getKeyByValue(controller, controller.onChange), controller.onChange({ type: e.target.name, payload: e.target.value }))
    }

    const refReceiver = (data) => {
        setCurrentRef(data);
        return data; 
    }

    return (
        <>
            <PageWrapper>
                <BackgroundText>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis nisi quam quos quae, quaerat corporis nemo aut mollitia voluptas dolorum ullam quo, eum eligendi alias debitis illum dolores placeat atque culpa repellendus ea accusamus consequatur ipsam velit! Possimus labore velit consectetur? Ratione praesentium accusantium cum laudantium, nemo explicabo nulla quasi deleniti, ut modi, perspiciatis voluptas eaque at quia? Asperiores, obcaecati repellat consequatur, a laudantium officia corrupti, culpa tempora sapiente assumenda praesentium voluptatum dolorem sint debitis exercitationem sunt dolor nostrum enim. Dicta voluptatibus repellat facere, ex cumque eligendi dolorum facilis nobis fugit voluptates expedita consequuntur quod assumenda tempora dolores fuga rerum officia autem explicabo. Beatae dolorem eius incidunt omnis, nulla eveniet assumenda quae odit ad cumque voluptates perferendis ab, vitae ipsum consectetur provident vel fuga neque id minus pariatur deleniti. Tempora dolorum ratione ipsa hic expedita! Porro distinctio asperiores vel? Beatae adipisci numquam veritatis in sequi, laudantium porro similique illum sed iste fuga sint totam. Dicta, minus rerum quae culpa eos neque tempore veritatis, placeat aut, enim quos sint ut iusto perferendis. Nobis corporis quae doloremque eius qui distinctio repellat ipsa quas amet porro aliquid omnis fuga repudiandae magni debitis laudantium sapiente molestiae deleniti, quos in accusantium fugit. Sit officiis, tenetur optio blanditiis maxime ex commodi deleniti sint, nam atque minus rerum placeat ut natus, quia unde excepturi aperiam accusantium libero! Accusantium vero voluptatum similique porro, aspernatur asperiores? Consectetur asperiores quia perspiciatis voluptate nesciunt ex tenetur pariatur aperiam veritatis, distinctio enim omnis natus inventore sapiente. Id vitae consectetur accusamus dolor reprehenderit quaerat voluptatem, error vel enim quae ab. Delectus tempore labore neque dolore voluptas maxime est laborum. Illo maiores sapiente quibusdam dolorum. Aut ad doloremque fugit veritatis nostrum molestias molestiae rem a vel dolor, consequatur at corrupti unde in numquam error, nisi harum impedit atque ullam iure dolores sit optio debitis? Obcaecati soluta recusandae veritatis, quae sequi libero sit. Quaerat quia architecto voluptates illum ullam laboriosam maxime, ipsum, doloribus accusantium dolores quibusdam voluptas voluptatibus repellat. Fugit illum nemo incidunt eaque dolorum, iste libero placeat rem autem cupiditate ea voluptas delectus, corrupti dolorem error dolor nihil maiores sunt eveniet! Dolores esse vitae voluptates, rem quibusdam inventore corporis distinctio nulla odit alias, id quasi earum quos doloribus ullam repudiandae fugit aspernatur sequi necessitatibus consequatur magnam nostrum blanditiis illo. Voluptates voluptas consequuntur assumenda laboriosam. Commodi dolores minus dicta excepturi provident similique, at sint ipsam corrupti adipisci, consequuntur asperiores ducimus esse odit, odio eveniet laboriosam.</BackgroundText>
                <BackgroundText>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur eos exercitationem aliquam. Debitis est similique veniam nobis ea eius impedit, ex consequatur eum assumenda odit et, ut quae facilis accusamus! Saepe maxime dignissimos sunt necessitatibus corporis. Qui facilis pariatur sequi quidem aperiam! Perspiciatis similique officiis dolore dolorem consequuntur unde eligendi, illum excepturi omnis quibusdam quas id repudiandae aperiam dolores architecto consectetur libero? Ipsum fuga numquam atque quod aliquid culpa esse obcaecati ab enim, suscipit, dolorem nostrum magnam vel laboriosam eos nemo similique voluptas, iste animi? Exercitationem vel rerum cupiditate numquam tempora, quaerat doloremque non culpa explicabo consequuntur nam amet tempore eos doloribus quisquam molestiae ipsum placeat sunt. Eligendi cupiditate modi ducimus dignissimos fugit. Illum, similique. Illum asperiores quisquam fugit excepturi doloremque, laborum aspernatur reprehenderit et neque! Placeat hic sapiente deserunt suscipit molestias porro, accusantium consequatur, eum quo facere delectus dolor aliquam accusamus aut sit illo! Iure nostrum repellendus assumenda possimus? Et ex soluta nisi rem ea consequuntur voluptate vitae fugiat veniam error asperiores doloremque, hic voluptates incidunt, repudiandae qui veritatis nam vero? Ea deserunt fuga, eos modi recusandae velit quia ducimus dolor, dolorem iste quaerat, ullam nam. Necessitatibus doloremque fuga, repudiandae vero quas aspernatur saepe atque doloribus accusantium placeat optio rerum. Aperiam totam labore aspernatur! Hic facilis quibusdam modi. Veniam ducimus voluptatum eum! Vel repellat facere, voluptatem totam nobis quo ratione. Dolores dolorem fugiat aspernatur illum quos! Hic reprehenderit quae beatae, inventore rerum accusamus odit nam porro debitis fuga cum ratione consectetur totam. Deleniti, in. Magnam qui commodi asperiores quidem aliquid praesentium eum necessitatibus a accusamus itaque illum placeat sit nam fugit neque temporibus quae deserunt laboriosam, corporis facere architecto quia? Eos debitis quaerat officia suscipit voluptates libero, repellendus amet earum quasi aliquid ipsa nihil laborum expedita, dolorem minima, est neque consequatur obcaecati quam provident. Consectetur, enim? Dolor, quas ab corrupti aut magni porro cum corporis nemo optio qui odit. Nihil mollitia tenetur saepe doloremque voluptates hic dolor facilis labore, delectus nulla non eum dicta id consequatur obcaecati veritatis praesentium animi aspernatur, voluptatum, modi autem sapiente illum sunt. Quam aspernatur nostrum quis hic et numquam explicabo tempora, incidunt optio quidem ex corporis sit, consectetur impedit repellendus delectus voluptatum nemo magni voluptatibus excepturi error unde reiciendis? Reprehenderit, dolore in libero quibusdam, optio pariatur velit repellat ullam nisi iusto magnam exercitationem beatae illo praesentium, soluta nostrum asperiores! Incidunt repellendus maiores eos deserunt unde laborum sit est eveniet sed officiis, a minima modi.</BackgroundText>
            </PageWrapper>
        <Modal>
            <ButtonHolder>
                <FillInputBtn onClick={() => insertCorrectInfo()}>Correct</FillInputBtn>
                <FillInputBtn onClick={() => insertIncorrectInfo()}>Incorrect</FillInputBtn>
            </ButtonHolder>
            <FormMother>
                    <FormHolder autoComplete="new-password">
                        <Banner>Information</Banner>
                        <IconHolder><PenDiv src={penicon}></PenDiv></IconHolder>
                    <LabelInputHolder>
                        <FocusEffectInput 
                            stateName='name'
                            labelName="Name *" 
                            stateValue={state.name}
                            {...controller}
                            refCollector={(e) => refReceiver(e)}
                            attributeSetter={(e) => attributeSetter(e)}
                            validation={() => validateInput(state.name, inputFields.name, currentRef)}
                        />
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <FocusEffectInput
                            stateName='email'
                            labelName="Email *"
                            stateValue={state.email}
                            {...controller} 
                            refCollector={(e) => refReceiver(e)}
                            attributeSetter={(e) => attributeSetter(e)}
                            validation={() => validateInput(state.email, inputFields.email, currentRef)}
                        />
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <FocusEffectInput 
                            stateName='age'
                            labelName="Age *" 
                            stateValue={state.age}
                            {...controller} 
                            refCollector={(e) => refReceiver(e)}
                            attributeSetter={(e) => attributeSetter(e)}
                            validation={() => validateInput(state.age, inputFields.age, currentRef)}
                        />
                    </LabelInputHolder>
                    <LabelInputHolder>
                        <FocusEffectInput
                            stateName='address'
                            labelName="Address *"
                            stateValue={state.address}
                            {...controller} 
                            refCollector={(e) => refReceiver(e)}
                            attributeSetter={(e) => attributeSetter(e)}
                            validation={() => validateInput(state.address, inputFields.address, currentRef)}  
                        />
                    </LabelInputHolder>
                    {validateForSubmit()  ? (
                        <FormSubmitBtn
                            onClick={(e) => submitHandler(e)}
                            type="submit"
                                className="clickable hvr-bob"
                        >Submit</FormSubmitBtn>
                    ) : 
                    <FormSubmitBtn
                        type="submit"
                        className="noClick"
                    >Submit</FormSubmitBtn>}
                    
                </FormHolder>
            </FormMother>
                <LoggedInMessage visible={state.isLoggedIn}>{`welcome ${state.name} you have successfully logged in`}</LoggedInMessage>
        </Modal>
        </>
    );
};

export default DynamicForm;