import * as service from './service';

export async function create(req,res,next){
    try {
        return res.status(200).json(await service.create(req))
    } catch (err) {
        next(err);
    }
}

export async function update(req,res,next){
    try {
        return res.status(200).json(await service.update(req.body))
    } catch (err) {
        next(err);
    }
}

export async function view(req,res,next){
    try {
        return res.status(200).json(await service.view(req.body))
    } catch (err) {
        next(err);
    }
}

export async function allPostByUser(req,res,next){
    try {
        return res.status(200).json(await service.allPostByUser(req.body))
    } catch (err) {
        next(err);
    }
}

export async function viewAll(req,res,next){
    try {
        return res.status(200).json(await service.viewAll())
    } catch (err) {
        next(err);
    }
}

export async function viewAllPostMedia(req,res,next){
    try {
        return res.status(200).json(await service.viewAllPostMedia(req.user))
    } catch (err) {
        next(err);
    }
}

export async function remove(req,res,next){
    try {
        return res.status(200).json(await service.remove(req.body))
    } catch (err) {
        next(err);
    }
}