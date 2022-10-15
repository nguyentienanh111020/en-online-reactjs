import { React, useState } from "react";
import "../Dictionary.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
function Dictionary() {
  const sound = document.getElementById("sound");
  const sound2 = document.getElementById("sound2");
  const [meanings, setMeanings] = useState([]);
  const [phonetics, setPhonetics] = useState([]);
  const [word, setWord] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMeanings(data[0].meanings);
        setPhonetics(data[0].phonetics);
        setWord(data[0].word);
        setError("");
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        sound2.setAttribute("src", `${data[0].phonetics[1].audio}`);
      })
      .catch((err) => setError(err));
  };

  function playSound() {
    sound.play();
  }
  return (
    <div className="dictionary-container">
      <h1 style={{ paddingBottom: "10px" }}>Dictionary</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Write the word you want to search"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          id="inp-word"
        />
        <Button
          variant="outline-secondary"
          id="search-btn"
          onClick={handleSearch}
        >
          Button
        </Button>
      </InputGroup>

      <div class="result" id="result">
        <audio id="sound" controls></audio>
        <div></div>
        <audio id="sound2" controls></audio>
        <h2>{word}</h2>
        {phonetics.map((phonetic, index) => (
          <span key={index}>{phonetic.text} </span>
        ))}
        <hr />
        {meanings.map((meaning, index) => (
          <li className="contain">
            <div className="details meaning">
              <h3>Meaning</h3>
              {meaning.definitions.map((definition, index) => (
                <p key={index}>{definition.definition}</p>
              ))}
            </div>
            {meaning.synonyms.length !== 0 && (
              <div className="details synonyms">
                <h3>Synonyms</h3>
                {meaning.synonyms.map((synonym, index) => (
                  <span key={index}>{synonym}, </span>
                ))}
              </div>
            )}
            <hr />
          </li>
        ))}
      </div>
    </div>
  );
}
export default Dictionary;
