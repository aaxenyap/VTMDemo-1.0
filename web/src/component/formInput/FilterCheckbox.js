import React, {useState} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

import './style.css'


const FilterCheckbox = (props) =>{

    let checkboxItem = props.data
    const [checkedItem, setCheckedItem] = useState([])

    const checkboxOnchangeHandler = (e) =>{ 

        if(e.target.checked){
            checkedItem.push(e.target.value)
            setCheckedItem(checkedItem)
        }else{
            for( var i = 0; i < checkedItem.length; i++){ 
                if(checkedItem[i] === e.target.value){
                    checkedItem.splice(i, 1)
                    setCheckedItem(checkedItem)
                }
            }
        }
        props.getCheckedItems(checkedItem , props.id)
    }

    const getlabelMapping = (key,val) => {
        const mapcontent ={
            "connectionStatus":{"1":"ONLINE", "0":"OFFLINE"}
        }

        if( typeof mapcontent[key] != "undefined"){
            const result = mapcontent[key]
            return result[val]
        }else{
            return val
        }
    }

    const classes = "checkboxContainer " + props.id

    return(
        <FormControl component="fieldset" className={classes}>

            <FormLabel component="legend">
                <h2>{props.label}</h2>
            </FormLabel>

            <FormGroup aria-label="position" row> 
            {
               checkboxItem.map((item) => {

                   const classes = "checkbox " + item 

                   return(
                    <div>
                        {/* <FormControlLabel
                            className = {classes} 
                            value={item}
                            label= {getlabelMapping(props.id,item)}
                            control={<Checkbox color="primary" />}
                            onChange ={checkboxOnchangeHandler}
                        /> */}

                        <input type="checkbox" name="pasta" id={item} className="checkbox-input" onChange ={checkboxOnchangeHandler} value={item}/>
                        <label for={item} className="checkbox-label">
                        <div class="checkbox-text">
                            <p class="checkbox-text--title">{getlabelMapping(props.id,item)}</p>
                            <p class="checkbox-text--description"></p>
                        </div>
                        </label> 
                    </div>
                   )                
               }) 
            }
            
            </FormGroup>            
        </FormControl>
    )
}

export default FilterCheckbox