import React, {useState} from 'react';
import './Search.css';
import { search } from '../../../api';
import { ReactComponent as MySvg } from '../../../local/svg/search.svg';


interface SearchProps {
  onSubmit: (query: string) => void;
}

export const fetchResults = async (query: string) => {
  const results = await search(query);
  console.log(results);
}

const Search: React.FC<SearchProps> = ({onSubmit}) => {

  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  }


  return (
    <form className='header-search' onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Search" 
        className='search-input'
        value={query}
        onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className='search-button'><MySvg className='button-svg'/></button>
    </form>
  );
};

export default Search;
