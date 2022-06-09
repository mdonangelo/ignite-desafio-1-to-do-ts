import { PlusCircle } from 'phosphor-react';
import styles from "./FormTodo.module.css";
import { FormEvent, ChangeEvent } from 'react';

interface FormSendTodo {
    newTodoItemText: string;
    createTask: () => void;
    handleNewTodoItemText: () => void;
}

export function FormTodo({newTodoItemText, createTask, handleNewTodoItemText}: FormSendTodo){
    
    function handleCreateTask(event: FormEvent){
        event.preventDefault();
        createTask();
    }

    return (
        <form className={styles.todoForm} onSubmit={handleCreateTask}>
          <input type="text" name="addTask" placeholder="Adicione uma nova tarefa" value={newTodoItemText} onChange={handleNewTodoItemText} />
          <button type="submit">
            Criar <PlusCircle size={16} />
            </button>
        </form>
    );
}