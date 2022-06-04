import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data = 
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query;

    if( !mongoose.isValidObjectId(id) ) {
        return res.status(400).json({ message: 'El id no es válido ' + id });
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res);
        
        case 'GET':
            return getEntry(req, res);
    
        default:
            return res.status(400).json({ message: 'El método no existe' });
    }
}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if( !entryToUpdate ) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entradas con el Id' + id });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await db.disconnect();
        res.status(200).json( updatedEntry! );
    } catch (error: any) {
        await db.disconnect();
        return res.status(400).json({ message: error.errors.status.message });
    }

}

const getEntry = async(req: NextApiRequest, res: NextApiResponse) => {
    
    const { id } = req.query;

    await db.connect();
    const getEntry = await Entry.findById(id);

    if( !getEntry ){
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entradas con el Id' + id });
    }

    res.status(200).json(getEntry);
    await db.disconnect();
}