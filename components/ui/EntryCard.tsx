import React, { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { Entry } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard:FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext( UIContext );

    const router = useRouter();

    const onDragStart = ( event: DragEvent ) => {
        event.dataTransfer.setData('text', entry._id);
        // modificar el estado para saber que se hace drag
        startDragging();
    }

    const onDragEnd = () => {
        // cancelar on drag
        endDragging();
    }

    const onClick = () => {
        router.push(`/entries/${ entry._id }`);
    }

    return (
        <Card 
            onClick={ onClick }
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={ onDragStart }
            onDragEnd={ onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{ entry.description }</Typography>
                </CardContent>

                <CardActions  sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createdAt ) }</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
