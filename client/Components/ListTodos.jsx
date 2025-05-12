import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare as faPenToSquareRegular } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const ListTodos = ({todos,editTask,isEditing,editData,setEditData,editTodoTitle,setEditing ,deleteTask}) => {
  return (
    <><div className="list-todos">
              { todos.length === 0 ? (<p className='text-custom-primary-color py-5 text-center'>No Todos Left !! Add New Ones</p>) : (
              todos.map((todo) => {
                return (
                  <li className='text-custom-primary-color singleTodoContainer my-3' key={todo._id}>
                    <div className="todo-task d-flex bg-custom-secondary-color py-3 h-25">
                      {/* <span style={{ width: "5%" }} className="checkSpan"> */}
                      {/* <span className="checkSpan"> */}
                        <input
                          // onClick={() => editTask(todo._id, todo.isDone)}
                          onChange={() => editTask(todo._id, todo.isDone)}
                          type="checkbox"
                          checked={todo.isDone}
                          id={`isTodoCompleted-${todo._id}`}
                          className="isTodoCompleted checkSpan" 
                          // className="isTodoCompleted" 
                          hidden
                        />
                        <label
                          htmlFor={`isTodoCompleted-${todo._id}`}
                          className="isTodoCompletedLabel"
                        >
                          <span className="line line1"></span>
                          <span className="line line2"></span>
                        </label>
                      {/* </span> */}
                      {isEditing === todo._id ? (
                        <input
                          // ref={editInputRef}
                          style={{ width: "85%" }}
                          className="titleDisplayInput"
                          autoFocus
                          type="text"
                          value={editData.title}
                          onChange={(e) => {
                            console.log("edit data input field called");
                            setEditData({ ...editData, title: e.target.value });
                          }}
                          onKeyDown={(e) => {
                            //e.preventDefault();
                            if (e.key == 'Enter') {
                              editTodoTitle(todo._id);
                            }
                          }}
                        ></input>
                      ) : (
                        <span style={{ width: "85%" }} className="titleDisplaySpan">
                          {todo.title}
                        </span>
                      )}
                      {isEditing === todo._id ? (
                        <span style={{ width: "5%" }}>
                          <FontAwesomeIcon
                            onClick={(e) => {
                              // setEditing(null);
                              // setEditData({ ...editData, title: e.target.value });
                              // setEditData(editData);
                              editTodoTitle(todo._id);
                            }}
                            className="editTask"
                            icon={faCheck}
                          ></FontAwesomeIcon>
                        </span>
                      ) : (
                        <span style={{ width: "5%" }}>
                          <FontAwesomeIcon
                            className="editTask"
                            icon={faPenToSquare}
                            onClick={() => {
                              setEditing(todo._id);
                              console.log("edit button clicked");
                              setEditData({ ...editData, title: todo.title });
                            }}
                          ></FontAwesomeIcon>
                        </span>
                      )}
                      <span
                        onClick={() => deleteTask(todo._id)}
                        style={{ width: "5%" }}
                      >
                        <FontAwesomeIcon
                          className="deleteTask"
                          icon={faTrash}
                        ></FontAwesomeIcon>
                      </span>
                    </div>
                  </li>
                );
              }))}
            </div>
            </>
  )
}

export default ListTodos;