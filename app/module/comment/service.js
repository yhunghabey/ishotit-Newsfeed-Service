import Post from "../post/model";
import Comment from "../comment/model";
import { success, ExistsError, getContent, AuthenticationError } from "iyasunday";
import bcrypt from 'bcrypt';


export async function create(req) {
  try {
    const {comment, postid } = req.body;
    const getUser = await getContent({
      headers: {
        authorization: req.headers.authorization
      },
      url: process.env.USERMGT + '/user',
    });
    let newComment = new Comment();
    newComment.comment = comment;
    newComment.postID = postid;
    newComment.userInfo.userId = getUser.data._id;
    newComment.userInfo.username = getUser.data.username;
    newComment.userInfo.photo = getUser.data.photo;
    await newComment.save();
    
    //increment the comment count
    await Post.findOneAndUpdate({ _id: postid }, {
      $inc: { commentCount: 1 },
    });
    return {
      success,
      message: `Comment Created successfully.`,
      data: newComment,
    };
  } catch (err) {
    throw err;
  }
};

export async function update(body) {
  try {
    const exist = await Comment.findOne({ postID: body.postid});
    if (!exist) {
      throw new AuthenticationError(` Invalid Credentials`);
    }
    const updateComment = await Comment.findOneAndUpdate({ postID: body.postid }, body, {
      new: true,
    });
    return {
      success,
      data: updateComment,
    };
  } catch (err) {
    throw err;
  }
};

export async function viewAll(body){

  try {
    const viewComments = await Comment.find({ postID: body.postid}).select('comment userInfo.photo userInfo.userId userInfo.username createdAt');
    if (!viewComments) {
      throw new ExistsError("Comment not found");
    }
    return {
      success,
      data: viewComments,
      message: `Comments Retrieved Successfully`,
    };
  } catch (err) {
    throw err;
  }
}

export async function remove(body){
  try {
    const deleteComment = await Comment.findByIdAndDelete({ _id: body.commentid, postID: body.postid});
    if (!deleteComment) {
      throw new ExistsError("Comment not found");
    }else{

      //increment the comment count
      await Post.findOneAndUpdate({ _id: body.postid }, {
      $inc: { commentCount: -1 },
    });
    }
    return {
      success,
      data: deleteComment,
      message: `Comment Deleted Successfully`,
    };
  } catch (err) {
    throw err;
  }
}