import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

function TextFieldComponent({id, fieldLabel, fieldType, rows, fieldValue, isMultiLined, isFullWidth, fieldSize, onChangeFun, onBlurFun}) {
  return (
    <>
        <TextField 
            id={id} 
            label={fieldLabel} 
            rows={rows} 
            fullWidth={isFullWidth}
            variant='outlined' 
            value={fieldValue}
            type={fieldType}
            size={fieldSize}
            multiline={isMultiLined}
            onChange={onChangeFun}
            onBlur={onBlurFun}
        >
        </TextField>
    </>
  )
}

export default TextFieldComponent
