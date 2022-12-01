'use strict';
import { Router } from 'express';
import { joiValidator } from 'iyasunday';
import * as controller from './controller';
import validation from './validation';
import {guard} from '../../utils/middleware'

const route = Router();

route.post(
    '/like/create',
    guard(),
    joiValidator(validation.create),
    controller.create);

route.get(
    '/likes',
    guard(),
    joiValidator(validation.getAll),
    controller.getAll);

route.get(
    '/users/likes/:id',
    guard(),
    joiValidator(validation.getUsersLikes),
    controller.getUsersLikes
);
route.get(
    '/like/status',
    guard(),
    // joiValidator(validation.getUsersLikes),
    controller.likeStatus
);
route.delete(
    '/like/remove',
    guard(),
    joiValidator(validation.remove),
    controller.remove);


export default route;






