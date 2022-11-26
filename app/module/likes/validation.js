import Joi from "joi";

export default{
  
    create: {
        body: {
          schema: Joi.object({
            postid: Joi.string().min(20)
              .max(36)
              .trim(),
          }),
        },
      },


      delete: {
        body: {
          schema: Joi.object({
            postid: Joi.string().max(36),
          }),
        },
      },

      getAll: {
        body: {
          schema: Joi.object({
            postid: Joi.string().min(20)
            .max(36)
            .trim(),
          }),
        },
      },

      getUsersLikes: {
        body: {
          schema: Joi.object({
            postid: Joi.string().min(20)
            .max(36)
            .trim(),
          }),
        },
      },

      remove: {
        body: {
          schema: Joi.object({
            postid: Joi.string().min(20)
            .max(36)
            .trim(),
          }),
        },
      },
}