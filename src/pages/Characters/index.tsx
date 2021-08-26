import * as React from "react";
import * as Mui from "@material-ui/core";
import { useSelector } from "react-redux";
import CharacterCard from "./CharacterCard";
import { Character } from "../../types";

function Characters() {
  const { pages } = useSelector(
    (state: { pages: { characters: Character[][] } }) => state
  );
  const [currentPage, setCurrentPage] = React.useState(1);
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    if (e.currentTarget.value === "next") {
      setCurrentPage(currentPage + 1);
    } else if (e.currentTarget.value === "prev") {
      setCurrentPage(currentPage - 1);
    }
  }
  return (
    <div>
      <h1>Characters</h1>
      <Mui.Grid>
        {pages.characters[currentPage - 1].map(
          (el: { id: number; image: string; status: string; name: string }) => (
            <CharacterCard
              key={el.id}
              image={el.image}
              status={el.status}
              name={el.name}
            />
          )
        )}
      </Mui.Grid>
      <Mui.Button
        value="prev"
        onClick={(e) => handleClick(e)}
        disabled={currentPage === 1}
      >
        prev
      </Mui.Button>
      <span>{currentPage}</span>
      <Mui.Button
        value="next"
        onClick={(e) => handleClick(e)}
        disabled={currentPage === pages.characters.length}
      >
        next
      </Mui.Button>
    </div>
  );
}

export default Characters;
