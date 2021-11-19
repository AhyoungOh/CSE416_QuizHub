import SearchBar from './SearchBar';
import Platforms from './Platforms';
import Quizzes from './Quizzes';
import { useState } from 'react';
function ConsumerHome() {
  // search keyword
  const [searchWord, setSearchWord] = useState(null);
  // quiz or platform or username
  const [searchType, setSearchType] = useState(null);

  return (
    <div>
      <SearchBar setSearchWord={setSearchWord} setSearchType={setSearchType} />
      {/* TODO: add the tabs for selection of platform or quiz */}
      <Platforms searchWord={searchWord} searchType={searchType} />
      <Quizzes searchWord={searchWord} searchType={searchType} />
    </div>
  );
}
export default ConsumerHome;
