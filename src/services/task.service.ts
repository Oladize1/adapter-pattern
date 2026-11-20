import {TaskRepository} from "../domain/interfaces/task.repository"

export class TaskServices {
  constructor (private taskRepository: TaskRepository) {}
  async createTask(title:string, desc:string){
    return await this.taskRepository.createTask(title, desc)
  }
  async updateTask(id: string, title?:string, desc?:string){
    return await this.taskRepository.updateTask(id, title, desc)
  }
  async deleteTask(id: string){
    return await this.taskRepository.deleteTask(id)
  }
  async getSingleTask(id: string){
    return await this.taskRepository.getSingleTask(id)
  }
  async getAllTasks(){
    return await this.taskRepository.getAllTasks()
  }
}