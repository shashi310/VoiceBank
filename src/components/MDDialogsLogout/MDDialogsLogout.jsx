import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from 'utils';
import { AuthContext } from 'context';

export default function MDDialogsLogout() {
    const [open, setOpen] = React.useState(false);
    const {logout} = React.useContext(AuthContext);
    const navigate=useNavigate()
    const token =localStorage.getItem("token")
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleLogout=()=>{
        setOpen(false);
        axios.post(`${url}/user/logout`,{
            headers: {
              'authorization': `Bearer ${token}`
            }
          }).then((res)=>{
            localStorage.clear()
            navigate("/authentication/sign-in")
        }).catch((err)=>{
            console.log(err)
        })
        
    }

    return (
        <React.Fragment>
            <MDButton
                variant="gradient"
                color="info"
                fullWidth
                type="button"
                onClick={handleClickOpen}
            >
                Log Out
            </MDButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you wish to Log out?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogout} autoFocus>
                        Log Out
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}