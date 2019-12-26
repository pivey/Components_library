import React, { useReducer, useEffect, useRef } from 'react';
import styled from 'styled-components';
// import FocusEffectInput from './FocusEffectInput';

const PageWrapper = styled.div`
    display:flex;
    flex-direction:row;
    justify-content: flex-start; 
    align-items:flex-start; 
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
`;

const Modal = styled.div`
    height:100vh;
    width:100vw;
    background:rgba(38, 12, 12, 0.15);
    display:flex;
    flex-direction: column
    justify-content:center; 
    align-items:center; 
    z-index:999;
`;

const FormMother = styled.div`
    height:auto;
    width:auto;
    background:white;
    padding:6rem 6rem 2rem 6rem;
    border:2px solid darkGrey;
    z-index: 1000
`;

const FormHolder = styled.form`
    font-size:2.5rem;
    display:flex;  
    flex-direction:column;
    justify-content: center; 
    align-items: center; 
`;

const LabelInputHolder = styled.div`
    height:auto;
    width:100%;
    display:flex;
    margin: 0.2rem 0rem;
    justify-content: space-between; 
    align-items: center; 
`;

const InputLabel = styled.label`
`;

const FormInput = styled.input`
    transition: all 0.3s
    height:auto;
    width:70%;
    padding:1rem;
    background:white;
    color:black;
    border:2px solid lightGrey;
    &::placeholder {
        font-size:1.5rem;
    }
    &:hover {
        cursor: pointer;
        color:black;
        border:2px solid black;
    }
    &:focus {
        border:2px solid green;
    }
    &.invalid {
        border:2px solid red;
        color:red;
    }
    &.valid {
        color:green;
        border:2px solid green;
    }
`;

const FormSubmitBtn = styled.button`
    transition: all 0.3s
    padding:1rem;
    margin:3rem 0rem 1rem 0rem;
    border:2px solid black;
    pointer-events: none; 
    opacity:0.3;
    &.clickable {
        pointer-events:auto; 
        opacity:1;
        background: green;
        color:white;
        border:2px solid white;
    &:hover {
        cursor: pointer;
        }
    }
    &.noClick {
     pointer-events: none;
     opacity: 0.15;
    }
`;

const LoggedInMessage = styled.div`
    max-width:40%;
    height:auto;
    text-align:center; 
    font-size:2.5rem;
    border:2px solid green;
    background:white;
    color:green;
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
    padding:1rem;
    height:auto;
    width:auto;
    font-size:1.4rem;
    font-weight:bold;
    margin: 0rem 2rem
    border:2px solid black;
    background:white;
    &:hover {
        cursor: pointer;
        background:black; 
        color:white;
        border:2px solid white;
        transform: scale(0.98)
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
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const ageRef = useRef(null);
    const addressRef = useRef(null);
    const refs = [nameRef, emailRef, ageRef, addressRef];
    const [state, dispatch] = useReducer(dynamicFormReducer, initState);

    const inputFields = {
        name: /^[a-z\d]{1,20}$/i,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
        age: /^[0-9]{2,3}$/,
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
    }, [state])

    const classReset = () => {
        refs.map(el => {
            el.current.classList.remove('valid');
            el.current.classList.remove('invalid')
        })
    }

    const validateTestData = () => {
        classReset();
        const e = new Event('blur', { bubbles: true });
        let input = null;
        refs.map(x => {
            input = x.current;
            input.dispatchEvent(e);
        })
    }
    
    const  submitHandler = (e) => {
        e.preventDefault();
        console.log(state)
        dispatch({ type: 'isLoggedIn', payload: true });
        setTimeout(() => {
            dispatch({ type: 'reset' }); 
            classReset();
            dispatch({ type: 'isLoggedIn', payload: false });
        }, 1000)
    }

    const validateInput = (inputValue, regex, ref) => {
        const tested = regex.test(inputValue);  
        tested && ref.current.classList.add('valid')
        !tested && ref.current.classList.add('invalid')
    }

    const insertCorrectInfo = () => {
        const values = ['harry', 'harry@gmail.com', Number(35), '73 greenwich street']
        const keys = Object.keys(state);
        keys.splice(keys.length - 1);
        keys.map((el, i) => {
            dispatch({ type: el, payload: values[i] })
        })
        setTimeout(() => validateTestData(), 0);        
    }


    const insertIncorrectInfo = () => {
        const values = ['???)()(&&', '(((%%%)))harry@gmail.com', Number(0), '42 flanders ==//&&%%']
        const keys = Object.keys(state);
        keys.splice(keys.length - 1);
        console.log(keys)
        keys.map((el, i) => {
            dispatch({ type: el, payload: values[i] })
        })
        setTimeout(() => validateTestData(), 0)
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
                <FormHolder>
                    <LabelInputHolder>
                        <InputLabel htmlFor="name">Name: </InputLabel>
                            <FormInput 
                            type="text" //
                            id="name" //
                            name="name" //
                            autoComplete="false" //
                            placeholder="Monty" //
                            value={state.name}
                            ref={nameRef}
                            onChange={(e) => {
                                dispatch({ type: 'name', payload: e.target.value })
                            }}
                            onBlur={() => validateInput(state.name, inputFields.name, nameRef)}
                        />
                    </LabelInputHolder>
                        <br></br>
                    <LabelInputHolder>
                        <InputLabel htmlFor="email">Email: </InputLabel>
                            <FormInput 
                            type="email" //
                            id="email" //
                            name="email" //
                            autoComplete="false" // 
                            placeholder="joe@email.com" //
                            value={state.email}
                            ref={emailRef}
                            onChange={(e) => {
                                dispatch({ type: 'email', payload: e.target.value })
                            }}
                            onBlur={() => validateInput(state.email, inputFields.email, emailRef)}
                        />
                    </LabelInputHolder>
                        <br></br>
                    <LabelInputHolder>
                        <InputLabel htmlFor="age">Age: </InputLabel>
                            <FormInput 
                            type="number" //
                            id="age" // 
                            name="age" //  
                            min="1" // 
                            autoComplete="false" // 
                            placeholder="30" //
                            value={state.age}
                            ref={ageRef}
                            onChange={(e) => {
                                dispatch({ type: 'age', payload: e.target.value })
                            }}
                            onBlur={() => validateInput(state.age, inputFields.age, ageRef)}
                        />
                    </LabelInputHolder>
                        <br></br>
                    <LabelInputHolder>
                        <InputLabel htmlFor="address">Address: </InputLabel>
                            <FormInput 
                            type="text" //
                            id="address" // 
                            name="address" // 
                            autoComplete="false" // 
                            placeholder="32 allburns way" //
                            value={state.address}
                            ref={addressRef}
                            onChange={(e) => {
                                dispatch({ type: 'address', payload: e.target.value })
                            }}
                            onBlur={() => validateInput(state.address, inputFields.address, addressRef)}
                            />
                    </LabelInputHolder>
                    {validateForSubmit()  ? (
                        <FormSubmitBtn
                            onClick={(e) => submitHandler(e)}
                            type="submit"
                            className="clickable"
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