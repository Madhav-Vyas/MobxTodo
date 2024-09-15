import { makeObservable, observable, observe, flow, computed, action } from "mobx";


class TodoStore {
    todos = [];
    history = [];
    constructor() {
        makeObservable(this, {
            todos: observable,
            history: observable,
            addTask: action,
            removeTask: action,
            updateTask: action,
            addToHistory: action,
            loadTodos: action,
            loadHistory: action,
            deleteHistoryItem: action
        })

        this.loadTodos();
        if (this.history) {
            this.loadHistory()

        }
    }
    //1
    addTask(input) {
        const newTask = { id: Date.now(), task: input, status: "NO" };
        this.todos = [...this.todos, newTask];
        this.saveTodos();
    }
    //2
    updateTask(id) {
        this.removeTask(id);


    }
    removeTask(id) {
        console.log("removetask");
        let newTodos = this.todos.filter((obj) => obj.id !== id)
        this.todos = [...newTodos]
    }
    //3
    addToHistory(id, input, status) {
        const newHistory = { id: id, input: input, status: status };
        this.history = [...this.history, newHistory]
        this.saveHistory();
        console.log(this.history);
        this.removeTask(id);
    }

    //4

    deleteHistoryItem(id) {
        console.log("delete history item");
        this.history = this.history.filter((obj) => obj.id !== id);  // Reassign array
        // this.saveHistory();  // Save the updated history to localStorage
    }

    //5
    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    //6    
    saveHistory() {
        localStorage.setItem('history', JSON.stringify(this.history))
    }

    //7

    loadTodos() {
        const savedTodos = localStorage.getItem('todos');
        if (savedTodos) {
            this.todos = JSON.parse(savedTodos)
        }
    }

    //8
    loadHistory() {
        const savedHistory = localStorage.getItem('history')
        if (savedHistory) {
            this.history = JSON.parse(savedHistory)
        }
    }

}
const todoStore = new TodoStore();
export default todoStore;