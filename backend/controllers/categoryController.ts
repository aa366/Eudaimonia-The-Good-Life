import Category from "../models/categoryModel.ts";
import asyncHandler from "../middleware/asyncHandler.ts";
import { errorHandler, type APIError } from "../types/type.ts";

const createCategory = asyncHandler(async (req,res)=>{
    try {
        const {name} = req.body
        if (!name) {
            return res.json({error : "Name is Required"})
        }

        const existingCategory = await Category.findOne({name})
        if (existingCategory) {
            return res.status(405).json({error:"Already exists"})
        }
        const category = await new Category({name}).save()
        res.status(200).json(category)

    } catch (error) {
        console.error(error)
        return res.status(400).json(error)
    }
})

const updateCategory = asyncHandler(async (req,res)=>{
   try {
     const {name} = req.body
    const {categoryId} = req.params

    const category = await Category.findOne({_id:categoryId})

    if(category){
        category.name = name
        const updatedCategory = await category.save()
        res.status(200).json({message:"Done",updatedCategory})
    }else{
        
        res.status(400).json({error:"Category not found"})
    }
     
    
   } catch (error) {
    console.error(error)
    res.status(500).json({error:"Internal server error"})
   }
})

const removeCategory = asyncHandler(async (req,res)=>{
    try {
        const category = await Category.findById(req.params.categoryId)

        if(!category){
            return res.status(404).json({error:"Not Found"})
            
        }

        const removed = await Category.deleteOne({_id:category?._id})
        return res.json(removed)
        
    } catch (error) {
        console.error(error)
        return res.status(400).json(errorHandler(error))
    }
})

const listCategory = asyncHandler(async (req,res)=>{
    try {
        const all = await Category.find()
        return res.json(all)

    } catch (error) {
        console.error(error)
      
       return res.status(400).json(errorHandler(error))
    }
    
})

const readCategory = asyncHandler(async (req,res)=>{
    try {

        const {id} = req.params 
      
        if (!id) {
            return res.status(404).json({error:"Not Found"})
        }
        
        const category = await Category.findOne({_id:id})
        if (category) {
            return res.json(category)
        }
        
    } catch (error) {
        console.error(error)
        return res.status(400).json(errorHandler(error))
    }
})


export {
    readCategory,
    createCategory,
    listCategory,
    removeCategory,
    updateCategory
}