export type Task = {
  id: string
  title: string
  desc: string
}

export interface TaskRepository {
  createTask(title: string, desc: string): Promise<Task>,
  updateTask(id: string, title?: string, desc?:string):Promise<Task | null>,
  deleteTask(id:string): Promise<void>,
  getSingleTask(id: string): Promise<Task | null>,
  getAllTasks(): Promise<Task[]>
}