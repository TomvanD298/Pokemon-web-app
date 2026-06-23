type ExampleTodoDto = Record<string, unknown>;
type ExampleTodo = ExampleTodoDto;

const transformTodo = (dto: ExampleTodoDto): ExampleTodo => dto;

export default transformTodo;
