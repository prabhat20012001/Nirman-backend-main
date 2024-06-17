const express = require('express');
const app = express();
const cors = require("cors")
const Razorpay = require("razorpay");
require('dotenv').config();

const port = process.env.PORT || 3001;
const { connection,
    TeamMemberModel,
    TestimonialModel,
    GalleryModel,
    MessageModel,
    BlogModel,
    JobModel,
    JobApplicationsModel,
    ProjectsModel,
    EventModel,
    lifeAffectedModel,
    CentersModel,
    ActivityReportsModel,
    AuditReportsModel } = require("./db");

app.use(express.json({ limit: '50mb' }))
app.use(cors())
app.use(express.static('./', {
    setHeaders: function (res) {
        res.set("Content-Security-Policy", "default-src 'self'");
    }
}));


// Payment Gateway Integration Starts Here

var instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});


app.post("/create/orderId", async (req, res) => {
    const data = req.body;

    const options = {
        amount: req.body.amount * 100,
        currency: "INR",
        receipt: "rcp1"
    }
    console.log(data)
    instance.orders.create(options, (err, order) => {
        console.log(order);
        res.send({
            orderId: order.id
        })
    })
});











app.get("/", (req, res) => {
    res.send("Welcome")
})

// Team EndPoint

app.get("/team", async (req, res) => {
    const query = req.query;
    try {
        const data = await TeamMemberModel.find(query);
        res.send(data);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/team/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const data = await TeamMemberModel.findById(id);
        if (!data) {
            res.status(404).send("Object not found");
        } else {
            res.send(data);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/team", async (req, res) => {
    const data = req.body;
    try {
        const member = new TeamMemberModel(data);
        await member.save();
        res.send(data);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.patch("/team/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    console.log(id)
    const updatedObjet = await TeamMemberModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})
app.delete("/team/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const deletedObject = await TeamMemberModel.findByIdAndDelete(id);
        if (!deletedObject) {
            res.status(404).send("Object not found");
        } else {
            res.send(`Object with ID:${id} has been deleted`);
        }
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

//***************************************************************************************************************************** */

// Testimonial EndPoint

app.get("/testimonials", async (req, res) => {
    const query = req.query;
    const data = await TestimonialModel.find(query)
    res.send(data)
})
app.get("/testimonials/:id", async (req, res) => {
    const id = req.params.id;
    const data = await TestimonialModel.findById(id);
    res.send(data);
})
app.post("/testimonials", async (req, res) => {
    const data = req.body;
    const testimonials = new TestimonialModel(data);
    await testimonials.save()
    res.send(data)
})
app.delete("/testimonials/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await TestimonialModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/testimonials/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await TestimonialModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

    //***************************************************************************************************************************** */

    // Gallery EndPoint
    ,

    app.get("/gallery", async (req, res) => {
        const query = req.query;
        const data = await GalleryModel.find(query)
        res.send(data)
    })
app.get("/gallery/pagination", async (req, res) => {
    const { page, limit } = req.query;
    const data = await GalleryModel.find();
    let finalData = [];
    let start = (page * limit) - limit;
    for (let i = start; i < page * limit; i++) {
        if (!data[i]) break
        finalData.push(data[i]);
    }
    res.header("x-count-count", data.length)
    console.log(res)
    res.send({ finalData, "x-total-count": data.length });
})
app.get("/gallery/:id", async (req, res) => {
    const id = req.params.id;
    const data = await GalleryModel.findById(id);
    res.send(data);
})
app.post("/gallery", async (req, res) => {
    const data = req.body;
    const gallery = new GalleryModel(data);
    await gallery.save()
    res.send(data)
})
app.delete("/gallery/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await GalleryModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/gallery/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await GalleryModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})


    //***************************************************************************************************************************** */

    // messages EndPoint
    ,

    app.get("/messages", async (req, res) => {
        const query = req.query;
        const data = await MessageModel.find(query)
        res.send(data)
    })
app.get("/messages/:id", async (req, res) => {
    const id = req.params.id;
    const data = await MessageModel.findById(id);
    res.send(data);
})
app.post("/messages", async (req, res) => {
    const data = req.body;
    const messages = new MessageModel(data);
    await messages.save()
    console.log(data);
    res.send(data)
})
app.delete("/messages/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await MessageModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/messages/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await MessageModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})


//***************************************************************************************************************************** */

// blogs EndPoint

app.get("/blogs", async (req, res) => {
    const query = req.query;
    console.log(query)
    const data = await BlogModel.find(query)
    res.send(data)
})
app.get("/blogs/:id", async (req, res) => {
    const id = req.params.id;
    const data = await BlogModel.findById(id);
    console.log(data)
    res.send(data);
})
app.post("/blogs", async (req, res) => {
    const data = req.body;
    const blogs = new BlogModel(data);
    await blogs.save()
    console.log(data);
    res.send(data)
})
app.delete("/blogs/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await BlogModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/blogs/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await BlogModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

//***************************************************************************************************************************** */

// Jobs EndPoint



app.get("/Jobs", async (req, res) => {
    const query = req.query;
    console.log(query)
    const data = await JobModel.find(query)
    res.send(data)
})
app.get("/Jobs/:id", async (req, res) => {
    const id = req.params.id;
    const data = await JobModel.findById(id);
    res.send(data);
})
app.post("/Jobs", async (req, res) => {
    const data = req.body;
    const Jobs = new JobModel(data);
    await Jobs.save()
    console.log(data);
    res.send(data)
})
app.delete("/Jobs/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await JobModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/Jobs/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await JobModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

    //***************************************************************************************************************************** */
    // JobApplications EndPoint
    ,

    app.get("/JobApplications", async (req, res) => {
        const query = req.query;
        console.log(query)
        const data = await JobApplicationsModel.find(query)
        res.send(data)
    })
app.get("/JobApplications/:id", async (req, res) => {
    const id = req.params.id;
    const data = await JobApplicationsModel.findById(id);
    res.send(data);
})
app.post("/JobApplications", async (req, res) => {
    const data = req.body;
    const JobApplications = new JobApplicationsModel(data);
    await JobApplications.save()
    console.log(data);
    res.send(data)
})
app.delete("/JobApplications/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await JobApplicationsModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/JobApplications/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await JobApplicationsModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})



    //***************************************************************************************************************************** */

    // Projects EndPoint

    ,

    app.get("/Projects", async (req, res) => {
        const query = req.query;
        console.log(query)
        const data = await ProjectsModel.find(query)
        res.send(data)
    })
app.get("/Projects/:id", async (req, res) => {
    const id = req.params.id;
    const data = await ProjectsModel.findById(id);
    res.send(data);
})
app.post("/Projects", async (req, res) => {
    const data = req.body;
    const Projects = new ProjectsModel(data);
    await Projects.save()
    console.log(data);
    res.send(data)
})
app.delete("/Projects/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await ProjectsModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/Projects/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObjet = await ProjectsModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

//***************************************************************************************************************************** */

// event EndPoint

app.get("/event", async (req, res) => {
    const query = req.query;
    const data = await EventModel.find(query)
    res.send(data)
})
app.get("/event/:id", async (req, res) => {
    const id = req.params.id;
    const data = await EventModel.findById(id);
    res.send(data);
})
app.post("/event", async (req, res) => {
    const data = req.body;
    const event = new EventModel(data);
    await event.save()
    res.send(data)
})
app.delete("/event/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await EventModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/event/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObject = await EventModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})


//***************************************************************************************************************************** */

// lifeAffected EndPoint

app.get("/lifeAffected", async (req, res) => {
    const query = req.query;
    const data = await lifeAffectedModel.find(query)
    res.send(data)
})
app.get("/lifeAffected/:id", async (req, res) => {
    const id = req.params.id;
    const data = await lifeAffectedModel.findById(id);
    res.send(data);
})
app.post("/lifeAffected", async (req, res) => {
    const data = req.body;
    const event = new lifeAffectedModel(data);
    await event.save()
    res.send(data)
})
app.delete("/lifeAffected/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await lifeAffectedModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/lifeAffected/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObject = await lifeAffectedModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})

//***************************************************************************************************************************** */

// Center EndPoint

app.get("/centers", async (req, res) => {
    const query = req.query;
    const data = await CentersModel.find(query)
    res.send(data)
})
app.get("/centers/:id", async (req, res) => {
    const id = req.params.id;
    const data = await CentersModel.findById(id);
    res.send(data);
})
app.post("/centers", async (req, res) => {
    const data = req.body;
    const event = new CentersModel(data);
    await event.save()
    res.send(data)
})
app.delete("/centers/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await CentersModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/centers/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObject = await CentersModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})


//***************************************************************************************************************************** */

// ActivityReportsModel EndPoint

app.get("/ActivityReports", async (req, res) => {
    const query = req.query;
    const data = await ActivityReportsModel.find(query)
    res.send(data)
})
app.get("/ActivityReports/:id", async (req, res) => {
    const id = req.params.id;
    const data = await ActivityReportsModel.findById(id);
    res.send(data);
})
app.post("/ActivityReports", async (req, res) => {
    const data = req.body;
    const event = new ActivityReportsModel(data);
    await event.save()
    res.send(data)
})
app.delete("/ActivityReports/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await ActivityReportsModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/ActivityReports/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObject = await ActivityReportsModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})



//***************************************************************************************************************************** */

// AuditReportsModel EndPoint

app.get("/AuditReports", async (req, res) => {
    const query = req.query;
    const data = await AuditReportsModel.find(query)
    res.send(data)
})
app.get("/AuditReports/:id", async (req, res) => {
    const id = req.params.id;
    const data = await AuditReportsModel.findById(id);
    res.send(data);
})
app.post("/AuditReports", async (req, res) => {
    const data = req.body;
    const event = new AuditReportsModel(data);
    await event.save()
    res.send(data)
})
app.delete("/AuditReports/:id", async (req, res) => {
    const id = req.params.id;
    const deletedObject = await AuditReportsModel.findByIdAndDelete(id);
    res.send(`Object with ID:${id} has been deleted`);
})
app.patch("/AuditReports/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    const updatedObject = await AuditReportsModel.findOneAndUpdate({ _id: id }, data);
    res.send(`Object with ID:${id} has been deleted`);
})




app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})