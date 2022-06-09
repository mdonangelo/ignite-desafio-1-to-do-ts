import './global.css'
import styles from './App.module.css';
import todoLogo from './assets/todo-logo.svg';
import { ClipboardText } from 'phosphor-react';
import { useState, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoItem } from './components/TodoItem';
import { FormTodo } from './components/FormTodo';

interface Task {
  id: string;
  description: string;
  isAccomplished: boolean;
};


export function App() {

  const [ myTodoList, setMyTodoList ] = useState<Task[]>([]);

  const [ newTodoItemText, setNewTodoItemText ] = useState("");

  const [ numberAccomplishedTodos, setNumberAccomplishedTodos ] = useState(0);
  const [ numberAllTodos, setNumberAllTodos ] = useState(myTodoList.length);
  const isTodoListEmpty = myTodoList.length === 0;

  

  function handleNewTodoItemText(event: ChangeEvent<HTMLInputElement>) {
    setNewTodoItemText(event.target.value);
    event.target.setCustomValidity("");
  }

  function createTask() {
    const newItem = {
      id: uuidv4(),
      description: newTodoItemText,
      isAccomplished: false
    };

    setMyTodoList([...myTodoList, newItem]);
    setNewTodoItemText("");
    setNumberAllTodos(numberAllTodos + 1);
  }

  function handleDeleteTaks(idTask: string) {
    const taskWithoutDeletedOne = myTodoList.filter((task: Task) => {
      if(task.id !== idTask) {
        return task;
      }else{
        if(task.isAccomplished) {
          changeAccomplishedCounter(task.isAccomplished);
        }
      }
    });

    setNumberAllTodos(numberAllTodos - 1);
    setMyTodoList(taskWithoutDeletedOne);
  }

  function handleToggleAccomplisheTask(idTask: string) {
    const newTaskList = myTodoList.map((task: Task) => {
      if(task.id === idTask) {
        changeAccomplishedCounter(task.isAccomplished);
        return ({
          id: task.id,
          description: task.description,
          isAccomplished: !task.isAccomplished
        });
        
      }else{
        return task
      }      
    });

    setMyTodoList(newTaskList);
  }

  function changeAccomplishedCounter(isAccomplished: boolean) {
    if(isAccomplished) {
      setNumberAccomplishedTodos(numberAccomplishedTodos - 1);
    }else{
      setNumberAccomplishedTodos(numberAccomplishedTodos + 1);
    }
    
  }

  return (
    <>

      <header className={styles.mainHeader}>
        <img src={todoLogo} alt="Logo da todo" />
      </header>

      <main className={styles.container}>
        
        <FormTodo
          createTask={createTask}
          newTodoItemText={newTodoItemText}
          handleNewTodoItemText={handleNewTodoItemText}
        />

        <div className={styles.todoContainer}>
            
            <div className={styles.titleContainer}>
                <strong>Tarefas criadas <span>{numberAllTodos}</span></strong>
                <strong>Concluidas {isTodoListEmpty ? <span>0</span> : <span>{numberAccomplishedTodos} de {numberAllTodos}</span> } </strong>
            </div>

            { 
                isTodoListEmpty && 
                <div className={styles.list}>
                    <div className={styles.emptyList}>
                        <ClipboardText size={56} />
                        <p><b>Você ainda não tem tarefas cadastradas</b></p>
                        <p>Crie tarefas e organize seus itens a fazer</p>
                    </div>
                </div>
            }
            
            <ul className={styles.todoItems}>
              { myTodoList.map((item: Task) => {
                    return (
                      <TodoItem
                        key={item.id}
                        id={item.id}
                        isAccomplished={item.isAccomplished}
                        description={item.description}
                        handleDeleteTaks={handleDeleteTaks}
                        handleToggleAccomplisheTask={handleToggleAccomplisheTask}
                      />
                    );
                })}
              
          </ul>
        </div>
        
      </main>
    </>
  );
}