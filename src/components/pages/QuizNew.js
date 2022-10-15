import { useEffect, useState } from "react";
import { database } from "../firebase-config";
import { ref, onValue, set, remove } from "firebase/database";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function QuizNew() {
  const [quiz, setQuiz] = useState([]);
  const [data, setData] = useState("");
  const [id, setId] = useState("");
  const [delId, setDelId] = useState("");
  useEffect(() => {
    const docRef = ref(database, "questions/");
    onValue(docRef, (snapshot) => {
      const data = snapshot.val();
      setQuiz(data);
      setId(data.length);
    });
  }, []);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value.replace(/\n/g, "\\n");

    setData({ ...data, [id]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    set(ref(database, `questions/${id}/`), { ...data })
      .then(() => {
        alert("Data saved successfully!");
      })
      .catch((error) => {
        console.log("The write failed...");
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    const del = document.getElementById("delete").value;
    if (del != "") {
      remove(ref(database, `questions/${del}/`))
        .then(() => {
          alert("Data saved successfully!");
        })
        .catch((error) => {
          console.log("The write failed...");
        });
    } else {
      alert("please input the id");
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "165px" }}>
      <Accordion>
        <h1 id="admin-title">Quiz Admin</h1>
        <div className="other-pages">
          <Link to="/quizadmin">
            <button className="logout">View & Update</button>
          </Link>
        </div>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Quiz</Accordion.Header>
          <Accordion.Body>
            <form id="form" onSubmit={handleAdd}>
              <h6>Title:</h6>
              <input id="prompt" onChange={handleInput} required />
              <hr />
              <h6>Option A:</h6>
              <input id="optionA" onChange={handleInput} required />
              <hr />
              <h6>Option B:</h6>
              <input id="optionB" onChange={handleInput} required />
              <hr />
              <h6>Option C:</h6>
              <input id="optionC" onChange={handleInput} required />
              <hr />
              <h6>Option D: </h6>
              <input id="optionD" onChange={handleInput} required />
              <hr />
              <h6>True Answer:</h6>
              <Form.Select
                aria-label="Default select example"
                id="answer"
                onChange={handleInput}
                required
              >
                <option></option>
                <option value="optionA">A</option>
                <option value="optionB">B</option>
                <option value="optionC">C</option>
                <option value="optionD">D</option>
              </Form.Select>
              <hr />
              <button type="submit" id="submit" name="submit">
                Update
              </button>
            </form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Delete Quiz</Accordion.Header>
          <Accordion.Body>
            <form onSubmit={handleDelete}>
              <input id="delete" />
              <br />
              <label>Input the ID of question you want to delete</label>
              <hr />
              <button type="submit">Delete</button>
            </form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default QuizNew;
