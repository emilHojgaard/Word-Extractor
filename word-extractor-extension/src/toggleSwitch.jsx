import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles";

const CustomSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 27.2,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2.2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(23.6px)", // Adjusted to ensure equal spacing
      "& + .MuiSwitch-track": {
        backgroundColor: "#FFF2E0", // Light orange/peach background
        opacity: 1,
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#F9A826", // Orange for checked thumb
      },
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.50,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    backgroundColor: "#BBBBBB", // Gray for unchecked thumb
  },
  "& .MuiSwitch-track": {
    borderRadius: 34 / 2,
    backgroundColor: "#827878", // Light gray background for unchecked
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
    "&:before, &:after": {
      content: "''",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
    // Checkmark on the left (before)
    "&:before": {
      left: 5,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        "#F9A826" // Orange for the checkmark icon
      )}" d="M9,16.17L4.83,12l-1.42,1.41L9,19 21,7l-1.41-1.41L9,16.17z"/></svg>')`,
    },
    // Minus on the right (after)
    "&:after": {
      right: 5,
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        "#BBBBBB" // Gray for the minus icon
      )}" d="M19,13H5v-2h14v2z"/></svg>')`,
    },
  },
}));

const CustomFormControlLabel = styled(FormControlLabel)({
  gap: "12px",
  marginBottom: "20px",
  display: "flex",
  alignItems: "center",
  color: "rgb(25, 118, 210)",
  fontSize: "smaller",
  fontWeight: "bolder",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
});

function MUISwitch({ label = "toggle", defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <CustomFormControlLabel
      control={<CustomSwitch checked={checked} onChange={handleChange} />}
      label={label}
    />
  );
}

export default MUISwitch;
