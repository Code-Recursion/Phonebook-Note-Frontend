import React, { useState, useEffect } from "react";
import noteService from "../services/noteService";
import "./note.css";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    noteService.getAll().then((data) => setNotes(data));
  }, []);

  const addNote = (event) => {
    event.preventDefault();

    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService.create(noteObj).then((data) => {
      setNotes(notes.concat(data));
      setNewNote("");
    });

    setSuccessMessage(`Note : "${newNote}" successfully added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleNewNote = (event) => {
    setNewNote(event.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((data) => setNotes(notes.map((note) => (note.id !== id ? note : data))))
      .catch((error) => {
        setErrorMessage(`the Note ${note.content} was already deleted from the server`);

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const Note = ({ note, toggleImportance }) => {
    const label = note.important ? "mark not important" : "mark important";
    return (
      <li>
        <p>
          {note.content}
          &nbsp;&nbsp;<button onClick={toggleImportance}>{label}</button>
        </p>
      </li>
    );
  };

  const Notification = ({ message }) => {
    if (message === null) return null;
    return (
      <div className="error">
        <p>{message}</p>
      </div>
    );
  };

  const Success = ({ message }) => {
    if (message === null) return null;
    return (
      <div className="success">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <div>
      <>
        <h1>Notes</h1>
        <Notification message={errorMessage} />
        <Success message={successMessage} />
        <button onClick={() => setShowAll(!showAll)}>show {showAll ? "important" : "All"}</button>
        <ul>
          {notesToShow.map((note, i) => (
            <Note key={i} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          ))}
        </ul>
        <form onSubmit={addNote}>
          <input value={newNote} onChange={handleNewNote} />
          <button>save</button>
        </form>
      </>
    </div>
  );
};

export default Note;
