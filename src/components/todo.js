import React, { useState, useEffect } from 'react'
// import "./style.css"

// get data from localStorage 

const getLocalData = () =>{
    const lists= localStorage.getItem("MyToDoReactApp");
    if(lists){
        return JSON.parse(lists)
    }
    else{
        return [];
    }
}
const Todo = () => {
    const [inputData, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [iseditItem, setEditItem] = useState("");
    const [editIcon, setEditIcon] = useState(false);

    // Add task into Array
    const additem = (e) => {
        if (!inputData) {
            alert("Please Fill the Task To Save it")
        }

        else if(inputData &&  editIcon){
           setItems(
            items.map((e)=>{
            if(e.id===iseditItem){
                return {...e, name:inputData}
            }
            return e;
           })
           );
           setInputData("")
           setEditItem(null);
           setEditIcon(false);
        }

        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputData,
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }
    // Delete task from array
    const deleteItem = (index) => {

        const updatedItems = items.filter((ele) => {
            return ele.id !== index
        })
     
        setItems(updatedItems);
    }
    // Edit Items
    const editItem = (id) =>{
        const items_toDo_edited = items.find((ele)=>{
            return ele.id === id;
        })
        setInputData(items_toDo_edited.name)
        setEditItem(id);
        setEditIcon(true);
    }


    // remove All Task
    const removeAll = () =>{
        if(items.length<=0) return alert("No Item to Delete")
        else{

            const confirmation = window.confirm("Are You Sure You Want to Delete All Saved Task's")
            if(confirmation===true){
                setItems([])
            }
        }
    }
// Adding in localStorage Using UseEffect 
    useEffect(() => {
        localStorage.setItem("MyToDoReactApp", JSON.stringify(items))
    }, [items])
    return (
        <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/Microsoft_To-Do_icon.png" alt="TodoLogo" />
                        <figcaption>Add your Todo Here</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" placeholder='✍ Add Task' className='form-control'
                            value={inputData}
                            onChange={(e) => setInputData(e.target.value)}
                        />
                        {editIcon ? (  <i className="fa fa-edit add-btn" onClick={additem}></i>) : (  <i className="fa fa-plus add-btn" onClick={additem}></i>)}
                      

                    </div>
                    <div className="showItems">
                        {items.map((e) => {
                            return (
                                <div className="eachItem" key={e.id}>
                                    <h3>{e.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={()=>editItem(e.id)} ></i>
                                        <i className="far fa-trash-alt add-btn" 
                                        onClick={() => deleteItem(e.id)}></i>

                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className="showItems">

                        <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo