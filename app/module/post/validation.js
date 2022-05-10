import Joi from "joi";

export default{
  
    create: {
        body: {
          schema: Joi.object({
            post: Joi.string().min(30).max(2000).required(),
            media: Joi.string(),
            longitude: Joi.string(),
            latitude: Joi.string(),
          }),
        },
      },

      update: {
        body: {
          schema: Joi.object({
            postid: Joi.string().min(20)
              .max(36)
              .trim(),
            post: Joi.string().min(30).max(2000).required(),
            media: Joi.string(),
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

      view: {
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