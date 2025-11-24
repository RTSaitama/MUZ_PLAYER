import { SearchIcon } from "../../assets/icons/SearchIcon"
export const Hero = () => {



  return (
    <div className="hero__screen container">
      {/* #region search */}
      <div className="hero__screen__search__wrapper">
        <button
          className="hero__screen__btn__search"
          // onClick={search}
        ><SearchIcon width={20} height={20}/></button>
        <input
          placeholder={'Let\'s find something true'}
          type="text"
          className="hero__screen_search_input search_inp"
          // value={query}
          // onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {/* endregion */}
      {/* #region Heading */}
      <h2 className="hero__screen__heading">WHAT’S NEW?</h2>
      <p className="hero__screen__subheading">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed
        pellentesque odio, nec iaculis turpis. Praesent convallis est vitae
        auctor consequat. Aliquam pretium suscipit facilisis. Cras ornare
        ligula nulla, non fringilla lacus tincidunt in. Aenean mattis id dui
        sed semper.
      </p>
      {/* #endregion */}
      <button className="hero__screen__btn btn__start btn">Start</button>
    </div>
  )
}
