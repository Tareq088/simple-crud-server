const express = require('express');
const {MongoClient, ServerApiVersion, ObjectId} = require('mongodb');
const app = express();
const port =process.env.PORT || 3000;
        //implement cors,
const cors = require('cors');
        // middleware
app.use(cors());
app.use(express.json());

//password: Vc3Z5PSfFeoERaSW
//user: trahmanbpdb19
const uri = "mongodb+srv://trahmanbpdb19:Vc3Z5PSfFeoERaSW@cluster0.taikvqz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
    try{
      await client.connect();
          //mongodb documenttaion > insert document
          // Connect to the "usersdb" database and access its "users" collection
          //users er moddhe userdb namok data gula thakbe
      const database = client.db("usersdb");
      const userCollection = database.collection("users")
                //read
      app.get('/users', async(req,res)=>{
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result)
      })

        // Connect the client to the server	(optional starting in v4.7)
        //create
      app.post('/users', async(req,res)=>{
        console.log("data in the server",req.body);    
        // Insert the defined document into the "users" collection
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      })
          //DELETE
      app.delete('/users/:id',async(req,res)=>{
        // console.log(req.params);
        const id = req.params.id;
        console.log("deleted id:",id);
        const query = {_id: new ObjectId(id)};
        const result = await userCollection.deleteOne(query);
        res.send(result);
      })

         // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    }
    finally{
            // Ensures that the client will close when you finish/error
            // await client.close(); karone error ashe
      // await client.close();
    }
  }
  run().catch(console.dir)

app.get("/", (req,res)=>{
    res.send("simple crud server running");
})
app.listen(port, ()=>{
    console.log(`simple crud running on,${port}`)
})