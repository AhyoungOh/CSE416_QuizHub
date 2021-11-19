import { Button, TextField } from '@mui/material';


function Upload({ title, value, setValue, inputType = 'file' }) {
    return (
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

{/* <input
  accept="image/*"
  className={classes.input}
  style={{ display: 'none' }}
  id="raised-button-file"
  multiple
  type="file"
/>
<label htmlFor="raised-button-file">
  <Button variant="raised" component="span" className={classes.button}>
    Upload
  </Button>
</label>  */}

export default Upload;