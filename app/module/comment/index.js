'use strict';
import { Router } from 'express';
import { joiValidator } from 'iyasunday';
import * as controller from './controller';
import validation from './validation';
import {guard} from '../../utils/middleware'

const route = Router();

route.post(
    '/comment/create',
    guard(),
    joiValidator(validation.create),
    controller.create);

route.patch(
    '/comment/update',
    guard(),
    joiValidator(validation.update),
    controller.update);

route.post(
    '/comments',
    guard(),
    joiValidator(validation.viewAll),
    controller.viewAll);

route.delete(
    '/comment/remove',
    guard(),
    joiValidator(validation.remove),
    controller.remove);


export default route;






