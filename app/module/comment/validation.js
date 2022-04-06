import Joi from "joi";

export default{
  
    create: {
        body: {
          schema: Joi.object({
            comment: Joi.string().min(30).max(2000).required(),
            postid: Joi.string().min(20)
              .max(36)
              .trim(),
          }),
        },
      },

      update: {
        body: {
          schema: Joi.object({
            postid: Joi.string().min(20)
              .max(36)
              .trim(),
             comment: Joi.string().min(10).max(2000),
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

      viewAll: {
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
            commentid: Joi.string().min(20),
            postid: Joi.string().min(20)
            .max(36)
            .trim(),
          }),
        },
      },
}