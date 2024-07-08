const Blog = require("../Models/BlogsModel");
const User = require("../Models/UserModel");
const mongoose = require('mongoose');

const createBlog = async (req, res) => {
  const decodedUser = req.user;
  // console.log(decodedUser)

  // const {email} = decodedUser.email

  const { title, author, description } = req.body;
  if (!title || !description || !author) {
    res.status(400).json("Required All Fields");
  }

  const email = decodedUser.email;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(404).json("user not found");
    }
    const userId = existingUser._id;
    // console.log(existingUser)

    const blog = new Blog({ title, description, user: userId, author });
    await blog.save();
    return res.json("Blog created");
  } catch (err) {
    return res.json("Internal server err" + err);
  }
};

const findBlogById = async (req, res) => {
    const { id } = req.params;
    // console.log(id)
  
    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog ID format" });
    }
  
    try {
      const blog = await Blog.findById(id);
  
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
  
      return res.json(blog);
    } catch (err) {
      console.error("Error fetching blog:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


const updateBlogById = async (req, res) => {
  const { id } = req.params; // Get the blog ID from the URL params
  const { title, author, description } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Blog ID is required" });
  }

  // Optional: Validate the fields if required
  if (!title && !description && !author) {
    return res
      .status(400)
      .json({ error: "At least one field is required to update" });
  }

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // Update only the fields that are provided in the request body
    if (title) blog.title = title;
    if (author) blog.author = author;
    if (description) blog.description = description;

    await blog.save();
    return res.json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error("Error updating blog:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// const getUserBlogs = async (req, res) => {
//   const decodeduser = req.user;
//   const email = decodeduser.email;

//   const existingUser = await User.findOne({ email });
//   if (!existingUser) {
//     res.status(404).json("user not found");
//   }
//   const userId = existingUser._id;

//   const userBlogs = await Blog.find({ user: userId });
//   if (!userBlogs) {
//     res.json("No blogs for user");
//   }
//   res.json(userBlogs);
// };

// const getUserBlogs = async (req, res) => {
//   try {
//     const decodeduser = req.user;

//     if (!decodeduser) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const email = decodeduser.email;

//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const userId = existingUser._id;

//     const userBlogs = await Blog.find({ user: userId });
//     if (!userBlogs || userBlogs.length === 0) {
//       return res.status(404).json({ message: "No blogs for user" });
//     }

//     res.json(userBlogs);
//   } catch (error) {
//     console.error("Error in getUserBlogs:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

const getUserBlogs = async (req, res) => {
  try {
    const decodeduser = req.user;

    if (!decodeduser || !decodeduser.email) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const email = decodeduser.email;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = existingUser._id;

    const userBlogs = await Blog.find({ user: userId });
    if (!userBlogs || userBlogs.length === 0) {
      return res.status(404).json({ message: "No blogs for user" });
    }

    return res.json(userBlogs);
  } catch (err) {
    console.error("Error fetching user blogs:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.find({});
//     res.json(blogs);
//   } catch (err) {
//     res.json("Internal server err" + err);
//   }
// };

const getAllBlogs = async (req, res) => {
  const { page = 1, limit = 5 } = req.query;

  try {
    const blogs = await Blog.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalBlogs = await Blog.countDocuments();

    res.json({
      blogs,
      totalPages: Math.ceil(totalBlogs / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error: " + err.message });
  }
};

const deleteBlog = async (req, res) => {
  const blogId = req.params.id;
  try {
    const blogs = await Blog.deleteOne({ _id: `${blogId}` });
    res.json(blogs);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getUserBlogs,
  deleteBlog,
  findBlogById,
  updateBlogById,
};
