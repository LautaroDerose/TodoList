import React, { useEffect, useState } from "react";
import {AiOutlinePlus} from 'react-icons/ai'
import Todo from "./components/Todo";
import {db} from './firebase/index.js';
import {query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from 'firebase/firestore'



const style = {
  bg: `h-screen w-screen p-4 bg-slate-700`,
  // bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-emerald-100 max-w-[500px]  w-full m-auto rounded-3xl shadow-xl p-4  `,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: ` p-2 w-full text-xl rounded-md  `,
  button: ` p-4 ml-2 bg-purple-400 text-slate-100 hover:bg-purple-600 text-slate-300 hover:text-slate-100 rounded-md group  `,
  count: `text-center p-2`,
}

function App() {

  const [todos, setTodos] =  useState([])
  const [input, setInput] = useState('')
  
  
  // create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if(input === '') {
      alert('Please enter a valid todo')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
    setInput('')
    
  };

  //read todo from firebase
  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsuscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = []
      querySnapshot.forEach((doc) => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return () => unsuscribe()
  },[])

  //update todo from firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }
  //delete todo from firebase
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', id))
  }
  //edit todo
  const editTodo = async (id, newText) => {
    await updateDoc(doc(db, 'todos', id), {
      text: newText
    });
  }

  return (
    <div className={style.bg} >
      <div className={style.container}>
        <h3 className={style.heading} >Todo App</h3>
        <form className={style.form} onSubmit={createTodo} >
          <input  className={style.input} 
                  value={input} 
                  onChange={(e) => { setInput(e.target.value)} } 
                  type='text' 
                  placeholder="Add Todo" 
          />
          <button className={style.button}><AiOutlinePlus className="group-hover:scale-110" size={30} /></button>
        </form>
        <ul>
          {
            todos.map((todo, index) => (
              <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
            ))
          }
        </ul>
        {
          todos.length < 1 
          ? null 
          : <p className={style.count}>{`You have ${todos.length} todos`}</p>
        }
      </div>
    </div>
  );
}

export default App;
