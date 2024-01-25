"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, updateStatus, editTodo } from "../redux/slices/todoSlice";
import { Badge, Button, Modal, Table } from 'react-bootstrap'
import { FaCheck, FaTimes } from "react-icons/fa";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);

  const [show, setShow] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const dispatch = useDispatch();

  const handleClickRemove = (todo) => {
    setShow(true);
    setDeleteTodo(todo);
  };

  const handleRemove = () => {
    dispatch(removeTodo(deleteTodo));
    setShow(false);
  };

  const handleUpdateStatus = (id) => {
    dispatch(updateStatus({ id }));
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Status</th>
          <th colSpan={2}>Action</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => {
          console.log(todo);
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <p className={`todo-item${todo.isDone && "done"}`}>
                  {todo.text}
                </p>
                <Badge bg="secondary">{todo.createAt}</Badge>
              </td>
              <td>
                <Badge bg={`${todo.isDone ? "success" : "danger"}`}>
                  {todo.isDone ? "done" : "pending"}
                </Badge>
                {todo.isDone && <p>{todo.updateAt}</p>}
                {!todo.isDone && <p>untill: {todo.time}</p>}
              </td>
              {!todo.isDone && (
                <td>
                  <div
                    style={{ color: "green" }}
                    onClick={() => handleUpdateStatus(todo.id)}
                  >
                    <FaCheck />
                  </div>
                </td>
              )}

              <td colSpan={todo.isDone ? 2 : 1}>
                <div
                  style={{ color: "red" }}
                  onClick={() => handleClickRemove(todo.id)}
                >
                  <FaTimes />
                </div>

                {/* <button
                  className="btn btn-danger"
                  onClick={() => handleClickRemove(todo.id)}
                >
                  Delete
                </button> */}
              </td>
            </tr>
          );
        })}
        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Remove todo ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Siz haqiqatdan ham bu item ni uchirmoqchimisiz?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              close
            </Button>
            <Button variant="primary" onClick={handleRemove}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>
      </tbody>
    </Table>
  );
};

export default TodoList;
