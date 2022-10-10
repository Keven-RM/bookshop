import { useState } from 'react'
import { Button, Title, Header, Main, theme } from './styles/index'
import { IoLibrarySharp } from 'react-icons/io5';
import { HiPlusCircle } from 'react-icons/hi'

import Table from './components/Table'
import SearchBar from './components/SearchBar';
import Form from './components/Form';
import { Book } from './types';

function App() {
  const [FormVisiblity, setFormVisiblity] = useState(false);
  const [booksSaved, setBooksSaved] = useState<Book[] | []>([])

  return (
    <>
      <Header>
        <IoLibrarySharp size={35} color={theme.green} />
        <Title>Bookshop</Title>
        <Button onClick={() => setFormVisiblity(!FormVisiblity)}>
          <HiPlusCircle size={25} color={theme.green} />
        </Button>
      </Header>
      <SearchBar setBooksSaved={setBooksSaved} booksSaved={booksSaved} />
      <Main>
        <Table booksSaved={booksSaved} setBooksSaved={setBooksSaved} />
      </Main>
      <>
        {
          FormVisiblity
            ? <>
              <Form type="create" setFormVisiblity={setFormVisiblity} FormVisiblity={FormVisiblity} />
            </>
            : <></>
        }
      </>
    </>
  )
}

export default App
