const express= require('express')
const router=express.Router()
const Classes=require('../models/Class')

router.post('/add-classroom',async(req,res)=>{
    try{
        const {name,capacity,description}=req.body

        if(!name || !capacity || !description ){
            return res.status(400).json({message: "Please provide all required fields." })
        }

        const classes =new Classes({
            name,
            capacity,
            description,
        });
        await classes.save();
        res.status(201).json(classes)
    }catch(err){
        console.error(err);
        res.status(500).json({message: "An error occurred while creating the subject."})
    }
})

router.get('/', async (req, res) => {
    try {
      const classes = await Classes.find();
      res.json(classes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  router.delete("/delete/:id", async (req, resp) => {
    let result = await Classes.deleteOne({ _id: req.params.id });
    resp.send(result)
  }),
  
    router.get("/:id", async (req, resp) => {
        let result = await Classes.findOne({ _id: req.params.id })
        if (result) {
            resp.send(result)
        } else {
            resp.send({ "result": "No Record Found." })
        }
    })
   

router.put("/edit/:id", async (req, resp) => {
    let result = await Classes.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    resp.send(result)
});


module.exports = router;