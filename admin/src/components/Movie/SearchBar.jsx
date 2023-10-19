import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

// libs
import { cn } from '../../lib';

const SearchBar = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [state, setState] = useState(false);
  const node = useRef();
  const inputFocus = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener('mousedown', handleClick);
    // cleanup event when unmounted
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  // On click outside, change input state to false
  const handleClick = (e) => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    setState(false);
  };

  function onFormSubmit(e) {
    e.preventDefault();
    if (!input) {
      return;
    }
    setInput('');
    setState(false);
    navigate(`/search/${input}`);
  }

  return (
    <form
      onClick={() => {
        setState(true);
        inputFocus.current.focus();
      }}
      onSubmit={onFormSubmit}
      ref={node}
      className={cn(
        `
      flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary p-8 shadow-sm outline-none transition-all  
      `,
        state ? 'w-[20rem] cursor-auto sm:w-[30rem]' : 'w-8 cursor-pointer'
      )}
    >
      <button
        type="submit"
        className={cn(
          'text-white border-none bg-transparent leading-none outline-none',
          state
            ? 'pointer-events-auto cursor-pointer'
            : 'pointer-events-none cursor-none'
        )}
      >
        <BsSearch className="h-8 w-8" />
      </button>
      <input
        ref={inputFocus}
        value={input}
        placeholder="Search..."
        onChange={(e) => setInput(e.target.value)}
        className={cn(
          'w-full border-none text-white bg-transparent p-0 text-2xl placeholder:text-white/80 leading-none outline-none transition-all focus:outline-none active:outline-none',
          state ? 'ml-4' : 'ml-0'
        )}
      />
    </form>
  );
};

export default SearchBar;
