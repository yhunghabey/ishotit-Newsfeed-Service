import Post from "../post/model";
import Like from "../likes/model";
import { success, ExistsError, getContent, AuthenticationError } from "iyasunday";


export async function create(req) {
  try {
    const { postid } = req.body;
    const getUser = await getContent({
      headers: {
        authorization: req.headers.authorization
      },
      url: process.env.USERMGT + '/user',
    });
    let newLike = new Like();
    newLike.postID = postid;
    newLike.user = getUser.data._id;
    newLike.username = getUser.data.username;
    await newLike.save();
    
    //check if a like exist on the post before
    const checkLike = await Like.findOne({})
    //increment the like count
    await Post.findOneAndUpdate({ _id: postid }, {
      $inc: { likeCount: 1 },
    });
    return {
      success,
      message: `A post has been Liked successfully.`,
      data: newLike,
    };
  } catch (err) {
    throw err;
  }
};


export async function getAll(body){

  try {
    const viewLikes = await Post.findOne({ _id: body.postid}).select('likeCount');
    if (!viewLikes) {
      throw new ExistsError("No Likes");
    }
    return {
      success,
      data: viewLikes,
      message: `All Likes Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function remove(user, body){
  try {
    const deleteLike = await Like.findOneAndDelete({ postID: body.postid, user: user.id });
    if (!deleteLike) {
      throw new ExistsError("Like not found");
    }else{
      //increment the comment count
      await Post.findOneAndUpdate({ _id: body.postid }, {
      $inc: { likeCount: -1 },
    });
    }
    return {
      success,
      data: deleteLike,
      message: `Like Removed Successfully`,
    };
  } catch (err) {
    throw err;
  }
}