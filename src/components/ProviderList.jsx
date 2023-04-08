import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  OutlinedInput,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  whiteOutlinedInput: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    color: 'white',
  },
}));


const ProviderList = ({ watchProviders = null }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  const classes = useStyles();

  if (watchProviders === null) return null;
  const subscriptionServices = new Set();

  // iterate through the countries and get the unique subscription providers
  for (const country in watchProviders) {
    // only get subscription services - if there are any
    if ('flatrate' in watchProviders[country]) {
      for (const service in watchProviders[country].flatrate) {
        subscriptionServices.add(
          watchProviders[country].flatrate[service].provider_name
        );
      }
    }
  }

  // for each movie, display the streaming services
  return (
    <Select
      onClick={handleClick}
      defaultValue=""
      displayEmpty
      label="List of streaming services"
      input={<OutlinedInput notched={false} className={classes.whiteOutlinedInput} />}
    >
      <MenuItem value="" disabled>
        List of streaming services
      </MenuItem>
      {Array.from(subscriptionServices).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ProviderList;
