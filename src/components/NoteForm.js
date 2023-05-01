import React, { useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Wrapper = styled.div`
    height: 100%;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 90%;
    margin: 0 0 30px 0;
`;

const ThemeArea = styled.textarea`
    width: 100%;
    margin: 0 0 30px 0;
`;

const NoteForm = props => {
    console.log(props);
    const [value, setValue] = useState({
        theme: props.theme || '',
        content: props.content || ''
    });

    const onChange = event => {
        setValue({
            ...value,
            [event.target.name]: event.target.value
        });
    };

    return(
        <Wrapper>
        <Form
            onSubmit={e=>{
                e.preventDefault();
                props.action({
                    variables: {
                        ...value
                    }
                });
            }}
        >
            <ThemeArea
                required
                type="text"
                name="theme"
                placeholder='Тема записи'
                value={value.theme}
                onChange={onChange}
            />
            <TextArea
                required
                type="text"
                name="content"
                placeholder='Содержимое записи'
                value={value.content}
                onChange={onChange}
            />
            <Button type="submit">Сохранить</Button>
        </Form>
        </Wrapper>
    );
};

export default NoteForm;