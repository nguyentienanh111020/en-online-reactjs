import React from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Table from "react-bootstrap/Table";
import "../../App.css";
import "../Admin.css";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDocs,
  getDoc,
  getCollection,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db, storage } from "../firebase-config";
import { AuthContext } from "../context/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Admin() {
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState("");
  const [update, setUpdate] = useState("");
  const [per, setPerc] = useState(null);
  const [img, setImg] = useState("");
  const [file, setFile] = useState("");
  const [updateImg, setUpdateImg] = useState("");
  const [updateFile, setUpdateFile] = useState("");

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, audio: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  useEffect(() => {
    const uploadImg = () => {
      const storageRef = ref(storage, img.name);
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    img && uploadImg();
  }, [img]);

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value.replace(/\n/g, "\\n");

    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const response = await getCollength();
    await setDoc(doc(db, "beginner", "no" + String(response)), {
      // await addDoc(collection(db, "beginner"), {
      ...data,
      timeStamp: serverTimestamp(),
    });

    // await addDoc(collection(db, "beginner", String(response), "question"), {});

    for (let i = 0; i < 3; i++) {
      await setDoc(
        doc(db, "beginner", "no" + String(response), "question", String(i)),
        {
          text: document.getElementById(`text${i}`).value,
          isCorrect: document.getElementById(`isCorrect${i}`).value,
        }
      );
    }

    for (let i = 0; i < 3; i++) {
      await setDoc(
        doc(db, "beginner", "no" + String(response), "question 2", String(i)),
        {
          text: document.getElementById(`textq2${i}`).value,
          isCorrect: document.getElementById(`isCorrectq2${i}`).value,
        }
      );
    }

    for (let i = 0; i < 3; i++) {
      await setDoc(
        doc(db, "beginner", "no" + String(response), "question 3", String(i)),
        {
          text: document.getElementById(`textq3${i}`).value,
          isCorrect: document.getElementById(`isCorrectq3${i}`).value,
        }
      );
    }
    alert("Data added successfully!");
  };

  function getCollength() {
    return new Promise((resolve, reject) => {
      onSnapshot(collection(db, "beginner"), (snapshot) => {
        const collength = snapshot.docs.length;
        resolve(collength);
      });
    });
  }
  getCollength();

  useEffect(() => {
    const uploadUpdateFile = () => {
      const name = new Date().getTime() + updateFile.name;
      console.log(name);
      const storageRef = ref(storage, updateFile.name);
      const uploadTask = uploadBytesResumable(storageRef, updateFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdate((prev) => ({ ...prev, audio: downloadURL }));
          });
        }
      );
    };
    updateFile && uploadUpdateFile();
  }, [updateFile]);

  useEffect(() => {
    const uploadUpdateImg = () => {
      const storageRef = ref(storage, updateImg.name);
      const uploadTask = uploadBytesResumable(storageRef, updateImg);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPerc(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUpdate((prev) => ({ ...prev, image: downloadURL }));
          });
        }
      );
    };
    updateImg && uploadUpdateImg();
  }, [updateImg]);

  const handleUpdateInput = (e) => {
    const idx = e.target.id;
    const id = idx.substring(0, idx.length - 1);
    const value = e.target.value.replace(/\n/g, "\\n");
    setUpdate({ ...update, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = document.getElementById("updateId").value;
    await updateDoc(doc(db, "beginner", String(id)), {
      ...update,
    });

    for (let i = 0; i < 3; i++) {
      if (document.getElementById(`textU${i}`).value != "") {
        await setDoc(doc(db, "beginner", String(id), "question", String(i)), {
          text: document.getElementById(`textU${i}`).value,
          isCorrect: document.getElementById(`isCorrectU${i}`).value,
        });
      }
    }

    for (let i = 0; i < 3; i++) {
      if (document.getElementById(`textUq2${i}`).value != "") {
        await setDoc(doc(db, "beginner", String(id), "question 2", String(i)), {
          text: document.getElementById(`textUq2${i}`).value,
          isCorrect: document.getElementById(`isCorrectUq2${i}`).value,
        });
      }
    }

    for (let i = 0; i < 3; i++) {
      if (document.getElementById(`textUq3${i}`).value != "") {
        await setDoc(doc(db, "beginner", String(id), "question 3", String(i)), {
          text: document.getElementById(`textUq3${i}`).value,
          isCorrect: document.getElementById(`isCorrectUq3${i}`).value,
        });
      }
    }
    alert("Data updated successfully!");
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const deleteId = document.getElementById("delete-id").value;

    for (let i = 0; i < 3; i++) {
      await deleteDoc(
        doc(db, "beginner", String(deleteId), "question 2", `${i}`)
      );
    }

    for (let i = 0; i < 3; i++) {
      await deleteDoc(
        doc(db, "beginner", String(deleteId), "question", `${i}`)
      );
    }
    for (let i = 0; i < 3; i++) {
      await deleteDoc(
        doc(db, "beginner", String(deleteId), "question 3", `${i}`)
      );
    }

    await deleteDoc(doc(db, "beginner", String(deleteId)));
    alert("Data deleted successfully!");
  };

  return (
    <div className="container" style={{ paddingBottom: "120px" }}>
      <Accordion>
        <h1 id="admin-title">Beginner</h1>
        <div className="other-pages">
          <Link to="/admin2">
            <button className="logout">Statistic</button>
          </Link>
          {/* <Link to="/admin2">
            <button className="logout">Intermediate</button>
          </Link>
          <Link to="/admin3">
            <button className="logout">Advanced</button>
          </Link>  */}
          <Link to="/viewlesson">
            <button className="logout">View All Lessons</button>
          </Link>
          <button
            className="logout"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Logout
          </button>
        </div>
        <br />
        <Accordion.Item eventKey="0">
          <Accordion.Header>Add Lesson</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleAdd}>
              <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Lession's Name"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Lession's Description"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="intros">
                <Form.Label>Intros</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Lession's Intros"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group controlId="audio" className="mb-3">
                <Form.Label>Audio</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  placeholder="Lession's Audio"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="url">
                <Form.Label>Video URL</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Lession's Video URL"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group controlId="image" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImg(e.target.files[0])}
                  placeholder="Lession's Image"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="script">
                <Form.Label>Script</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  onChange={handleInput}
                  placeholder="Lession's Script"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="point1">
                <Form.Label>Point 1</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="input"
                  placeholder="Lession's Point 1"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="point2">
                <Form.Label>Point 2</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="input"
                  placeholder="Lession's Point 2"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="point3">
                <Form.Label>Point 3</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="input"
                  placeholder="Lession's Point 3"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="point4">
                <Form.Label>Point 4</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  type="input"
                  placeholder="Lession's Point 4"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              {/* Question 1*/}
              <Form.Group className="mb-3" controlId="title1">
                <Form.Label>Title Question 1</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Title Question 1"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Answer 1 for Question 1</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 1 for Question 1"
                  id="text0"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrect0"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Answer 2 for Question 1</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 2 for Question 1"
                  id="text1"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrect1"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Answer 3 for Question 1</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 3 for Question 1"
                  id="text2"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrect2"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              {/* Question 2*/}
              <Form.Group className="mb-3" controlId="title2">
                <Form.Label>Title Question 2</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Title Question 2"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Answer 1 for Question 2</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 1 for Question 1"
                  id="textq20"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrectq20"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Answer 2 for Question 2</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 2 for Question 2"
                  id="textq21"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrectq21"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Answer 3 for Question 2</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 3 for Question 2"
                  id="textq22"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrectq22"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              {/* Question 3*/}
              <Form.Group className="mb-3" controlId="title3">
                <Form.Label>Title Question 3</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Title Question 3"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Answer 1 for Question 3</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 1 for Question 3"
                  id="textq30"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrectq30"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Answer 2 for Question 3</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 2 for Question 3"
                  id="textq31"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrectq31"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label>Answer 3 for Question 3</Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Answer 3 for Question 2"
                  id="textq32"
                  required
                />
                <Form.Select
                  aria-label="Default select example"
                  id="isCorrectq32"
                >
                  <option>The answer is?</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <br />
              <button type="submit" id="submit" name="submit">
                Submit
              </button>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Update Lesson</Accordion.Header>
          <Accordion.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fields</th>
                  <th>Questions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form.Group controlId="updateId">
                      <Form.Label>
                        The lesson's ID needs to be updated:
                      </Form.Label>
                      <Form.Control type="input" />
                    </Form.Group>
                  </td>
                  <td>
                    <Form onSubmit={handleUpdate}>
                      <Form.Group className="mb-3" controlId="name1">
                        <Form.Label>New Name:</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="intros1">
                        <Form.Label>New Intros:</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="description1">
                        <Form.Label>New Description:</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="url1">
                        <Form.Label>New Video URL</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group controlId="image" className="mb-3">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) => setUpdateImg(e.target.files[0])}
                          placeholder="Lession's Image"
                        />
                      </Form.Group>
                      <Form.Group controlId="audio1" className="mb-3">
                        <Form.Label>Audio</Form.Label>
                        <Form.Control
                          type="file"
                          onChange={(e) => setUpdateFile(e.target.files[0])}
                          placeholder="Lession's Audio"
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="script1">
                        <Form.Label>New Script:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={5}
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="point11">
                        <Form.Label>New Point 1:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="point21">
                        <Form.Label>New Point 2:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="point31">
                        <Form.Label>New Point 3:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="point41">
                        <Form.Label>New Point 4:</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="title11">
                        <Form.Label>Title Question 1</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="title21">
                        <Form.Label>Title Question 2</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="title31">
                        <Form.Label>Title Question 3</Form.Label>
                        <Form.Control
                          type="input"
                          onChange={handleUpdateInput}
                        />
                      </Form.Group>
                      <button type="submit" id="submit" name="submit">
                        Submit
                      </button>
                    </Form>
                  </td>
                  <td>
                    {" "}
                    {/* Question 1*/}
                    <Form.Group>
                      <Form.Label>Answer 1 for Question 1</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 1 for Question 1"
                        id="textU0"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectU0"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Answer 2 for Question 1</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 2 for Question 1"
                        id="textU1"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectU1"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Answer 3 for Question 1</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 3 for Question 1"
                        id="textU2"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectU2"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    {/* Question 2*/}
                    <Form.Group>
                      <Form.Label>Answer 1 for Question 2</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 1 for Question 1"
                        id="textUq20"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectUq20"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Answer 2 for Question 2</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 2 for Question 2"
                        id="textUq21"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectUq21"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Answer 3 for Question 2</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 3 for Question 2"
                        id="textUq22"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectUq22"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    {/* Question 3*/}
                    <Form.Group>
                      <Form.Label>Answer 1 for Question 3</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 1 for Question 3"
                        id="textUq30"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectUq30"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Answer 2 for Question 3</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 2 for Question 3"
                        id="textUq31"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectUq31"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label>Answer 3 for Question 3</Form.Label>
                      <Form.Control
                        type="input"
                        placeholder="Answer 3 for Question 2"
                        id="textUq32"
                      />
                      <Form.Select
                        aria-label="Default select example"
                        id="isCorrectUq32"
                      >
                        <option>The answer is?</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </Form.Select>
                    </Form.Group>
                    <br />
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Delete Lesson</Accordion.Header>
          <Accordion.Body>
            <Table
              striped
              bordered
              hover
              style={{
                // display: "flex",
                // justifyContent: "center",
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>
                    Write the lesson's ID you want to delete.
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <input
                      id="delete-id"
                      type="input"
                      style={{
                        padding: "6px",
                      }}
                    />
                  </td>
                  <td
                    style={{
                      // display: "flex",
                      // justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    <button onClick={handleDelete}>Delete</button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
export default Admin;
