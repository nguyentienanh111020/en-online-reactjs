import { React, useEffect, useState, useContext } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import "../Dictionary.css";
import { AuthContext } from "../context/AuthContext";

function ContactAdmin() {
  const [contact, setContact] = useState([]);
  const { dispatch } = useContext(AuthContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getContact = async () => {
      const contactCollectionRef = collection(db, "contact");
      const data = await getDocs(contactCollectionRef);
      setContact(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getContact();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "contact", id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="dictionary-container">
      <h1 style={{ paddingBottom: "10px" }}>Contact Admin</h1>
      <div className="other-pages">
        <button className="logout" onClick={() => dispatch({ type: "LOGOUT" })}>
          Logout
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Message</th>
          </tr>
        </thead>

        {contact.map((contact, idx) => {
          return (
            <tbody>
              <tr>
                {/* <td> {contact.id} </td> */}
                <td> {contact.name} </td>
                <td> {contact.email} </td>
                <td>{contact.country}</td>
                <td>
                  {" "}
                  {contact.message?.split("\\n").map((item, idx) => {
                    return (
                      <span key={idx}>
                        {item}
                        <br />
                      </span>
                    );
                  })}
                </td>
                <td>
                  {" "}
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default ContactAdmin;
