import { Avatar, Container, Grid, TextField, Typography,Paper, Button } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from './style';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {GoogleLogin} from 'react-google-login';
import Input from './Input';
import {useDispatch} from 'react-redux';
import Icon from './icon';
import { useNavigate } from 'react-router-dom';
import{signin,signup} from '../../actions/auth';
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = () => {
    const classes=useStyles();
    const [isSignup,setSignup]=useState(false);
    const history =useNavigate();
    const dispatch=useDispatch();
    const [formData, setFormData] = useState(initialState);
    const [showPassword,setShowPassword]=useState(false);
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        if(isSignup){
            dispatch(signup(formData,history))
        }else{
            dispatch(signin(formData,history))
        }
    };
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    };
    const switchMode=()=>{
        setSignup((prevSignup)=>!prevSignup);
        setShowPassword(false);
    };
    const googleSuccess=async(res)=>{
        
        const result=res.profileObj;
        const token=res.tokenId;
       // console.log(result);
        //console.log(token);
        try{
            dispatch({type:'AUTH',data:{result,token}})
            history('/');
        }catch(error){
            console.log(error);

        }
    };
    const googleFailure=(error)=>{
        console.log(error);
        console.log("Google Sign In was unsucessful.");
    }
    const handleShowPassword=()=> setShowPassword((prevShowPassword)=>!prevShowPassword);
  return (
    <Container component="main" >
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                {isSignup?'Sign Up' :'Sign In'}
            </Typography>
            <form  className={classes.form} onSubmit={handleSubmit}>
             <Grid container spacing={2}>
                 {
                     isSignup && (
                         <>
                         <Input name="firstName" label="First Name"  handleChange={handleChange} autoFocus half />
                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                         </>
                     )
                 }
                 <Input name="email" label="Email Address"   handleChange={handleChange} type="email"/>
                 <Input name="password" label="Password" handleChange={handleChange} type={showPassword?"text":"password"} handleShowPassword={handleShowPassword}/>
                 {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
            
             </Grid> 
             <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
               {isSignup?'Sign Up' : 'Sign In'} 
            </Button>
             <GoogleLogin 
                clientId="215638601163-02n53qsedsjhi7emhf7jqrlvjicmn31d.apps.googleusercontent.com"
                render={(renderProps)=>(
                    <Button className={classes.googleButton} color='primary'fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant="contained">
                        Google Sign In
                    </Button>


                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy="single_host_origin"
             />
           
             </form>
             <Grid container justify="flex-end">
                 <Grid item>
                     <Button onClick={switchMode}>
                         {isSignup ? "Already have an account?Sign In":"Don't have an account? Sign Up"}
                     </Button>
                 </Grid>
             </Grid>
        </Paper>
    </Container>
  )
}

export default Auth