// import React from "react";
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";

// const EditModal = ({ 
//   open, 
//   onClose, 
//   item, 
//   onInputChange, 
//   onSave, 
//   fields 
// }) => {
//   return (
//     <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
//       <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: '600' }}>Edit Item</DialogTitle>
//       <DialogContent>
//         {fields.map(({ label, name, type }) => (
//           <TextField
//             key={name}
//             label={label}
//             name={name}
//             value={item[name] || ""}
//             onChange={onInputChange}
//             fullWidth
//             margin="normal"
//             type={type || "text"}
//           />
//         ))}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={onSave} color="primary" variant="contained">
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditModal;
