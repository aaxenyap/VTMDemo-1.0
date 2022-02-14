
import React, { useEffect, useRef, useState } from "react"
import io from "socket.io-client"

import Form from '@View/form/form'
import RoleSelect from '@View/role/roleselect'
import FormSelect from '@View/formGroup/formGroup'
import ReqControl from '@View/clientView/reqControl/reqControl'
import AllowControl from '@View/clientView/allowControl/allowControl'
import ThankYou from '@View/clientView/thankYou/thankYou'
import AgentFlow1 from '@View/agentFlow/agentFlow'

import FormData from '@View/form/formData.json'

import Button from '@mui/material/Button';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Fab from '@mui/material/Fab';
import FaceIcon from '@mui/icons-material/Face';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import CheckIcon from '@mui/icons-material/Check';
import PrintIcon from '@mui/icons-material/Print';
import PdfViewer from '@View/pdfFile/pdfViewer';


import { createTheme , ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

import "./App.css"
// import socket from "socket.io-client/lib/socket"

const theme = createTheme ({
	palette:{
		primary:{
			main:"#333"
		},
		secondary:{
			main:"#db0011"
		},
		
	},
	text:{
		primary:{
			main: "#333333"
		},
		secondary:{
			main:"#ffffff"
		}
	}
})

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	//   marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
	btnControl:{
		position:"fixed!important",
		top:'25%',
		right:10
	},
	btnConfirm:{
		position:"fixed!important",
		top:'35%',
		right:10
	},
	btnPrint:{
		position:"fixed!important",
		top:'45%',
		right:10
	}
  }));

