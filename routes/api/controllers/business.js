import express from 'express'
var router = express.Router()


router.post('/', async (req, res) => {
    try{
        console.log("Entering /post")
        console.log("Received from req.body: ", req.body.businessName)
        
        const newBusinessName = req.body.businessName
        
        const newBusiness = new req.models.Business({
            businessName: newBusinessName
        })

        await newBusiness.save()
        console.log("successfully saved business into db")

        return res.json({status: "success"})
    } catch (error) {
        console.log("Error saving new business: ", error)
        return res.status(500).json({error: error.message})
    }
})

export default router