import React, { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { ref, onValue, update } from "firebase/database";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function QuizAdmin() {
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    const docRef = ref(database, "questions/");
    onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      setQuiz(data);
      console.log(data.length);
    });
  }, []);

  const handleId = (e) => {
    if (e.target.checked) {
      const id = e.target.id;
      const btn = document.getElementById("submit" + id);
      btn.style.display = "block";
      setId(id);
    } else {
      const btn = document.getElementById("submit" + id);
      btn.style.display = "none";
    }
  };

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value.replace(/\n/g, "\\n");

    setData({ ...data, [id]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    update(ref(database, `questions/${id}/`), { ...data })
      .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.log("The write failed...");
      });
  };
  return (
    <div className="container">
      <Accordion defaultActiveKey="0">
        <h1 id="admin-title">Quiz Admin</h1>
        <div className="other-pages">
          <Link to="/quiznew">
            <button className="logout">Add & Delete</button>
          </Link>
        </div>
        <h6>
          <h1>Number of questions: {quiz.length}</h1>
          {quiz.map((quiz, index) => {
            return (
              <Accordion.Item eventKey={index}>
                <Accordion.Header>Question {index + 1}</Accordion.Header>
                <Accordion.Body>
                  <form id="form" onSubmit={handleAdd}>
                    <h6>Title: {quiz.prompt}</h6>
                    <input id="prompt" onChange={handleInput} />
                    <hr />
                    <h6>Option A: {quiz.optionA}</h6>
                    <input id="optionA" onChange={handleInput} />
                    <hr />
                    <h6>Option B: {quiz.optionB}</h6>
                    <input id="optionB" onChange={handleInput} />
                    <hr />
                    <h6>Option C: {quiz.optionC}</h6>
                    <input id="optionC" onChange={handleInput} />
                    <hr />
                    <h6>Option D: {quiz.optionD}</h6>
                    <input id="optionD" onChange={handleInput} />
                    <hr />
                    <h6>True Answer: {quiz.answer}</h6>
                    <Form.Select
                      aria-label="Default select example"
                      id="answer"
                      onChange={handleInput}
                    >
                      <option>The answer is?</option>
                      <option value="optionA">A</option>
                      <option value="optionB">B</option>
                      <option value="optionC">C</option>
                      <option value="optionD">D</option>
                    </Form.Select>
                    <hr />
                    <input type="checkbox" id={index} onClick={handleId} />
                    <label>Confirm you want to change question {index}</label>
                    <hr />
                    <button
                      type="submit"
                      id={"submit" + index}
                      name="submit"
                      style={{ display: "none" }}
                    >
                      Update
                    </button>
                  </form>
                </Accordion.Body>
              </Accordion.Item>
            );
          })}
        </h6>
      </Accordion>
    </div>
  );
}

export default QuizAdmin;
