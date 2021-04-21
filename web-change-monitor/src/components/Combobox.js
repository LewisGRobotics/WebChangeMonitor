import React from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


const Combobox = ({label, options}) => {
    
    return (
        <div  className="Combobox">
            <Autocomplete
                options={options}
                renderInput={(params) =>
                <TextField {...params} label={label} variant="outlined" />}
            />
    </div>
    )
}

export default Combobox
