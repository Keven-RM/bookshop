import styled from 'styled-components'
import { FaRegSave } from 'react-icons/fa'

export const theme = {
    green: "#0B8F44",
    red: "#CF3E3D",
    white: "#F9F9F9",
    gray: "#EBF4EF"

}

export const Header = styled.header`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 100px;
    align-items: center;
`

export const Title = styled.h2`
    font-family: sans-serif;
    font-size: 20pt;
    color: ${theme.green};
`

export const Button = styled.div`
    display: flex;
    width: 75px;
    align-items: center;
    justify-content: center;
    height: 55px;
    background-color: ${theme.white};
    border: 2px solid ${theme.green};
    border-radius: 15px;
    cursor: pointer;
`

export const Main = styled.main`
    margin-top: 80px;
`

export const Search = styled.div`
    margin-top: 70px;
`

export const SearchInput = styled.input`
    width: 100%;
    font-size: 11pt;
    outline: none;
    padding: 10px;
    border-radius: 8px;
    border: 2px solid ${theme.green};
    background-color: ${theme.white};
    -webkit-box-shadow: 0px 6px 5px -4px rgb(0 0 0 / 45%);
    -moz-box-shadow: 0px 6px 5px -4px rgb(0 0 0 / 45%);
    box-shadow: 0px 6px 5px -4px rgb(0 0 0 / 45%);
    
    &::placeholder {
        color: ${theme.green};
        font-weight: 600;
        opacity: 1;
    }
    
    &:-ms-input-placeholder {
        color: ${theme.green};
        font-weight: 600;
    }

    &::-ms-input-placeholder {
        color: ${theme.green};
        font-weight: 600;
    }
`

export const FormContainer = styled.div`
    position: absolute;
    width: 500px;
    min-height: 500px;
    background-color: ${theme.gray};
    border-radius: 20px;
    top: 50px;
    left: 50%;
    transform: translate(-50%, 0);
`;

export const FormContent = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px 50px;
`;

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-weight: 600;   
`;

export const FormInput = styled.input`
    font-size: 12pt;
    margin-top: 5px;
    outline: none;
    padding-left: 5px;
    height: 32px;
    border: 1px solid #76d576;
    border-radius: 7px;
`;

export const FormButton = styled.input`
    height: 40px;
    color: black;
    background-color: ${theme.white};
    font-size: 13pt;
    border: 1px solid ${theme.green};
    border-radius: 12px;
    cursor: pointer;
    transition: 50ms;

    &:hover{
        border: 1px solid ${theme.green};
        background-color: ${theme.green};
        color: ${theme.white};
    }
`

export const SearchResult = styled.li`
    display: flex;
    justify-content: space-between;

    width: 100%;
    padding: 10px;
    padding-top: 10px;
    background: ${theme.gray};
    border-top: 1px solid gray;
    list-style: none;

    &: first-child {
        border-top: none;
    }
`;

export const SearchResultText = styled.span`
    &: after {
        content: "  —  ";
        color: black;    
    }
    
    &:last-child {
        &: after {
            content:none;    
        }
    }
`;

export const SaveIcon = styled(FaRegSave)`
    color: ${theme.green};
    cursor: pointer;
`

export const LinkButton = styled.a`
    color: #4848f7;

    &:visited {
        color: #4848f7;
    }

    &:active {
        color: #4848f7;
    }
`;