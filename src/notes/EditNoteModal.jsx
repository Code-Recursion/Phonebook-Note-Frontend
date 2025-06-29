import React from "react";

const EditNoteModal = ({ isOpen, note }) => {
  console.log(note);
  if (!isOpen) return null;

  return (
    <div className="fixed w-[100vw] h-[100vh] overflow-hidden bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
          // onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4">Edit Note</h2>
        <p>{note?.content}</p>
      </div>
    </div>
  );
};

export default EditNoteModal;
