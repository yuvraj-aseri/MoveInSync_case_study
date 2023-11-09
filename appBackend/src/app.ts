import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { dbConnect } from "./Lib/mongo";
import {mainRouter} from "./routes/global/Contacts"

const app = express();


app.use(cors())
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));


dbConnect();
//health of server

// mainRouter.use("/auth", routers.authRouter);
app.use('/api',mainRouter);


//Add 100 kapans to 


//Delete All Kapans




app.listen(4000,()=> console.log(`Server is running on http://localhost:${4000}`))