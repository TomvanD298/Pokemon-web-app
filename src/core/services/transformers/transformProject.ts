type ExampleProjectDto = Record<string, unknown>;
type ExampleProject = ExampleProjectDto;

const transformProject = (dto: ExampleProjectDto): ExampleProject => dto;

export default transformProject;