function App() {

	const classes = useStyles();
	var key = Object.keys(FormData)

	const [selectedForm	, setSelectedForm]  = useState(null)
	const [selectedRole	, setSelectedRole]  = useState()
	const [InputReturn	, setInputReturn]   = useState({FormData})
	const [setInput		, setInputBoolean]  = useState(true)
	const [lastArr		, setLastArr]	    = useState([])
	const [ctrlStats, setCtrlStats]			= useState('10')
	const [onCtrl, setOnCtrl]			    = useState(null)

	const socketRef = useRef()

	

	useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4000")
			socketRef.current.on("message",({message}) =>{
				onMessage(message)
			})

			return () => socketRef.current.disconnect()
		},
		[InputReturn]
	)

	const emitMessage =(type,data)=>{
		let dataMessage = {
			"type":type,
			"data":data
		}

		socketRef.current.emit("message", JSON.stringify(dataMessage))
	}
	const onMessage =(str)=>{
		let parseData = JSON.parse(str)
		console.log(parseData)
		switch(parseData.type){
			case 'updateForm' :
				if(JSON.stringify(parseData.data) !=JSON.stringify(lastArr)){
					// if(onCtrl != selectedRole){
					setInputReturn(parseData.data)
				}
			break

			case 'selectForm':
				if (ctrlStats != '12'){
					setCtrlStats('12')
				}
				setSelectedForm(parseData.data)
				setInputReturn({FormData})
			break

			case 'ctrlStats':
				console.log(parseData.data)
				setCtrlStats(parseData.data)
			break
			
			case 'onFocus':
				console.log(document.activeElement.id)
				// document.getElementById(parseData.data).focus();
				if(parseData != null){
					if(parseData.data !== document.activeElement.id){
						var textbox = document.getElementById(parseData.data);
						textbox.scrollIntoView({
							behavior: 'auto',
							block: 'center',
							inline: 'center'
						});
    					textbox.focus();
					}
				}
    			
			break

			case 'onControl':
				setOnCtrl(parseData.data)
				if(parseData.data != selectedRole){
					document.onkeydown = function (e) {return false;}
				}else{
					document.onkeydown = function (e) {return true;}
				}
			break

				
		}
	}

	const updateFormInput = (obj) =>{
		let newArray = {FormData:obj.data}
		let str = JSON.stringify(newArray)
		if(typeof obj.data != "undefined"){
			setInputReturnHandler(newArray)
			if(typeof socketRef.current != "undefined" ){
				emitMessage("updateForm", newArray)
			}
		}		
	}

	const setInputReturnHandler= (arr) =>{

		if (setInput && JSON.stringify(arr) !=JSON.stringify(lastArr)){
			setLastArr(arr)
			setInputReturn(arr)
			setInputBoolean(false)
		}else{
			setInputBoolean(true)
		}
	}

	const assignRole = (role)=>{
			setSelectedRole(role)
	}

	const updateSelectedForm =(obj)=>{
		setSelectedForm(obj)
		emitMessage("selectForm", obj)
		emitMessage("ctrlStats", '12')
		emitMessage("onControl", selectedRole)
	}

	const updateInputFocus =(obj)=>{
		emitMessage("onFocus", obj)
	}

	const onShareScreenHandler =() =>{
		var onControl = "Agent"

		if(onCtrl != "Client"){
			onControl = 'Client'
		}
		emitMessage("onControl", onControl)
		// updateCtrlStats('shareScreen')
	}

	const onDoneFillHandler = () =>{
		updateCtrlStats('doneFill')
	}

	const onConfirmHandler =() =>{
		updateCtrlStats('confirmed')
	}

	const onShowForm =() =>{
		updateCtrlStats('showForm')
	}

	const onViewPDFHandler = () => {
		
	}

	const updateCtrlStats = (stats) => {
		switch(stats){
			case 'shareScreen':
				return emitMessage("ctrlStats", '11')
			break

			case 'showForm':
				return emitMessage("ctrlStats", '12')
			break

			case 'doneFill':
				return emitMessage("ctrlStats", '20')

			break
			case 'confirmed':
				return emitMessage("ctrlStats", '14')

			break
			default:
				return emitMessage("ctrlStats", '10')
			break


		}
	}

	const AppBars =() =>{

		return (
			<div className={classes.root}>
				<AppBar position="static" color="primary">
					<Toolbar>
					{/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton> */}
					<Typography variant="h6" className={classes.title}>
						ReactVTM Demo
					</Typography>
					{/* <Button variant="contained" color="primary">Role</Button> */}
					<RoleSelect getRole={assignRole}/>
					</Toolbar>
				</AppBar>
			</div>
		)

	}

	const AgentFlow = () => {
		
		return (
			<div>
				<FormSelect data = {InputReturn} getSelectedForm ={updateSelectedForm}/>
				<Form data = {InputReturn} form = {selectedForm}  getFilterItems = {updateFormInput} getOnfocus ={updateInputFocus}/>
				<Fab color="primary" aria-label="Control" className ={classes.btnControl} onClick={onShareScreenHandler}>
					{onCtrl == null || onCtrl == selectedRole?<FaceIcon />:<FaceRetouchingOffIcon/>}
				</Fab>
				<Fab color="primary" aria-label="Control" className ={classes.btnConfirm} onClick={onDoneFillHandler}>
					<CheckIcon />
				</Fab>
				<Fab color="primary" aria-label="Control" className ={classes.btnPrint} onClick={onViewPDFHandler}>
					<PrintIcon/>
				</Fab>
				

			</div>
		)
	}

	const ClientConfirm = () =>{
		return (
			<div>
				<Form data = {InputReturn} form = {selectedForm}  getFilterItems = {updateFormInput}/>
				{/* <Button variant="contained" color="primary" onClick={onConfirmHandler}>Confirm</Button> */}
				<Fab color="primary" aria-label="Control" className ={classes.btnConfirm} onClick={onConfirmHandler}>
					<CheckIcon />
				</Fab>
			</div>
		)
	}

	const ClientForm =() =>{
		return(
			<Form data = {InputReturn} form = {selectedForm}  getFilterItems = {updateFormInput} getOnfocus ={updateInputFocus}/>
		)
	}

	const ClientFlow =()=>{

		return(
			<div>
				{/* {ctrlStats == '12'|| ctrlStats == '13'?
					<Fab color="primary" aria-label="Control" className ={classes.btnControl} onClick={onShareScreenHandler}>
						{onCtrl == null || onCtrl == selectedRole?<FaceIcon />:<FaceRetouchingOffIcon/>}
					</Fab>:null
				} */}
				
				{(() => {
                switch(ctrlStats) {
					
					case '10':
						return <ReqControl/>
					break;
					case '11':
						return <AllowControl getCtrlStatus={updateCtrlStats}/>
					break;
					case '12':
						return selectedForm!= null?<ClientForm/>:null
					break;
					case '13':
						return <ClientConfirm/>
					break;
					case '14':
						return <ThankYou/>
					break;
					case '20':
              			return (
						  	<div>
								<PdfViewer data = {InputReturn} />
								<Button  variant="contained" style={{marginLeft: 'auto' }} onClick={onConfirmHandler}>Confirm</Button>
						  	</div>
						)
            		break;
					default:
						return <ReqControl/>
					break;
				}
            })()}

			</div>
			// reqControl? <Form data = {InputReturn} form = {selectedForm}  getFilterItems = {updateFormInput}/>:<ReqControlDisplay/>
		)
	}

	return (
		<ThemeProvider className="cards" theme={theme}>
			<div><AppBars/></div>
			{/* {selectedRole === 'Agent'? <div className={'agent'}><AgentFlow/></div>:null} */}
			{selectedRole === 'Agent'? <div className={'agent'}><AgentFlow1 data ={InputReturn} form = {selectedForm} ctrlStatus = {ctrlStats} getFilterItems = {updateFormInput} getSelectedForm ={updateSelectedForm} getOnfocus ={updateInputFocus} getDoneFill ={onDoneFillHandler} getShowForm={onShowForm}/></div>:null}
			{selectedRole === 'Client'? <div classNAme ={'client'}> <ClientFlow /> </div>:null}
		</ThemeProvider>
	)
}

export default App

