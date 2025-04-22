import react, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

function MUISwitch() {
    const [checked, setChecked] = useState(false); // Local state for switch
  
    const handleChange = (event) => {
      setChecked(event.target.checked); // Handle state change when switch toggles
    };
  
    return (
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={checked ? "On" : "Off"} // Dynamic label based on switch state
      />
    );
  }
  
  export default MUISwitch;