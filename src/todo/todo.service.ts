import { Injectable } from '@nestjs/common';
import { CreatTodoDTO } from './dto/create-todo.dto';



// Creates a Todo interface to show exactly the attribute of our Todo
interface Todo {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly isDone: boolean;
}

@Injectable()
export class TodoService {

    // create a todo array with one todo

    private todos: Todo[] = [{
        id: 1,
        title: "Learn Nest",
        description: " Learn Nest.js for two hours a day in week",
        isDone: true

    }]

    // Create a new todo (add todo to the array)

    async addTodo(createTodoDto: CreatTodoDTO): Promise<Todo> {
        this.todos.push(createTodoDto);
        return this.todos.at(-1)
    }

    // Get single Todo with Id

    async getTodoById(todoId: number): Promise<Todo> {

        return this.todos.find(todo => todo.id === todoId)

    }

    // Get all todos

    async getAllTodos(): Promise<Todo[]> {
        return this.todos
    }

    // Delete Todo and return the remaining todos

    async deleteTodo(todoId: number): Promise<Todo> {
        const deletedTodoIndex = this.todos.findIndex(todo => todo.id === todoId)
        if (deletedTodoIndex === -1) {
            return undefined
        }
        const [deletedTodo] = this.todos.splice(deletedTodoIndex, 1)
        return deletedTodo;
    }

    //  edit todo and retun the last edited?todoId=1

    async editTodo(todoId: number, createTodoDto: CreatTodoDTO): Promise<Todo> {

        const updatedTodoIndex = this.todos.findIndex(todo => todo.id === todoId)
        if (updatedTodoIndex === -1) return undefined
        this.todos.splice(updatedTodoIndex, 1, createTodoDto)

        return this.todos[updatedTodoIndex]
    }


}
