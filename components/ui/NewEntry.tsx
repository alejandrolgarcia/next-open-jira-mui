import { ChangeEvent, useState, useContext } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext( EntriesContext );
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = ( event:ChangeEvent<HTMLInputElement> ) => {
        setInputValue( event.target.value );
    }

    const onSave = () => {
        if ( inputValue.length === 0 ) return;
        
        addNewEntry( inputValue );
        setIsAddingEntry( false );
        setTouched( false );
        setInputValue('');
    }

    return (
        <Box margin='5px' padding='2px'>
            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' }
                            error={ inputValue.length <= 0 && touched }
                            value={ inputValue }
                            onChange={ onTextFieldChanged }
                            onBlur={ () => setTouched( true ) }
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='text'
                                endIcon={ <CancelIcon /> }
                                onClick={ () => setIsAddingEntry( false ) }
                            >
                                Cancelar
                            </Button>

                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={ <SaveIcon /> }
                                onClick={ onSave }
                            >
                                Guardar
                            </Button>
                        </Box>        
                    </>
                ) 
                : 
                (
                    <>
                        <Button
                            startIcon={ <PlaylistAddIcon /> }
                            fullWidth
                            variant='outlined'
                            onClick={ () => setIsAddingEntry( true ) }
                        >
                            Agregar nueva tarea
                        </Button>
                    </>
                )
            }
        </Box>
    )
}
