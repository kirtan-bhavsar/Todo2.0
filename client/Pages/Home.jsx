import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import TodoHeading from "../Components/TodoHeading.jsx";
import AddTodo from "../Components/AddTodo.jsx";
import ListTodos from "../Components/ListTodos.jsx";
import { successNotification,errorNotification } from "../Utils/Notifications.js";
import CheckSound1 from "../Assets/CheckSound1.mp3";

const Home = () => {

  const playCheckSound = () => {
    new Audio(CheckSound1).play();
  }

    // Use States
  const [isEditing, setEditing] = useState(null);

  const [displayCompleteTodos,setDisplayCompleteTodos] = useState(false);

  const [user,setUser] = useState({
    name:""
  })

  const [data, setData] = useState({
    title: "",
  });

  const [editData, setEditData] = useState({
    title: "",
  });

  const [todos, setTodos] = useState([]);

  // const [forceRender,setForceRerender] = useState(false);

//   useRefs
  const addInputRef = useRef(null);

  // Event Listeners for tasks
  const fetchData = async () => {
    try {
      let apiData;
      if(displayCompleteTodos){
         apiData = await axios.get("/api/v1/todos?isDone=true");
      }else{
         apiData = await axios.get("/api/v1/todos?isDone=false")
      }
      // apiData = await axios.get('/api/v1/todos');
      console.log(apiData.data);
      setTodos(apiData.data);
      if (isEditing) {
        setEditing(null);
      }
    } catch (error) {
      console.log(error);
      if((error.response.data.message === "No todos found") || (error.response.data.message === "No todo found with this id")){
        // const successNotificationMessage = displayCompleteTodos ? "No completed todos found" : "No imcomplete todos left !";
        // successNotification(successNotificationMessage);
        console.log("Either all the todos have been comleted or deleted");
     }
    }
  };

  const displayCompletedTodos = (e) => {
    const checkState = e.target.checked;
    setDisplayCompleteTodos(checkState);
    // fetchData();
  }

  const addTask = async (e) => {

    e.preventDefault();

    try {
      await axios.post("/api/v1/add", data);
      data.title = "";
      addInputRef.current.focus();
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {

    try {
      await axios.delete(`/api/v1/delete/${id}`);
      fetchData();
      successNotification("Task deleted Successfully");
    } catch (error) {
      console.log(error);
      if(error.response.data.message === "No todo found with this id"){
        console.log("This error occurs as the todo is deleted but not from the display");
      }
    }
  };

  const editTask = async (id, isDone) => {
    if(!isDone){
    playCheckSound();
    }
    const body = {
      isDone: !isDone,
    };

    const updatedTodos = todos.map(todo => todo._id === id ? {...todo,isDone:!isDone} : todo);

    setTodos(updatedTodos);

    try {
      await axios.put(`/api/v1/edit/${id}`, body);

      if(!isDone){
      successNotification("Task completed successfully");
      }
      // fetchData();

    } catch (error) {
      console.log(error);
    } finally{
      setTimeout(fetchData,500);
    }
  };
  // const geminiEditTask = async (id, isDone) => {
  //   if(!isDone){
  //   playCheckSound();
  //   }
  //   const body = {
  //     isDone: !isDone,
  //   };

  //   const updatedTodos = todos.map(todo => todo._id === id ? {...todo,isDone:!isDone} : todo);

  //   setTodos(updatedTodos);
  //   console.log(updatedTodos.length + " updated todos length" + updatedTodos);
  //   // setTodos([...updatedTodos]);


  //   if(!isDone && !displayCompleteTodos && updatedTodos.filter(todo => !todo.isDone).length === 0){
  //     successNotification("No incomplete todos left ! 'from editTask try block' ");
  //     } else if (!isDone){
  //       successNotification("Task Completed Successfully")
  //     }

  //   try {
  //     await axios.put(`/api/v1/edit/${id}`, body);

  //   } catch (error) {
  //     console.log(error);
  //     setTodos(todos);
  //     errorNotification("Failed to complete task");
  //   } finally{
  //     // setTimeout(fetchData,500);
  //     setTimeout(()=> {
  //       fetchData();
  //     },500)
  //   }

  // };

  // const animationAppliedEditTask = async (id, isDone) => {
  //   if (!isDone) {
  //     playCheckSound();
  //   }
  //   const body = {
  //     isDone: !isDone,
  //   };
  
  //   // Optimistically update the todos state
  //   const updatedTodos = todos.map((todo) =>
  //     todo._id === id ? { ...todo, isDone: !isDone } : todo
  //   );
  //   setTodos(updatedTodos);
  
  //   try {
  //     await axios.put(`/api/v1/edit/${id}`, body);
  //     // If it was the last incomplete todo and we were viewing incomplete ones
  //     if (!isDone && !displayCompleteTodos && updatedTodos.filter(todo => !todo.isDone).length === 0) {
  //       successNotification("Task completed successfully. No incomplete todos left!");
  //     } else if (!isDone) {
  //       successNotification("Task completed successfully");
  //     }
  //     // No need to immediately fetchData here, the state is already updated optimistically
  //     // fetchData(); // Remove this line
  //   } catch (error) {
  //     console.log(error);
  //     // If the API call fails, revert the optimistic update
  //     setTodos(todos);
  //     errorNotification("Failed to update task.");
  //   } finally {
  //     // Fetch data again after a short delay to ensure data consistency
  //     setTimeout(fetchData, 500); // Adjust the delay as needed
  //   }
  // };

  // const editTask = async(id,isDone) => {

  //   const updatedTodos = todos.map((todo)=> {
  //     todo._id === id ? {...todo,isDone:!isDone} : todo
  //   })

  //   setTodos(updatedTodos);

  //   const body = {isDone:!isDone}

  //   try {
  //     await axios.post(`/api/v1/edit/${id}`,body);
  //     setTimeout(fetchData,1500)
  //   } catch (error) {
  //     console.log(error);
  //     setTodos(todos);
  //   }

  // }

const getUser = async() => {

    try {
       const res = await axios.get('/api/v1/user/auth');
       setUser({name:res.data.data.name});
    } catch (error) {
        
    }

}
  
  const editTodoTitle = async (id) => {
    const body = {
      title: editData.title,
    };

    try {
      await axios.put(`/api/v1/edit/${id}`, body);
      fetchData();
      // setEditing(null);
      setEditData({
        title: "",
      });
      successNotification("Task edited successfully");
      console.log("Edit Todo Title called after clicking check butotn");
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect
  useEffect(() => {
    fetchData();
    getUser();
  }, [displayCompleteTodos]);

  return (
    <>
    <div className="container-fluid Container position-relative bg-custom-primary-color align-items-center d-flex flex-column">
        <TodoHeading user={user} />
        <AddTodo addTask={addTask} addInputRef={addInputRef} setData={setData} data={data} displayCompletedTodos={displayCompletedTodos} />
        <ListTodos todos={todos} editTask={editTask} isEditing={isEditing} editData={editData} setEditData={setEditData} editTodoTitle={editTodoTitle} setEditing={setEditing} deleteTask={deleteTask} />
      </div>
    </>
  )
}

export default Home;