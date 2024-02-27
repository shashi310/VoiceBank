import { Button, Divider } from '@mui/material'
import React, { useState } from 'react'
import Icon from "@mui/material/Icon";
import CustomizedDialogs from 'components/MDDialogs';
export const AddItem = () => {
    const [displayModle,SetdisplayModle]=useState(false)

    const handleDisplayModle=()=>{
        SetdisplayModle(true)
    }
  return (
    <div style={{display:"flex",justifyContent:"space-between",padding:"0px 20px",marginTop:"30px",alignItems:"center"}}>
        <h4>Record Audio</h4>
        {/* <Button style={{border:"1px solid "}} onClick={handleDisplayModle}><Icon style={{marginBottom:"2px",marginLeft:"2px"}} >add</Icon></Button> */}
         <CustomizedDialogs/>
    </div>
  )
}
