import React, {useState, useRef} from 'react'
import { FaCheck, FaRegEdit, FaRegTrashAlt, FaTimes } from 'react-icons/fa'


const style = {
  li: `flex justify-between bg-slate-400 hover:bg-slate-500 p-4 my-2 capitalize rounded-md`,
  liComplete: `flex justify-between bg-slate-600 hover:bg-slate-500 p-4 my-2 capitalize rounded-md`,
  row: `flex `,
  text: `ml-2 cursor-pointer `,
  textComplete: `ml-2 cursor-pointer line-through`,
  buttonContainer: `flex gap-2`,
  button: `cursor-pointer flex items-center hover:scale-110`,
  icon: `text-slate-600 hover:text-slate-700 `,
  iconComplete: `text-slate-400 hover:text-slate-300`,
  checkboxStyle: `border-green-300 border-[2px] bg-red-500`
}

const Todo = ({todo, toggleComplete, deleteTodo, editTodo}) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  const handleEditTextChange = (e) => {
    setEditText(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    editTodo(todo.id, editText);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  }

  return (
    <>
      <li className={todo.completed ? style.liComplete : style.li}>
        {isEditing ? (
          <form className='flex items-center' onSubmit={handleEditSubmit}>
            <button className='mx-2 text-green-500 bg-slate-300 p-2 rounded-md' type="submit"><FaCheck/></button>
            <input
              className='p-1 rounded-md'
              type="text"
              value={editText}
              onChange={handleEditTextChange}
              ref={inputRef}
            />
            <button className='mx-2 text-red-900 bg-slate-300 p-2 rounded-md' onClick={() => setIsEditing(false)}><FaTimes/></button>
          </form>
        ) : (
          <div className={style.row}>
            <input
              onChange={() => toggleComplete(todo)}
              type="checkbox"
              checked={todo.completed ? "checked" : ""}
              className="accent-emerald-400 accent-bg-red-300 "
            />
            <p
              onClick={() => toggleComplete(todo)}
              className={todo.completed ? style.textComplete : style.text}
            >
              {todo.text}
            </p>
          </div>
        )}
        <div className={style.buttonContainer}>
          <button
            className={style.button}
            onClick={handleEditClick}
          >
            <FaRegEdit
              className={todo.completed ? style.iconComplete : style.icon}
            />
          </button>
          <p className={todo.completed ? style.iconComplete : style.icon}>|</p>
          <button
            className={style.button}
            onClick={() => deleteTodo(todo.id)}
          >
            <FaRegTrashAlt
              className={todo.completed ? style.iconComplete : style.icon}
            />
          </button>
        </div>
      </li>
    </>

  )
}

export default Todo