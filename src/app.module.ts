import { Module } from '@nestjs/common';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TodoModule } from './todo/todo.module';


@Module({
  imports: [TodoModule],
  controllers: [TodoController],
  providers: [TodoService],

})
export class AppModule {}
