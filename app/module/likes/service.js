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

    //check if the user has liked before
    const check = await Like.findOne({user: getUser.data._id, postID: postid});
    if(check) throw new ExistsError("User Already liked this post");

    let newLike = new Like();
    newLike.postID = postid;
    newLike.userInfo.userId = getUser.data._id;
    newLike.userInfo.photo = getUser.data.photo;
    newLike.userInfo.username = getUser.data.username;
    newLike.status = 'LIKED';
    await newLike.save();
    
    //check if a like exist on the post before
    const checkLike = await Like.findOne({})
    //increment the like count
    await Post.findOneAndUpdate({ _id: postid }, {
      $inc: { likeCount: 1 },
    });
    return {
      success,
      message: `This post has been Liked successfully.`,
      data: newLike,
    };
  } catch (err) {
    throw err;
  }
};


export async function getAll(params){

  try {
    const viewLikes = await Post.findOne({ _id: params.id}).select('likeCount userInfo.username userInfo.photo');
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

export async function getUsersLikes(params){
  try {
    const getUsersLikes = await Like.findOne({ postID: params.id }).select('userInfo.username userInfo.photo userInfo.userId');
    if (!getUsersLikes) {
      throw new ExistsError("No User Likes This Post");
    }
    return {
      success,
      data: getUsersLikes,
      message: `All Users that Likes a post is Retrieved Successfully`,
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

export async function likeStatus(user, body){
  try {
    const likeStatus = await Like.findOne({ user: user.id, postID: body.postid });
    if (!likeStatus) {
      throw new ExistsError("You Have Not Liked This Post");
    }
    return {
      success,
      data: likeStatus,
      message: `Like Status Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}