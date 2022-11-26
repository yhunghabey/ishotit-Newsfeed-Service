import * as service from './service';

export async function create(req,res,next){
    try {
        return res.status(200).json(await service.create(req))
    } catch (err) {
        next(err);
    }
}

export async function getAll(req,res,next){
    try {
        return res.status(200).json(await service.getAll(req.body))
    } catch (err) {
        next(err);
    }
}

export async function getUsersLikes(req,res,next){
    try {
        return res.status(200).json(await service.getUsersLikes(req.body))
    } catch (err) {
        next(err);
    }
}

export async function remove(req,res,next){
    try {
        return res.status(200).json(await service.remove(req.user,  req.body))
    } catch (err) {
        next(err);
    }
}