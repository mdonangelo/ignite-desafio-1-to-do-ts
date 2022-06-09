import { Trash } from 'phosphor-react';
import styles from './TodoItem.module.css';

interface TodoItem {
    id: string;
    isAccomplished: boolean
    description: string
    handleDeleteTaks: (id: string) => void ;
    handleToggleAccomplisheTask: (id: string) => void;
}

export function TodoItem({id, isAccomplished, description, handleDeleteTaks, handleToggleAccomplisheTask}: TodoItem) {
    return (
        <li key={id} className={ isAccomplished ? styles.checkedTask : '' }>
            <label className={styles.checkContainer}>
                <input type="checkbox" checked={ isAccomplished } onChange={() => {handleToggleAccomplisheTask(id)}} />
                <span className={styles.checkmark}></span>
            </label>

            <p> { description } </p>

            <button 
            onClick={() => {handleDeleteTaks(id) }}
            type="submit"
            className={styles.deleteTask}
            >
            <Trash size={14} />
            </button>
        </li>
    );
}