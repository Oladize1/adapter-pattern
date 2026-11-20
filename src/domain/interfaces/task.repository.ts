export type Task = {
  id: string
  title: string
  desc: string
}

export interface TaskRepository {
  createTask(title: string, desc: string): Promise<Task>,
  updateTask(id: string, title?: string, desc?:string):Promise<Task>,
  deleteTask(id:string): Promise<void>,
  getSingleTask(id: string): Promise<Task>,
  getAllTasks(): Promise<Task[]>
}