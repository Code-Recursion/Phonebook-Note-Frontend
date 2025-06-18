import React, { useState, useEffect } from "react";
import noteService from "../services/noteService";
import "./note.css";
import StarFilled from "../assets/icons/start-filled";
import Star from "../assets/icons/star";

const Note = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [invalidNote, setInvalidNote] = useState(null);

  useEffect(() => {
    let userData;
    let user;
    if (window !== undefined) {
      userData = window?.localStorage?.getItem("loggedNoteappUser");
      user = JSON.parse(userData);
      console.log("user", user);
    }
    noteService.getAll(user?.userId).then((data) => setNotes(data));
  }, []);

  const addUserNote = async (event) => {
    event.preventDefault();

    const userData = window?.localStorage?.getItem("loggedNoteappUser");
    const user = JSON.parse(userData);

    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      user: user.userId,
    };

    if (newNote === "") {
      setErrorMessage("Note can't be empty");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else if (newNote.length < 6) {
      setInvalidNote(`Note content can't be less than 5 characters`);
      setTimeout(() => {
        setInvalidNote(null);
      }, 5000);
    } else {
      try {
        const note = await noteService.create(noteObj);
        setNotes(notes.concat(note));
        setNewNote("");
        setSuccessMessage(`Note : "${newNote}" successfully added`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } catch (error) {
        setErrorMessage(`Note creation failed!`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  const addNote = (event) => {
    event.preventDefault();

    if (newNote === "") {
      setErrorMessage("Note can't be empty");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else if (newNote.length < 6) {
      setInvalidNote(`Note content can't be less than 5 characters`);
      setTimeout(() => {
        setInvalidNote(null);
      }, 5000);
    } else {
      const noteObj = {
        content: newNote,
        date: new Date().toISOString(),
        important: Math.random() < 0.5,
        id: notes.length + 1,
      };
      noteService
        .create(noteObj)
        .then((data) => {
          setNotes(notes.concat(data));
          setNewNote("");
          setSuccessMessage(`Note : "${newNote}" successfully added`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log("error while adding note", error.message);
        });
    }
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
      .then((data) =>
        setNotes(notes.map((note) => (note.id !== id ? note : data)))
      )
      .catch((error) => {
        setErrorMessage(
          `the Note ${note.content} was already deleted from the server`
        );

        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const Note = ({ note, toggleImportance }) => {
    console.log("toggle", note);
    const Logo = note.important ? <StarFilled /> : <Star />;
    return (
      <p>
        <li
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {note.content}
          &nbsp;&nbsp;
          <button
            style={{ border: "none", background: "none", outline: "none" }}
            onClick={toggleImportance}
          >
            {Logo}
          </button>
        </li>
      </p>
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

  const Error = ({ message }) => {
    if (message == null) return null;
    return (
      <div className="warning">
        <p>{message}</p>
      </div>
    );
  };

  return (
    <div>
      <>
        <h1>Naughty Notes</h1>

        <Notification message={errorMessage} />
        <Success message={successMessage} />
        <Error message={invalidNote} />

        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "All"}
        </button>
        <ul>
          {notesToShow.map((note, i) => (
            <Note
              key={i}
              note={note}
              toggleImportance={() => toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={addUserNote}>
          <input value={newNote} onChange={handleNewNote} />
          <button>save</button>
        </form>
      </>
    </div>
  );
};

export default Note;
