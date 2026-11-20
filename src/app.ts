import express, {Request, Response} from "express"
import {UserService} from "./services/user.service"
import {TaskServices} from "./services/task.service"
import {sqliteTaskRepository} from "./adapters/repositories/sqlite.repository"
export const app = express()
import cors from "cors"
import {env} from "./config/env"
import {EmailFactory} from "./factories/email.factory"

app.use(express.json())
app.use(cors())
app.get("/", (_req: Request, res: Response)=>res.send("hello world"))

app.get("/welcome", async (_req:Request, res:Response)=>{
  const emailService = EmailFactory.emailProvider(env.EMAIL_PROVIDER)
  const welcomeService = new UserService(emailService)

  await welcomeService.welcome("learnt adapter", "pamoladize10@gmail.com")

  res.send("welcome email sent")
})

app.post("/api/task/create", async(req:Request, res:Response) => {
  try {
    const {title, desc} = req.body
    if(!title || !desc){
      return res.status(400).json({message: "all fields sre required"})
      }
    const Task = new TaskServices(new sqliteTaskRepository())
    const createTask = await Task.createTask(title, desc)
    if (!createTask) {
      return res.status(400).json({message: "failed to create task"})
    }
    return res.status(200).json({message: "task created successfully", task: createTask})
  } catch (error) {
    return res.status(500).json({message: "internal server error"})
  }
})

app.get("/api/task", async(_req:Request, res:Response) => {
  try {
    const Tasks = new TaskServices(new sqliteTaskRepository())
    const tasks = await Tasks.getAllTasks()
    console.log(tasks.length)
    if (tasks.length < 1) {
      return res.status(200).json({message: "no tasks at the moment"})
    }
    return res.status(200).json({message: "all tasks", tasks })
  } catch (error) {
    return res.status(500).json({message: "internal server error"})
  }
})

app.get("/api/task/:id", async(req:Request, res:Response) => {
  try {
    const {id} = req.params
    if (!id) {
      return res.status(400).json({message: `please provide a valid id params ${id}`})
    }
    const Task = new TaskServices(new sqliteTaskRepository())
    const task = await Task.getSingleTask(id)
    console.log(task)
    if (!task) {
      return res.status(400).json({message: `no task with id ${id}`})
    }
    return res.status(200).json({message: "single task details", task })
  } catch (error) {
    return res.status(500).json({message: "internal server error"})
  }
})

app.delete("/api/task/:id", async(req:Request, res:Response) => {
  try {
    const {id} = req.params
    if (!id) {
      return res.status(400).json({message: `please provide a valid id params ${id}`})
    }
    const Task = new TaskServices(new sqliteTaskRepository())
    const task = await Task.deleteTask(id)
    console.log(task)
    if (!task) {
      return res.status(400).json({message: `no task with id ${id}`})
    }
    return res.status(200).json({message: `task with id ${id} deleted successfully`, task })
  } catch (error) {
    return res.status(500).json({message: "internal server error", error})
  }
})

app.patch("/api/task/:id", async(req:Request, res:Response) => {
  try {
    const {id} = req.params
    const {title, desc} = req.body
    if (!id) {
      return res.status(400).json({message: `please provide a valid id params ${id}`})
    }
    const Task = new TaskServices(new sqliteTaskRepository())
    const task = await Task.updateTask(id, title, desc)
    console.log(task)
    if (!task) {
      return res.status(400).json({message: `no task with id ${id}`})
    }
    return res.status(200).json({message: `task with id ${id} updated successfully`, task })
  } catch (error) {
    return res.status(500).json({message: "internal server error", error})
  }
})