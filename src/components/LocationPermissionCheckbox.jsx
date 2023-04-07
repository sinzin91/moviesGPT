import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LocationPermissionCheckbox = (props) => {
  const [isChecked, setIsChecked] = useState(false);
  const [countryCode, setCountryCode] = useState("");

  const handleCheckboxChange = async (e) => {
    setIsChecked(e.target.checked);
    if (e.target.checked) {
      await getCountryCode();
    } else {
      setCountryCode("");
      props.onCountryCodeChange("");
    }
  };

  const getCountryCode = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setCountryCode(data.country);
      props.onCountryCodeChange(data.country);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="default"
            sx={{
              color: "white",
              "&.Mui-checked": { color: "primary.main" },
            }}
          />
        }
        label={
          isChecked ? (
            <Typography
              variant="body2"
              sx={{
                color: "white",
              }}
            >
              Your country code is: {countryCode}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              sx={{
                color: isChecked ? "white" : "rgba(255, 255, 255, 0.7)",
              }}
            >
              Allow access to your location, to get streaming services for your country.
            </Typography>
          )
        }
      />
    </Box>
  );
};

export default LocationPermissionCheckbox;
