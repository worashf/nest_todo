import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreatTodoDTO } from './dto/create-todo.dto';



@Controller('todos')
export class TodoController {

    private  readonly  todoService: TodoService;

    constructor(todoService: TodoService){
        this.todoService = todoService;
    }

    // Create Todo

    @Post("/")
    async create(@Res() res, @Body() createTodoDto: CreatTodoDTO){
       try{
        const newTodo  = await this.todoService.addTodo(createTodoDto);

        return res.status(HttpStatus.OK).json({
            message: "The new todo created succesfully",
            todo: newTodo
        })
    }
    catch(err){
        return  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message:"Failed to create todo",
            error:err.message
        })
    }
    }

    // find  todo by id
    @Get(':todoId')
    async findTodoById(@Res() res, @Param('todoId') todoId: number): Promise<any> {
        try {
            const todo = await this.todoService.getTodoById(+todoId);
            if (!todo) {
                throw new NotFoundException(`Todo does not exist with id: ${todoId}`);
            }
            return res.status(HttpStatus.OK).json({
                message: `Successfully found a todo with id: ${todoId}`,
                todo,
            });
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(HttpStatus.NOT_FOUND).json({
                    message: error.message,
                });
            }
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while processing the request to find the todo',
                error: error.message || 'Internal server error',
            });
        }
    }

    // Get all todos

    @Get()
    async   findAllTodos(@Res() res ): Promise<any>{
        try{
        const todos  = await  this.todoService.getAllTodos()
        return res.status(HttpStatus.OK).json(todos)
        }
        catch(err){
            return  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'An error occurred while fetching todos',
                error: err.message || 'Internal server error',
            })
        }

    }

    // Delete a Todo by todoId
    @Delete()
    async removeTodo(@Res()  res, @Query("todoId") todoId: string): Promise<any>{
       try{
        const removedTodo =  await this.todoService.deleteTodo(+todoId)
        if(!removedTodo){
            throw new NotFoundException(`Todo does not exist with id: ${todoId}, can not be deleted!`)
        }
        return res.status(HttpStatus.OK).json({
            message: 'Todo has been deleted!',
            removedTodo
        })

       }catch(err){
        if (err instanceof NotFoundException){
            return res.status(HttpStatus.NOT_FOUND).json({
                message: err.message
            })
        }
        return  res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            message: 'An error occurred while processing the request to find the todo',
            error: err.message || 'Internal server error',
        })

       }

    }


    // Edit todo

    @Put()
    async editTodo(@Res() res,
    @Query('todoId') todoId:string,
    @Body() createTodoDto: CreatTodoDTO):Promise<any>{
     const editedTodo  = await this.todoService.editTodo(+todoId, createTodoDto)
     if (!editedTodo) {
        throw new NotFoundException('Todo does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'Todo has been successfully updated',
        todo: editedTodo,
      });

    }

}
