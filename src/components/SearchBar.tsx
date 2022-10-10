import { useState } from 'react'

import { axiosApp } from '../config/axios'
import { SearchInput, Search, SearchResult, SearchResultText, SaveIcon } from '../styles'
import { Book } from '../types';


type SearcBar = {
    setBooksSaved: (value: Book[] | []) => void;
    booksSaved: Book[] | [];
  }

const SearchBar= ({setBooksSaved, booksSaved}: SearcBar) => {
    const [inputValue, setInputValue] = useState('')
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState<Book[]>([]);

    const loadList = async () => {
        const { data } = await axiosApp('/list')
        setPosts(data)
    }

    const handleSearchChange = (e: any) => {
        setInputValue(e.target.value);

        setSearchResults(posts.filter(({ name, description, author }: Book) => (
            name.includes(e.target.value) ||
            description.includes(e.target.value) ||
            author.includes(e.target.value)
        )));
    }

    const handleSaveBook = (post: Book) => {
        if(!booksSaved.some((item: Book) => item.id == post.id)){
            setBooksSaved([...booksSaved, post])
        }
    }

    return (
        <Search>
            <SearchInput
                onClick={() => loadList()}
                type="text"
                id="searchBar"
                placeholder="Buscar..."
                onChange={e => handleSearchChange(e)}
            />
            <main>
                <ul>
                {
                    inputValue != ""
                        ? searchResults?.length <= 0
                            ? <SearchResult>
                                <SearchResultText>Não foi possivel achar o livro pesquisado</SearchResultText>
                              </SearchResult>
                            : searchResults?.map((post) => (
                                <SearchResult>
                                    <div>
                                        <SearchResultText>{post.name}</SearchResultText>
                                        <SearchResultText>{post.author}</SearchResultText>
                                        <SearchResultText>{post.description}</SearchResultText>
                                        <SearchResultText>{post.rating} estrelas</SearchResultText>
                                    </div>
                                    <span>
                                        <SaveIcon size={20} onClick={() => handleSaveBook(post)} />
                                    </span>
                                </SearchResult>
                            ))
                        : <></>
                }
                </ul>
            </main>
        </Search>
    )
}

export default SearchBar;