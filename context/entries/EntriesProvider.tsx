import { FC, useEffect, useReducer } from 'react';
// mport { v4 as uuidv4 } from 'uuid';

import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);

    const addNewEntry = async ( description: string ) => {

        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: 'pending'
        // }

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] - Add-Entry', payload: data });

    }

    const updateEntry = async( { _id, description, status }: Entry ) => {

        try {
            const { data } = await entriesApi.put(`/entries/${ _id }`, { description, status });
            dispatch({ type: '[Entry] - Entry-Updated', payload: data });
        } catch (error) {
            console.log({ error });
        }

    }

    const refreshEntries = async() => {
        const { data } = await entriesApi.get('/entries');
        dispatch({ type: '[Entry] - Entry-Refresh', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, [])
    
    
    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry
        }}>
            { children }
        </EntriesContext.Provider>
    )
}