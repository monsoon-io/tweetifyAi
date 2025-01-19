import React from 'react'
import LoadingButton from '@mui/lab/LoadingButton';

function loadingButton({isLoading, onClickFunction, buttonSize}) {
  return (
    <>
      <LoadingButton
        loading={isLoading}
        loadingPosition="center"
        variant="contained"
        onClick={onClickFunction}
        size={buttonSize}
      >
        Generate
      </LoadingButton>
    </>
  )
}

export default loadingButton
