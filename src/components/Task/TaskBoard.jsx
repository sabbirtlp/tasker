import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";


export default function TaskBoard() {

    const defaultTask = {
        "id": crypto.randomUUID(),
        "title": "React Js Native",
        "description": "I want to learn react and i want to make it my slave and I want to do with it whatever i want",
        "tags": ["Web", "React", "Js", "JAVA"],
        'isFavourite': true,
        "priority": "High"
    }

    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false)
    const [taskToUpdate, setTaskToUpdate] = useState(null)
    const [searchText, setSearchText] = useState("")


    const addTaskHandler = (newtask, isAdd, e) => {
        e.preventDefault();
        if (isAdd) {
            setTasks(tasks => [...tasks, newtask])
        } else {
            setTasks(
                tasks.map(task => {
                    if (task.id === newtask.id) {
                        return newtask;
                    }
                    return task;
                })
            )
        }


        setShowAddModal(false)
    }
    const editTaskHandler = (task) => {
        setTaskToUpdate(task)
        setShowAddModal(true)

    }
    const deleteTaskHandler = (clickedTask) => {
        setTasks(tasks.filter(task => task.id != clickedTask.id))
    }
    const isFavouriteHandler = (clickedTask) => {
        setTasks(tasks =>
            tasks.map(task => task.id === clickedTask.id
                ? { ...task, isFavourite: !task.isFavourite } : task
            )
        );
    };
    const filteredTask = tasks.filter(task => {
        const text = searchText.toLowerCase();
        return (
            task.title.toLowerCase().includes(text) ||
            task.description.toLowerCase().includes(text) ||
            task.tags.some(tag => tag.toLowerCase().includes(text))
        )
    })
    const deleteAllHandler = () => {
        setTasks([])
    }
    const modalCloseHandler = () => {
        setShowAddModal(false)
    }

    return (
        <section className="mb-20" id="tasks">
            {showAddModal && <AddTaskModal taskToUpdate={taskToUpdate} onSave={addTaskHandler} onClose={modalCloseHandler}></AddTaskModal>}

            <div className="container mx-auto">

                <SearchTask onSearch={setSearchText}></SearchTask>

                <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
                    <TaskActions deleteAll={deleteAllHandler} onAddTask={() => {
                        setTaskToUpdate(null);
                        setShowAddModal(true);
                    }} />
                    <TaskList handleIsFavourite={isFavouriteHandler} onDelete={deleteTaskHandler} onEdit={editTaskHandler} tasks={filteredTask}></TaskList>
                </div>
            </div>
        </section>
    )
}
