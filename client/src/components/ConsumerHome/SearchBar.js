import Dropdown from '@restart/ui/esm/Dropdown';
import { useRef, useState } from 'react';

export default function SearchBar({ setSearchWord, setSearchType }) {
  const searchWordRef = useRef(null);
  const [selectedSearchType, setSelectedSearchType] = useState(null);
  const onBtnClick = () => {
    setSearchWord(searchWordRef.current.value);
    setSearchType(selectedSearchType);
  };
  return (
    <div class='input-group mb-3'>
      <input
        type='text'
        class='form-control'
        aria-label='Text input with dropdown button'
        ref={searchWordRef}
      />
      <button
        class='btn btn-outline-secondary dropdown-toggle'
        type='button'
        data-bs-toggle='dropdown'
        aria-expanded='false'
      >
        {selectedSearchType ? selectedSearchType : 'Dropdown'}
      </button>
      <ul class='dropdown-menu dropdown-menu-end'>
        <li>
          <span
            class='dropdown-item'
            onClick={() => setSelectedSearchType('Platform')}
          >
            Platform
          </span>
        </li>
        <li>
          <span
            class='dropdown-item'
            onClick={() => setSelectedSearchType('Quiz')}
          >
            Quiz
          </span>
        </li>
      </ul>
      <button type='button' class='btn btn-primary' onClick={onBtnClick}>
        <i class='bi bi-search'></i>
      </button>
    </div>
  );
}
