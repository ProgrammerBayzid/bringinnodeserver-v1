const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000
const { MongoClient, ServerApiVersion, ObjectId, } = require('mongodb');

// middelware
app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j7rvpzy.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
try {
    


    const blogsCollection = client.db('bringinBlogs').collection('blogs');
    const cetagoryCollection = client.db('bringinBlogs').collection('blogCetagory');







    app.get('/blogs', async (req, res) => {
        const query = {};
        const blogs = await blogsCollection.find(query).toArray();
        res.send(blogs);
    });
    app.get('/cetagorys', async (req, res) => {
        const query = {};
        const cetagory = await cetagoryCollection.find(query).toArray();
        res.send(cetagory);
    });

    app.post('/blogs', async (req, res) => {
        const user = req.body;
        const result = await blogsCollection.insertOne(user);
        res.send(result);
    });


} catch (error) {
    
}


}
run().catch(console.log)












app.get('/', (req, res) => {
    res.send('Bringin Blogs server is running')
})
app.listen(port, (req, res) => {
    console.log(`Bringin Blogs server  server is running port ${port}`);
})