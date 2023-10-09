import MongoConnection from "./MongoConnection.mjs";
import express from 'express';
const app = express();
const port = process.env.PORT || 8181;
const server = app.listen(port);
server.on('listening', () => console.log(`server is listening on port ${port}, process id: ${process.pid}`));
 const dbConnection = new MongoConnection(`mongodb+srv://root:${process.env.MONGO_PASSWORD}@cluster0.d19qlu2.mongodb.net/college?retryWrites=true&w=majority`,
 'college')
 //const dbConnection = new MongoConnection(`mongodb+srv://root:12345.com@cluster0.d19qlu2.mongodb.net/college?retryWrites=true&w=majority`,
 //'college')
const studentsCollection = dbConnection.getCollection('students')
app.get('/performance/total', (req,res) => {
    const startTime = new Date();
    const count = +req.query.count;
    let total = 0;
    for (let i = 0; i < count; i++) {
        total++;
    }
    res.send({pid: process.pid, api: 'node', total, time: new Date().getTime() - startTime.getTime()});
});
app.get('/performance/students', async (req, res) => {
    const startTime = new Date();
    const students = await studentsCollection.find({}).toArray();
    res.send({pid: process.pid, api: 'node', total: students.length, time: new Date().getTime() - startTime.getTime()})

})

