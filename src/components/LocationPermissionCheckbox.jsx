import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/system';

const CustomFormControlLabel = styled(FormControlLabel)({
  display: 'block',
  marginBottom: '16px',
});

const LocationPermissionCheckbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const handleCheckboxChange = async (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      await getCountryCode();
    } else {
      setCountryCode('');
      props.onCountryCodeChange('');
    }
  };

  const getCountryCode = async () => {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setCountryCode(data.country);
      props.onCountryCodeChange(data.country);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <CustomFormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="default"
            sx={{
              color: 'white',
              '&.Mui-checked': { color: 'primary.main' },
            }}
          />
        }
        label={
          isChecked
            ? `Your country code is: ${countryCode}`
            : "Allow access to your location, to get streaming services for your country."
        }
      />
    </div>
  );
};

export default LocationPermissionCheckbox;
