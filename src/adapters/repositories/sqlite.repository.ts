import {TaskRepository} from "../../domain/interfaces/task.repository"
import {Task} from "../../domain/interfaces/task.repository"
import {DatabaseSync} from "node:sqlite"
import { randomUUID } from "node:crypto"

const db = new DatabaseSync("./tasks.db")

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    desc TEXT NOT NULL
  )
`);

export class sqliteTaskRepository implements TaskRepository {
  async createTask(title:string, desc:string){
    const id = randomUUID()
    db.prepare('INSERT INTO tasks (id, title, desc) VALUES (?, ?, ?)').run(id, title, desc)
    return {id, title, desc}
  }
  async updateTask(id: string, title?:string, desc?:string){
    db.prepare('UPDATE tasks SET title = COALESCE(?, title), desc = COALESCE(?, desc) where id = ?').run(title ?? null, desc ?? null, id)
    return await this.getSingleTask(id)
  }
  async deleteTask(id: string){
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
    return
  }
  async getSingleTask(id: string){
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id)
    return (task as unknown as Task) ?? null
  }
  async getAllTasks(){
    const tasks = db.prepare("SELECT * FROM tasks").all()
    return tasks as unknown as Task[]
  }
}