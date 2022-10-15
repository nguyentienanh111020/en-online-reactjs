import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Image from "react-bootstrap/Image";
import "../LevelDisplay.css";
import { db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

function LevelTest() {
  return (
    <div className="LevelList" style={{ paddingBottom: "120px" }}>
      {
        <div className="level">
          <h1>Level Test</h1>
          <h3>We'll find out how proficient you are in English. </h3>
          <audio
            src="https://firebasestorage.googleapis.com/v0/b/enonline-9f93c.appspot.com/o/983-Greg-Wages.mp3?alt=media&token=99de8990-361a-4204-8dc3-84ffbc2ab94a"
            controls
          ></audio>
          <Accordion defaultActiveKey={["0"]}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Script</Accordion.Header>
              <Accordion.Body>
                Todd: So Greg, we're talking about controversial issues and one
                of the issues in your book is income disparity. So, what do you
                think about minimum wage?
                <br /> <br />
                Greg: Minimum wage. Minimum wage I think is very important to
                have otherwise employers are going to take advantage of people;
                pay them too little. The society, society itself must decide
                what is the proper minimum wage and that in itself is an issue.
                What should it be?
                <br /> <br />
                Todd: You know, actually I disagree. I am actually against a
                minimum wage. I think that you know, basically all markets find
                equilibrium and that the wage goes too low people just won't do
                the job, and so basically, it you don't have a minimum wage
                eventually the society will come to a wage where people fell
                comfortable doing that work. That basically things will work
                out.
                <br /> <br />
                Greg: In theory maybe you're right, but in reality you're really
                wrong. I mean take a look at some of these countries around the
                world where there are sweat shops, where you have children,
                cause there are no rules regulating labor, and you have children
                who have never been educated, spend their entire lives working
                almost like slaves in unhealthy conditions. That's what happens
                when there are no rules to protect workers.
                <br /> <br /> Todd: But I think that's somewhat true but you
                said the key word that they're not educated. I think the problem
                there is that people aren't educated and that's what leads the
                abject poverty that they might do a job like that. So don't you
                think that if people were educated more, they would not be
                willing to work such meaningless jobs, such jobs that pay so
                little.
                <br /> <br />
                Greg: Many of those people, those children, who are working like
                slaves, don't have a chance for an education and often maybe
                they're being exploited, not always but sometimes, by people
                who've had good education.
                <br /> <br />
                Todd: Right.
                <br /> <br />
                Greg: Take a child in some very poor country has to work just to
                find food.
                <br /> <br />
                Todd: So basically, you're saying they should have a living
                wage. That they should make enough money that they can have a
                decent standard of living. <br /> <br />
                Greg: Everyone should have a decent standard of living I
                believe. <br /> <br />
                Todd: I just think that it's really hard to arbitrarily set a
                price. I mean that number is always going to go up and down.
                That even a minimum wage is somewhat skews the reality that if
                you just let markets take their natural course eventually people
                won't be willing to work. Greg: It doesn't work that way because
                when you just have a complete free market, you have corrupt
                people who take advantage of other people. <br /> <br />
                Todd: Well, you know, that actually I do agree with but I think
                ... I do believe in a free markets but one thing that is true is
                that free markets cannot work where's there's corruption. I do
                agree with that. So we agree about something. <br /> <br />
                Greg: Yes. Good thing.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Quiz</Accordion.Header>
              <Accordion.Body>
                <div>
                  <h6>1) Greg thinks _____ should choose the minimum wage.</h6>
                  <input
                    type="radio"
                    className="radioCheck"
                    name="q1"
                    value="Yes"
                  />
                  <label className="inCorrect">workers</label>
                  <br />
                  <input
                    type="radio"
                    className="radioCheck"
                    name="q1"
                    value="Yes"
                  />
                  <label className="inCorrect">employers</label>
                  <br />
                  <input
                    type="radio"
                    className="radioCheck"
                    name="q1"
                    value="Yes"
                    id="true1"
                  />
                  <label className="isCorrect">society</label>
                </div>
                <hr />
                <h6>2) Todd thinks all markets find ________ .</h6>
                <input
                  type="radio"
                  className="radioCheck"
                  name="q2"
                  value="Yes"
                />
                <label className="inCorrect">work</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q2"
                  value="Yes"
                  id="true2"
                />
                <label className="isCorrect">equilibrium</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q2"
                  value="Yes"
                />
                <label className="inCorrect">problems</label>
                <hr />
                <h6>3) Greg says Todd is wrong in _____ .</h6>
                <input
                  type="radio"
                  className="radioCheck"
                  name="q3"
                  value="Yes"
                />
                <label className="inCorrect">theory</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q3"
                  value="Yes"
                  id="true3"
                />
                <label className="isCorrect">reality</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q3"
                  value="Yes"
                />
                <label className="inCorrect">labor</label>
                <hr />
                <h6>4) Todd thinks the problem is ______ .</h6>
                <input
                  type="radio"
                  className="radioCheck"
                  name="q4"
                  value="Yes"
                />
                <label className="inCorrect">meaningless jobs</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q4"
                  value="Yes"
                />
                <label className="inCorrect">abject poverty</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q4"
                  value="Yes"
                  id="true4"
                />
                <label className="isCorrect">lack of education</label>
                <hr />
                <h6>5) Children are exploited by people with ______ .</h6>
                <input
                  type="radio"
                  className="radioCheck"
                  name="q5"
                  value="Yes"
                />
                <label className="inCorrect">no education</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q5"
                  value="Yes"
                />
                <label className="inCorrect">poor education</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q5"
                  value="Yes"
                  id="true5"
                />
                <label className="isCorrect">good education</label>
                <hr />
                <h6>6) They agree about _______ .</h6>
                <input
                  type="radio"
                  className="radioCheck"
                  name="q6"
                  value="Yes"
                />
                <label className="inCorrect">arbitrary prices</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q6"
                  value="Yes"
                />
                <label className="inCorrect">free markets</label>
                <br />
                <input
                  type="radio"
                  className="radioCheck"
                  name="q6"
                  value="Yes"
                  id="true6"
                />
                <label className="isCorrect">corruption</label>
                <hr />
                <button
                  onClick={function () {
                    let result = 0;
                    for (let i = 1; i < 7; i++) {
                      if (document.getElementById(`true${[i]}`).checked) {
                        result++;
                      }
                    }
                    if (result > 4) {
                      document.getElementById(
                        "result"
                      ).innerHTML = `You answered correctly ${result} question.
                      Your level is Advanced`;
                      let user = JSON.parse(localStorage.getItem("user"));
                      console.log(user.uid);
                      updateDoc(doc(db, "users", user.uid), {
                        level: `Advanced`,
                      });
                    } else if (result > 2) {
                      document.getElementById(
                        "result"
                      ).innerHTML = `You answered correctly ${result} question.
                      Your level is Intermediate`;
                      let user = JSON.parse(localStorage.getItem("user"));
                      console.log(user.uid);
                      updateDoc(doc(db, "users", user.uid), {
                        level: `Intermediate`,
                      });
                    } else {
                      document.getElementById(
                        "result"
                      ).innerHTML = `You answered correctly ${result} question.
                      Your level is Beginner`;
                      let user = JSON.parse(localStorage.getItem("user"));
                      console.log(user.uid);
                      updateDoc(doc(db, "users", user.uid), {
                        level: `Beginner`,
                      });
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
export default LevelTest;
