import fs from "fs";
import imagekit from "../configs/imageKit.js";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import main from "../configs/gemini.js";
export const addBlog=async (req,res)=>{
    try{
        const{title,subTitle,description,category,isPublished}=JSON.parse(req.body.blog);
        const imageFile=req.file;
        if(!title || !subTitle || !description || !category || !imageFile){
            return res.status(400).json({
                success:false,
                message:"Missing required fields"
            })
        }
        
        const fileBuffer=fs.readFileSync(imageFile.path);
        //upload image to imagekit
        const response=await imagekit.upload({
            file:fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs"
        });
        //optimization through imagekit url transformation
        const optimizedImageUrl=imagekit.url({
            path:response.filePath,
            transformation:[
                {quality:'auto'},//Auto compression
                {format:'webp'},// Convert to modern format
                {width:'1280'},//Width resizing
            ]
        });
        const image=optimizedImageUrl;
        await Blog.create({title,subTitle,description,category,image,isPublished});
        return res.status(201).json({
            success:true,
            message:"Blog added successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getAllBlogs=async (req,res)=>{
    try{
        const blogs=await Blog.find({isPublished:true});
        return res.status(200).json({
            success:true,
            blogs
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const getBlogById=async (req,res)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById(id);
        if(!blog){
            return res.status(400).json({
                success:false,
                message:"Blog not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Blog retrieved successfully",
            blog
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const deleteById=async (req,res)=>{
    try{
         const {id}=req.body;
         await Blog.findByIdAndDelete(id);

         //Delete all comments associated with it
         await Comment.deleteMany({blog:id});

         return res.status(200).json({
            success:true,
            message:"Blog deleted successfully"
         })
         
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const togglePublish=async (req,res)=>{
    try{
       const {id}=req.body;
       const blog=await Blog.findById(id);
       blog.isPublished=!blog.isPublished;
       await blog.save();
       return res.status(200).json({
        success:true,
        message:"published status toggled"
       })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const addComment=async (req,res)=>{
     try{
       const {blog,name,content}=req.body;
       const comment=await Comment.create({
           blog,name,content
       });
       return res.status(201).json({
          success:true,
          message:"Comment added for review",
          comment
       })
     }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
     }
}

export const getBlogComments=async (req,res)=>{
    try{
        const {id}=req.body;
        const comments=await Comment.find({blog:id,isApproved:true}).sort({createdAt:-1});
        return res.status(200).json({
            success:true,
            message:"Comments retrieved",
            comments
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

export const generateContent=async (req,res)=>{
    try{
       const {prompt}=req.body;
       const content=await main(prompt+"Generate a blog content for this topic in simple text format");
       return res.status(200).json({
          success:true,
          content
       })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}