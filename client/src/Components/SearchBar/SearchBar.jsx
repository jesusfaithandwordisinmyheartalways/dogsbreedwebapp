



import React, { useContext, useEffect, useState } from 'react'
import { DogStoreContext } from '../../Context/DogStoreProvider'
import { useLocation, useNavigate } from 'react-router-dom'
import { dogs_products } from '../ArrayData/adoptdogs'
import { Search } from 'lucide-react'; 
import './SearchBar.css'




const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(DogStoreContext)
    const [navbarVisible, setNavbarVisible] = useState(false)
    const [suggestions, setSuggestions] = useState([]); // Autocomplete suggestions
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if(location.pathname.includes('category')) {
             setNavbarVisible(true)
        } else {
            setNavbarVisible(false)

        }
    }, [location])



    

     // Update URL as the user types. dynamic updates, suggestions, selection updates URL
     useEffect(() => {
      const params = new URLSearchParams(location.search);
  
      if (search.trim() !== '') {
          // Update URL with search query using search?q=
          params.set('search', search);
  
          // Generate filtered suggestions
          const filteredSuggestions = dogs_products
              .filter(data => data.name.toLowerCase().includes(search.toLowerCase()))
              .map(data => data.name);
              
          setSuggestions(filteredSuggestions);
      } else {
          // Clear search from URL and reset suggestions
          params.delete('search');
          setSuggestions([]);
      }
  
      navigate(`${location.pathname}?search?q=${params.get('search') || ''}`, { replace: true });
  }, [search, location.pathname,location.search, navigate]);






    

     // Handle search icon click
     const textFilteredSearch = () => {
        if (search.trim() !== '') {
          setShowSearch(false);
          navigate(`/category?search=${search}`);
          window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Add this
        }
      };
  
      const searchSuggestionsClick = (suggestion) => {
        setSearch(suggestion);
        setSuggestions([]);
        navigate(`/category?search=${suggestion}`);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 👈 Add this
      };






  return   (
    <>
     <div className={'search-input-container'}>
       <div className={'search-input-wrapper'}>
        <div className='input-user'>
           <div><input value={search} onChange={(e) =>  setSearch(e.target.value)} placeholder='Search Dog Breed' ></input></div>
            <div><Search onClick={textFilteredSearch} className='search-icon' size={38} /></div>
            </div>


            




            <div className="autocomplete-suggestions">
                {suggestions.length > 0 && (
                   <ul >
                      {suggestions.map((data, index) => (
                        <li key={index} onClick={() => searchSuggestionsClick(data)} >{data}</li>
                      ))}
                   </ul>
                )}

                </div>

              








                </div>

                
            </div>

    </> 
  )
}


export default SearchBar
