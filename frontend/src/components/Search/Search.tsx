import { SearchIcon } from "@/assets/icons/SearchIcon";
interface SearchProps {
  setSearchTerm: (term: string) => void;
}

export const Search = ({ setSearchTerm }: SearchProps) => {
  return (
    <div className="hero__screen__search__wrapper">
      <button className="hero__screen__btn__search">
        <SearchIcon width={20} height={20} />
      </button>
      <input
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder={"Let's find something true"}
        type="text"
        className="hero__screen_search_input search_inp"
      />
    </div>
  );
};