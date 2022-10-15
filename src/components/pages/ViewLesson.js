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
} from "firebase/firestore";
import Table from "react-bootstrap/Table";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChildrenList from "../ChildrenList";

function ViewLesson() {
  const [beginner, setBeginner] = useState([]);
  useEffect(() => {
    const getBeginner = async () => {
      const beginnerCollectionRef = collection(db, "beginner");
      const data = await getDocs(beginnerCollectionRef);
      setBeginner(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getBeginner();
  }, []);

  const query = collection(db, "beginner");
  const [docs, loading, error] = useCollectionData(query);

  return (
    <div className="container">
      <Table
        striped
        bordered
        hover
        style={{ tableLayout: "fixed", wordWrap: "break-word" }}
      >
        <thead>
          <tr>
            <th colSpan={5}>
              <h2>All Beginner Lessons</h2>
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Id</th>
            <th>Field</th>
            <th>Script</th>
            <th>Point</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {beginner.map((beginner, idx) => {
            return (
              <tr>
                <td id="id" style={{ width: "10px" }}>
                  {beginner.id}
                </td>
                <td style={{ width: "10%" }}>
                  Name:
                  <br />
                  {beginner.name}
                  <hr />
                  Intros:
                  <br />
                  {beginner.intros}
                  <hr />
                  Description:
                  <br /> {beginner.description}
                  <hr />
                  Video URL:
                  <br /> {beginner.url}
                  <hr />
                  Audio URL:
                  <br />
                  {beginner.audio}
                  <hr />
                  Image URL: <br />
                  {beginner.image}
                  <hr />
                </td>
                <td style={{ width: "20%" }}>
                  {beginner.script?.split("\\n").map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </td>
                <td style={{ width: "10%" }}>
                  {beginner.point1?.split("\\n").map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                  <hr />
                  {beginner.point2?.split("\\n").map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                  <hr />
                  {beginner.point3?.split("\\n").map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                  <hr />
                  {beginner.point4?.split("\\n").map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </td>
                <td style={{ width: "5%" }}>
                  {beginner.title1}
                  <br />
                  <ChildrenList path={`beginner/${beginner.id}/question`} />
                  <hr />
                  {beginner.title2}
                  <br />
                  <ChildrenList path={`beginner/${beginner.id}/question 2`} />
                  <hr />
                  {beginner.title3}
                  <ChildrenList path={`beginner/${beginner.id}/question 3`} />
                  <hr />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewLesson;
