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
    const citiesCollection = client.db("bringinBlogs").collection("cities");
    const commentCollection = client.db("bringinBlogs").collection("comment");
    const reviewCollection = client.db("bringinBlogs").collection("review");
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
      const limit = parseInt(req.query.limit) || 0;
      const blogs = blogsCollection.find(query).sort({ _id: -1 }).limit(limit);
      const blog = await blogs.toArray();
      res.send(blog);
    });
    app.get("/recent/post", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 5;
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
    app.get("/review", async (req, res) => {
      const query = {};
      const limit = parseInt(req.query.limit) || 0;
      const bringinreview = reviewCollection
        .find(query)
        .sort({ _id: -1 })
        .limit(limit);
      const reviews = await bringinreview.toArray();
      res.send(reviews);
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

    app.delete('/blogs/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await blogsCollection.deleteOne(filter);
      res.send(result);
  });
    app.delete('/review/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await reviewCollection.deleteOne(filter);
      res.send(result);
  });
    app.delete('/bringinfeatured/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await bringinfeaturedCollection.deleteOne(filter);
      res.send(result);
  });
    app.delete('/influencers/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await influencersCollection.deleteOne(filter);
      res.send(result);
  });
    app.delete('/allcomment/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await commentCollection.deleteOne(filter);
      res.send(result);
  });
    app.delete('/cetagorys/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await cetagoryCollection.deleteOne(filter);
      res.send(result);
  });
    app.delete('/allcities/:id',  async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await citiesCollection.deleteOne(filter);
      res.send(result);
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
    app.get("/allcomment", async (req, res) => {
      const query = {};
      const com = await commentCollection.find(query).toArray();
      res.send(com);
    });
    app.get("/cities", async (req, res) => {
      const query = {};
      const cities = await citiesCollection.find(query).toArray();
      res.send(cities);
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
    app.get("/guidline/blogs/:categoryName", async (req, res) => {
      const catagory = req.params.categoryName;
      const limit = parseInt(req.query.limit) || 3;
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
    app.post("/caterogye", async (req, res) => {
      const category = req.body;
      const result = await cetagoryCollection.insertOne(category);
      res.send(result);
    });
    app.post("/comment", async (req, res) => {
      const user = req.body;
      const comment = await commentCollection.insertOne(user);
      res.send(comment);
    });
    app.post("/cities", async (req, res) => {
      const user = req.body;
      const cities = await citiesCollection.insertOne(user);
      res.send(cities);
    });
    app.post("/bringinfeatured", async (req, res) => {
      const user = req.body;
      const bringinfeatured = await bringinfeaturedCollection.insertOne(user);
      res.send(bringinfeatured);
    });
    app.post("/review", async (req, res) => {
      const user = req.body;
      const sreview = await reviewCollection.insertOne(user);
      res.send(sreview);
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
