import Post from "../post/model";
import Comment from "../comment/model";
import { success, getContent, AuthenticationError } from "iyasunday";


export async function create(req) {
  try {
    const {post, longitude, latitude, media} = req.body;
    
    const getUser = await getContent({
      url: process.env.USERMGT + '/user',
      method: 'GET',
      headers: {
        authorization: req.headers.authorization
      },
    });

    let newPost = new Post();
    newPost.post = post;
    newPost.media = media;
    newPost.longitude = longitude;
    newPost.latitude = latitude;
    newPost.userInfo.userID = getUser.data._id;
    newPost.userInfo.username = getUser.data.username;
    newPost.userInfo.photo = getUser.data.photo;
    await newPost.save();

    return {
      success,
      message: `Post Created successfully.`,
      data: newPost,
    };
  } catch (err) {
    throw err;
  }
};

export async function update(body) {
  try {

    const exist = await Post.findOne({ _id: body.postid});
    if (!exist) {
      throw new AuthenticationError(` Invalid Credentials`);
    }
    const updatePost = await Post.findByIdAndUpdate({ _id: body.postid }, body, {
      new: true,
    });
    return {
      success,
      data: updatePost,
    };
  } catch (err) {
    throw err;
  }
};

export async function view(body){

  try {
    const viewPost = await Post.findById({ _id: body.postid});
    if (!viewPost) {
      throw new NotFoundError("Post not found");
    }
    return {
      success,
      data: viewPost,
      message: `Post Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function viewAll(){

  try {
    const viewAllPost = await Post.find();
    return {
      success,
      data: viewAllPost,
      message: `All Post Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function remove(body){

  try {
    const deletePost = await Post.findByIdAndDelete({ _id: body.postid});
    if (!deletePost) {
      throw new NotFoundError("Post not found");
    }
    return {
      success,
      data: deletePost,
      message: `Post Deleted Successfully`,
    };
  } catch (err) {
    throw err;
  }
}