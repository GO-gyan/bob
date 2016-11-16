import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {Grid, Row, Col} from 'react-flexbox-grid'
import RaisedButton from 'material-ui/RaisedButton';
import {grey400,cyan50,red500,grey500,grey100,blueGrey100,blueGrey50,teal100} from 'material-ui/styles/colors';


var previous="blank";
var counter=0;
var validExpre=/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      paperStyle:{
      	backgroundColor:blueGrey50,
    	height:window.innerHeight,
    	padding:10,
    	width:"100%"
      }
    };
export default class SendInvite extends React.Component
{
	constructor(props)
	{
		super(props);
		this.handleAdd=this.handleAdd.bind(this);
		this.handleAddClick=this.handleAddClick.bind(this);
		this.state={email:'',addIconState:true,errorMsg:'',chipData:[]}
	}	
	handleAdd(event)
	{	
		this.setState({email:event.target.value})
		if(event.target.value!='')
			this.setState({addIconState:false})
		else
		{
			this.setState({addIconState:true})
			this.setState({errorMsg:''})
		}
	}
	handleRequestDelete = (key) => 
	{
	    this.chipData = this.state.chipData;
	    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
	    this.chipData.splice(chipToDelete, 1);
	    this.setState({chipData: this.chipData});
	    ReactDOM.render(<MuiThemeProvider>
							<div style={styles.wrapper}>
								{this.state.chipData.map(this.renderChip, this)}
							</div>
						</MuiThemeProvider>,document.getElementById('chipArea'));
	};
	renderChip=(data)=> 
	{
	    return (
	  	<Chip
	        key={data.key}
	        onRequestDelete={() => this.handleRequestDelete(data.key)}
	        style={styles.chip}>
	        <Avatar icon={<ActionAccountCircle/>}/>
	        {data.label}
	    </Chip>);
	  };
	handleAddClick()
	{
		var exists=false;
		if(validExpre.test(this.state.email))
	    {	
	    	for(var j=0;j<this.state.chipData.length;j++)
	    	{
	    		if(this.state.chipData[j].label==this.state.email)
	    		{
	    			exists=true;
	    			break;
	    		}
	    	}

	    	if(!exists)
	    	{
	       	this.state.chipData.push({key:counter++,label:this.state.email});
	       	this.setState({errorMsg:''})
	    	ReactDOM.render(<MuiThemeProvider>
		    					<div style={styles.wrapper}>
	        						{this.state.chipData.map(this.renderChip, this)}
	      						</div>
      						</MuiThemeProvider>,document.getElementById('chipArea'));
      		}
      		 else
      		{ 	
      			this.setState({errorMsg:"Email already Entered"});
      		}
	    }
	    else if(!validExpre.test(this.state.email))
	    	this.setState({errorMsg:"Invalid Email Address"})
	    else
	    	this.setState({errorMsg:"Email already Entered"})
	}
	render()
	{	
		return(<Grid>
		<Paper style={styles.paperStyle}>
			<Row center="xs">
			<h2>Invite Team Members</h2>
			</Row>

			<Row center="xs">
			<TextField type="email"
			floatingLabelText="Email Address"
			onChange={this.handleAdd}
			errorText={this.state.errorMsg}/>
			<IconButton tooltip="Add"
				disabled={this.state.addIconState}
				onClick={this.handleAddClick}>
				<ContentAddCircleOutline/>
			</IconButton>
			</Row>

			<Row center="xs">
			<div id="chipArea" style={{marginLeft:90,paddingTop:25,paddingBottom:50}}></div>
			</Row>
			<Row center="xs">
			<RaisedButton 
                          label="Skip"
                          backgroundColor='#D32F2F'
   						style={{marginRight:20}}/>
        
            <RaisedButton 
                          label="Send Invite"
                          backgroundColor='#4CAF50'/>

			</Row>
        </Paper>
				</Grid>);
	}
}