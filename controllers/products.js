const db=require("../utils/db")
const { handleUpdateProduct } = require("../services/products")

const updateProductQty=async(req,res,next)=>{
    const transaction=await db.transaction()
    try {
        const {prodId,quantity}=req.body
   const updateCount=await handleUpdateProduct(prodId,quantity)
        if(updateCount===0) return res.status(202).json("Product quantity not updated")
        
            res.status(200).json("Product quantity updated successfully")
            await transaction.commit()
        } catch (error) {
        console.log("Error: ",error)
     
        res.status(404).json("An error occured try again")
        await transaction.rollback()
    }
}



module.exports=updateProductQty