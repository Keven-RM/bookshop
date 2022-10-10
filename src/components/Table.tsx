import { useState } from 'react'
import { createGlobalStyle } from 'styled-components'
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { GoGlobe } from 'react-icons/go'

import { theme, LinkButton } from '../styles/index'
import { axiosApp } from '../config/axios'
import { Book } from '../types'
import Form from './Form'

const GlobalStyle = createGlobalStyle`
    table {
      border-collapse: separate;
      border-spacing: 0;
      min-width: 350px;
      width: 100%;
      color: ${theme.green};
      -webkit-box-shadow: 0px 6px 5px -4px rgb(0 0 0 / 45%);
      -moz-box-shadow: 0px 6px 5px -4px rgb(0 0 0 / 45%);
      box-shadow: 0px 6px 5px -4px rgb(0 0 0 / 45%);
    }

    table tr th {
      text-align: center;
    }

    table tr th,
    table tr td {
      border-right: 1px solid ${theme.green};
      border-bottom: 1px solid ${theme.green};
      padding: 5px;
      background-color: ${theme.white};
    }

    table tr td {
      height: 50px;
    }

    table tr .actions {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }

    table tr .actions svg, 
    table tr .actions a {
      cursor: pointer;
    }

    table tr th:first-child,
      table tr td:first-child {
      border-left: 1px solid ${theme.green};
    }

    table tr th {
      background: ${theme.gray};
      border-top: 1px solid ${theme.green};
      border-bottom: 2px solid gray;
      text-align: left;
      font-weight: 600;
      color: ${theme.green};
    }

    /* top-left border-radius */
    table tr:first-child th:first-child {
      border-top-left-radius: 6px;
    }

    /* top-right border-radius */
    table tr:first-child th:last-child {
      border-top-right-radius: 6px;
    }

    /* bottom-left border-radius */
    table tr:last-child td:first-child {
    border-bottom-left-radius: 6px;
    }

    /* bottom-right border-radius */
    table tr:last-child td:last-child {
      border-bottom-right-radius: 6px;
    }
`;

interface TableProps {
  booksSaved: Book[] | [];
  setBooksSaved: (value: Book[] | []) => void;
}


export default function Table({ booksSaved, setBooksSaved }: TableProps) {
  const [FormVisiblity, setFormVisiblity] = useState(false);

  const removeBook = async (bookId: number) => {
    const { data } = await axiosApp.delete('/remove', { data: { id: bookId } });

    if (data) {
      setBooksSaved(booksSaved.filter(book => book.id !== bookId))
    }
  }

  return (
    <>
      <GlobalStyle />
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Autor</th>
            <th>Descrição</th>
            <th>Avaliação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {booksSaved.length > 0 ?
            booksSaved.map((book) => (
              <tr>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td className="rating">
                  {
                    Array.from({ length: book.rating }).map(() => (
                      <BsStarFill size={16} />
                    ))
                  }
                  {
                    book.rating < 5
                      ? Array.from({ length: (5 - book.rating) }).map(() => (
                        <BsStar size={16} />
                      ))
                      : <></>
                  }
                </td>
                <td className="actions">
                  <span>
                    <FaTrashAlt size={20} color={theme.red} onClick={() => removeBook(book.id)} />
                  </span>
                  <span>
                    <FaRegEdit size={20} onClick={() => setFormVisiblity(true)} />
                  </span>
                  <LinkButton href={`https://www.google.com/search?q=${book.name}&tbm=shop`} target="blank">
                    <GoGlobe size={20} />
                  </LinkButton>
                  {
                    FormVisiblity
                      ? <Form
                        type="alter"
                        setFormVisiblity={setFormVisiblity}
                        FormVisiblity={FormVisiblity}
                        book={book}
                      />
                      : <></>
                  }
                </td>
              </tr>
            ))
            :
            <></>
          }
        </tbody>
      </table>
      {

      }
    </>
  );
}