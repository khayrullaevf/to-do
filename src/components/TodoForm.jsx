"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlice";

const TodoForm = () => {
  const [text, setText] = useState("");
  const [time, setTime] = useState("");

  const dispatch = useDispatch();

  const handleAddTodo = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text, time }));
    setText("");
    e.target.reset();
  };

  return (
    <form onSubmit={handleAddTodo} className="form d-flex gap-3">
      <input
        type="text"
        placeholder="Todo"
        onChange={(e) => setText(e.target.value)}
        required
        className="form-control"
      />
      <input
        type="time"
        placeholder="When?"
        onChange={(e) => setTime(e.target.value)}
        required
        className="form-control"
      />
      <button className="btn btn-primary" type="submit">
        add
      </button>
    </form>
  );
};

export default TodoForm;
