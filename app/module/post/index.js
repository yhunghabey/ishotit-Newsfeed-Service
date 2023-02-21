'use strict';
import { Router } from 'express';
import { joiValidator } from 'iyasunday';
import * as controller from './controller';
import validation from './validation';
import {guard} from '../../utils/middleware'

const route = Router();

route.post(
    '/post/create',
    guard(),
    joiValidator(validation.create),
    controller.create);

route.patch(
    '/post/update',
    guard(),
    joiValidator(validation.update),
    controller.update);

route.post(
    '/post/view',
    guard(),
    joiValidator(validation.view),
    controller.view);

route.get(
    '/posts',
    guard(),
    //joiValidator(validation.view),
    controller.viewAll);

route.get(
    '/user/posts',
    guard(),
    //joiValidator(validation.view),
    controller.allPostByUser);

route.delete(
    '/post/remove',
    guard(),
    joiValidator(validation.remove),
    controller.remove);


export default route;






