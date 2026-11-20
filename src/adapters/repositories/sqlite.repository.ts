import {TaskRepository} from "../../domain/interfaces/task.repository"
import {Task} from "../../domain/interfaces/task.service"
import {DatabaseSync} from "node:sqlite"


const db = new DatabaseSync("./tasks.db")

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
    title TEXT NOT NULL,
    desc TEXT NOT NULL
  )
`);

export class sqliteTaskRepository implements TaskRepository {
  async createTask(title:string, desc:string){
    const task = await db.prepare('INSERT INTO tasks (title, desc) VALUES (?, ?)').run(title, desc)
    return task
  }
  async updateTask(id: string, title?:string, desc?:string){
    const task = db.prepare('UPDATE tasks SET title = COALESCE(?, title), desc = COALESCE(?, desc) where id = ?').run(title ?? null, desc ?? null, id)
    return task
  }
  async deleteTask(id: string){
    const task = await db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
    return task
  }
  async getSingleTask(id: string){
    const task = await db.prepare('SELECT * FROM tasks WHERE id = ?').get(id)
    return task as unknown as Task
  }
  async getAllTasks(){
    const tasks = await db.prepare("SELECT * FROM tasks").all()
    return tasks as unknown as Task[]
  }
}