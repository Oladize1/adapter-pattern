import {env} from "./src/config/env"
import {app} from "./src/app"

const PORT = env.PORT

app.listen(PORT, "0.0.0.0" ,()=>console.log(`server listenning on  port ${PORT}`))