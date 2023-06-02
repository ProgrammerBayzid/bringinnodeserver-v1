const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middelware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.j7rvpzy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const blogsCollection = client.db("bringinBlogs").collection("blogs");
    const commentCollection = client.db("bringinBlogs").collection("comment");
    const bringinfeaturedCollection = client
      .db("bringinBlogs")
      .collection("bringinfeatured");
    const influencersCollection = client
      .db("bringinBlogs")
      .collection("influencers ");
    const cetagoryCollection = client
      .db("bringinBlogs")
      .collection("blogCetagory");

    app.get("/blogs", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 5;
      const blogs = blogsCollection.find(query).sort({ _id: -1 }).limit(limit);
      const blog = await blogs.toArray();
      res.send(blog);
    });
    app.get("/recent/post", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 0;
      const cursor = blogsCollection.find(query);
      const services = cursor.limit(5).sort({ _id: -1 }).limit(limit);
      const ser = await services.toArray();
      res.send(ser);
    });
    app.get("/bringinfeatured", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 0;
      const bringinfeatured = bringinfeaturedCollection
        .find(query)
        .sort({ _id: -1 })
        .limit(limit);
      const bringinfeatureds = await bringinfeatured.toArray();
      res.send(bringinfeatureds);
    });
    app.get("/influencers", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 0;
      const influencers = influencersCollection
        .find(query)
        .sort({ _id: -1 })
        .limit(limit);
      const influncer = await influencers.toArray();
      res.send(influncer);
    });
    app.get("/comment", async (req, res) => {
      let query = {};
      const limit = parseInt(req.query.limit) || 0;
      if (req.query.blogId) {
        query = { blogId: req.query.blogId };
      }
      const cursor = commentCollection
        .find(query)
        .sort({ _id: -1 })
        .limit(limit);
      const feedback = await cursor.toArray();
      res.send(feedback);
    });

    app.get("/cetagorys", async (req, res) => {
      const query = {};
      const cetagory = await cetagoryCollection.find(query).toArray();
      res.send(cetagory);
    });

    app.get("/catagory/blogs/:categoryName", async (req, res) => {
      const catagory = req.params.categoryName;
      const limit = parseInt(req.query.limit) || 0;
      const catagoryName = blogsCollection
        .find({ categoryName: catagory })
        .sort({ _id: -1 })
        .limit(limit);
      const singlecatagoryName = await catagoryName.toArray();
      res.send(singlecatagoryName);
    });
    app.get("/catagory/blogs/:categoryName", async (req, res) => {
      const catagory = req.params.categoryName;
      const limit = parseInt(req.query.limit) || 0;
      const catagoryName = blogsCollection
        .find({ categoryName: catagory })
        .sort({ _id: -1 })
        .limit(limit);
      const singlecatagoryName = await catagoryName.toArray();
      res.send(singlecatagoryName);
    });

    app.get("/blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const blog = await blogsCollection.findOne(query);
      res.send(blog);
    });

    app.post("/blogs", async (req, res) => {
      const user = req.body;
      const result = await blogsCollection.insertOne(user);
      res.send(result);
    });
    app.post("/comment", async (req, res) => {
      const user = req.body;
      const comment = await commentCollection.insertOne(user);
      res.send(comment);
    });
    app.post("/bringinfeatured", async (req, res) => {
      const user = req.body;
      const bringinfeatured = await bringinfeaturedCollection.insertOne(user);
      res.send(bringinfeatured);
    });
    app.post("/influencers", async (req, res) => {
      const user = req.body;
      const influencers = await influencersCollection.insertOne(user);
      res.send(influencers);
    });
  } catch (error) {}
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("Bringin Blogs server is running");
});
app.listen(port, (req, res) => {
  console.log(`Bringin Blogs server  server is running port ${port}`);
});
