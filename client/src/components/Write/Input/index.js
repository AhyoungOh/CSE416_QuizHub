// import './style.scss';
import { TextField } from '@mui/material';

function Input({ title, value, setValue, inputType = 'text' }) {
  return (
    // <div className='input-wrapper'>
    //   <div>{title} : </div>
    //   <input
    //     type={inputType}
    //     value={value}
    //     onChange={(e) => setValue(e.target.value)}
    //   />
    // </div>
    <TextField
      id="standard-basic"
      defaultValue={value}
      label={title}
      variant="standard"
      type={inputType}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

export default Input;
