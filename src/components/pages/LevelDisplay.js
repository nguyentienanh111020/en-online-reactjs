import React from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Accordion from "react-bootstrap/Accordion";
import "../LevelDisplay.css";
import { useState, useEffect } from "react";
import { db } from "../firebase-config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";

function LevelDisplay() {
  const { id } = useParams();
  const [level, setLevel] = useState("");
  const [quest, setQuest] = useState([]);
  const [quest2, setQuest2] = useState([]);
  const [quest3, setQuest3] = useState([]);

  useEffect(() => {
    const docRef = doc(db, "beginner", id);
    getDoc(docRef).then((doc) => {
      const newData = doc.data();
      setLevel(newData);
    });

    //All answers 1
    const getQuest = async () => {
      const questRef = collection(db, "/beginner/" + id + "/question");
      const data = await getDocs(questRef);
      setQuest(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuest();

    //All anwser 2
    const getQuest2 = async () => {
      const questRef2 = collection(db, "/beginner/" + id + "/question 2");
      const data = await getDocs(questRef2);
      setQuest2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuest2();

    //All anwser 3
    const getQuest3 = async () => {
      const questRef3 = collection(db, "/beginner/" + id + "/question 3");
      const data = await getDocs(questRef3);
      setQuest3(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getQuest3();
  }, []);

  return (
    <div className="LevelList">
      {
        <div className="level">
          <h1>{level.name}</h1>
          <h3>{level.intros}</h3>
          <ReactPlayer url={level.url} controls />
          <audio src={level.audio} controls></audio>
          <Accordion defaultActiveKey={["0"]} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Script</Accordion.Header>
              <Accordion.Body>
                {level.script?.split("\\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Grammar</Accordion.Header>
              <Accordion.Body>
                {level.point1?.split("\\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  );
                })}
                <hr />
                {level.point2?.split("\\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  );
                })}
                <hr />
                {level.point3?.split("\\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  );
                })}
                <hr />
                {level.point4?.split("\\n").map((item, idx) => {
                  return (
                    <span key={idx}>
                      {item}
                      <br />
                    </span>
                  );
                })}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Quiz</Accordion.Header>
              <Accordion.Body>
                {level.title1}
                {quest.map((quest, idx) => {
                  if (quest.isCorrect == "true") {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          className="radioCheck isCorrect"
                          value="Yes"
                          id="true1"
                          name="q1"
                        />
                        <label className="isCorrect">{quest.text}</label>
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          className="radioCheck"
                          name="q1"
                          value="Yes"
                        />
                        <label className="inCorrect">{quest.text}</label>
                      </div>
                    );
                  }
                })}
                <hr />
                {level.title2}
                {quest2.map((quest2, idx) => {
                  if (quest2.isCorrect == "true") {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          className="radioCheck isCorrect"
                          name="q2"
                          value="Yes"
                          id="true2"
                        />
                        <label className="isCorrect">{quest2.text}</label>
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          className="radioCheck"
                          name="q2"
                          value="Yes"
                        />
                        <label className="inCorrect">{quest2.text}</label>
                      </div>
                    );
                  }
                })}
                <hr />
                {level.title3}
                {quest3.map((quest3, idx) => {
                  if (quest3.isCorrect == "true") {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          className="radioCheck isCorrect"
                          name="q3"
                          value="Yes"
                          id="true3"
                        />
                        <label className="isCorrect">{quest3.text}</label>
                      </div>
                    );
                  } else {
                    return (
                      <div key={idx}>
                        <input
                          type="radio"
                          className="radioCheck"
                          name="q3"
                          value="Yes"
                        />
                        <label className="inCorrect">{quest3.text}</label>
                      </div>
                    );
                  }
                })}
                <hr />
                <button
                  onClick={function () {
                    let result = 0;
                    let elms = document.getElementsByClassName("isCorrect");
                    for (let i = 0; i < elms.length; i++) {
                      if (elms[i].checked) {
                        result++;
                      }
                    }
                    if (result == 3) {
                      document.getElementById(
                        "result"
                      ).innerHTML = `You has finished all the answers`;
                      let user = JSON.parse(localStorage.getItem("user"));
                      console.log(user.uid);
                      // addDoc(collection(db, "users", user.uid, "beginner"), {
                      //   done: `${level.name}`,
                      // });
                      updateDoc(doc(db, "users", user.uid), {
                        beginner: arrayUnion(`${level.name}`),
                      });
                    } else {
                      document.getElementById(
                        "result"
                      ).innerHTML = `You answered correctly ${result} question`;
                    }
                  }}
                >
                  Check Answers
                </button>
                <button
                  onClick={function () {
                    let elms = document.getElementsByClassName("isCorrect");
                    for (var i = 0; i < elms.length; i++) {
                      elms[i].style.color = "blue";
                    }
                  }}
                >
                  Show Answers
                </button>

                <button
                  onClick={function () {
                    const elist = document.getElementsByTagName("input");
                    for (const el of elist) {
                      el.checked = false;
                    }
                    document.getElementById("result").innerHTML = ` `;
                    let elms = document.getElementsByClassName("isCorrect");

                    for (var i = 0; i < elms.length; i++) {
                      elms[i].style.color = "black";
                    }
                  }}
                >
                  Reset
                </button>
                <p id="result"></p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      }
    </div>
  );
}
export default LevelDisplay;
