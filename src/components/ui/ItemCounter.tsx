
import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { textAlign } from '@mui/system';

interface Props {
   currentValue: number;
   updateQuantity: (quiantity: number) => void;
   maxValue: number;
}

export const ItemCounter: FC<Props> = ({ currentValue, updateQuantity, maxValue }) => {

   const addProduct = () => {
      if(currentValue === maxValue) return;
      updateQuantity(currentValue + 1);
   }

   const removeProduct = () => {
      if(currentValue === 1) return;
      updateQuantity(currentValue - 1);
   }

   return (
      <Box display='flex' alignItems='center'>
         <IconButton onClick={removeProduct}>
            <RemoveCircleOutline />
         </IconButton>
         <Typography sx={{ width: 40, textAlign: 'center' }}>{currentValue}</Typography>
         <IconButton onClick={addProduct}>
            <AddCircleOutline />
         </IconButton>
      </Box>
   )
}
