import React, { FormEvent, useEffect, useState } from 'react'
import { object, string, number, ValidationError } from 'yup';
import { GrFormClose } from 'react-icons/gr'

import { axiosApp } from '../config/axios';
import { FormContent, FormContainer, Label, FormInput, FormButton } from '../styles'
import { FormType } from '../types';

const Form: React.FC<FormType> = ({type, setFormVisiblity, FormVisiblity, book}) => {
    const [id, setId] = useState(-1)
    const [name, setName] = useState('')
    const [author, setAuthor] = useState('')
    const [description, setDescription] = useState('')
    const [rating, setRating] = useState(0)

    const bookValues = {
        name: name,
        author: author,
        description: description,
        rating: rating
    }

    const bookSchema = object().shape({
        name: string()
              .required("*O campo nome é obrigatorio")
              .not([`[!@#$%^&*(),.?":{}|<>]`]),
        author: string()
                .required("*O campo autor é obrigatorio"),
        description: string()
                     .required("*O campo descrição é obrigatorio"),
        rating: number()
                .integer()
                .max(5, "A avaliação maxima é 5")
                .min(0, "A avaliação minima é 0")
                .required("*O campo de avaliação é obrigatorio")
    });

    const createBook = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        try {
            const isValid = await bookSchema.validate(bookValues);
            
            if (isValid) {
                axiosApp.post('/create', bookValues)
                .then(({status}) => {
                    if(status == 200){
                        alert(`O livro "${name}" foi inserido com sucesso!`)
                    }else{
                        alert(`Houve um erro ao inserir o livro.`)
                    }
                })
            }

        } catch (error) {
            if(error instanceof ValidationError){
                alert(error.message)
            }
        }
    }

    const alterBook = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();        
        try {
            const isValid = await bookSchema.validate(bookValues);
            
            if (isValid) {
                axiosApp.put('/update', { id: id, content: bookValues })
                .then(({status}) => {
                    if(status == 200){
                        alert(`O livro "${name}" foi atualizado com sucesso!`)
                    }else{
                        alert(`Houve um erro ao atualizar o livro.`)
                    }
                })
            }

        } catch (error) {
            if(error instanceof ValidationError){
                alert(error.message)
            }
        }
    }

    const setPreviousValues = () => {
        if(book){
            const { id, name, author, description, rating } = book;
        
            if(id){
                setId(id)
            }
            if(name){
                setName(name)
            }
            if(author){
                setAuthor(author)
            }
            if(description){
                setDescription(description)
            }
            if(rating){
                setRating(rating)
            }
        }
    }

    useEffect(() => {
        setPreviousValues()
    },[])

    return (
        <FormContainer>
                <GrFormClose 
                  onClick={() => setFormVisiblity(!FormVisiblity)}
                  size={25} 
                  style={{
                    marginLeft: '85%',
                    marginTop: '30px',
                    cursor: 'pointer'
                  }} 
                />        
                <FormContent
                    onSubmit={e => {
                        type == "alter"
                        ? alterBook(e)
                        : createBook(e)
                        }
                    }
                >
                <Label>
                    Nome
                    <FormInput
                        value={name}
                        type="text"
                        name="name"
                        placeholder='Nome do livro'
                        onChange={e => setName(e.target.value)}
                    />
                </Label>
                <Label>
                    Autor
                    <FormInput
                        value={author}
                        type="text"
                        name="author"
                        placeholder='Auto do livro'
                        onChange={e => setAuthor(e.target.value)}
                    />
                </Label>
                <Label>
                    Descrição
                    <FormInput
                        value={description}
                        type="text"
                        name="description"
                        placeholder='Descrição do livro'
                        onChange={e => setDescription(e.target.value)}
                    />
                </Label>
                <Label>
                    Avaliação
                    <FormInput
                        value={rating}
                        type="number"
                        name="rating"
                        placeholder='Avaliação do livro'
                        onChange={e => setRating(parseInt(e.target.value))}
                    />
                </Label>
                {
                    type == "alter"
                    ? <FormButton type="submit" value="Atualizar" />
                    : <FormButton type="submit" value="Salvar"    />
                }
            </FormContent>
        </FormContainer>
    )
}

export default Form;