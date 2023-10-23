import React, {useEffect} from 'react';
import { TextField, Button, Box, CardContent, Card, Typography } from '@mui/material';
import Center from './Layout/Center';
import useForm from '../hooks/useForm';
import { TempleHinduOutlined } from '@mui/icons-material';
import { createAPIEndpoint, ENDPOINTS } from '../api';
import useStateContext from '../hooks/useStateContext';
import { useNavigate } from 'react-router-dom';


const getFreshModel = () => ({
        name: "", 
        email: ""
    }
);

const Login = () => {
    const{context, setContext, resetContext} = useStateContext();
    const navigate = useNavigate();
    
    const {values, setValues, errors, setErrors, handleInputChange} = useForm(getFreshModel);
    
    useEffect(() => {
        resetContext()
    },[])
    
    
    
    const Login = e =>{
        e.preventDefault();

        if(validateForm()){
            createAPIEndpoint(ENDPOINTS.participant)
            .post(values)
            .then(res =>{
                setContext({participantId: res.data.participantID})
                navigate('/quiz');     
            })
            .catch(err => console.log(err))
        }
    }

    // form validation 
    const validateForm = () =>{
        let temp = {};
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid.";
        temp.name = values.name !== ""?"":"This field is required.";
        setErrors(temp);

        return Object.values(temp).every( x => x === "");
    }

    return(
       <Center>
        <Card sx={{width:400}}>
            <CardContent sx={{textAlign:'center'}}>
                <Typography variant="h3" sx={{my:3}}>Quiz App</Typography>
                <Box sx ={{
                    '& .MuiTextField-root':{
                        margin:1,
                        width:'90%'
                    }
                    }}>
                    <form noValidate autoComplete="on" onSubmit={Login}>
                        <TextField 
                            label="Email"
                            name="email"
                            value= {values.email}
                            onChange={handleInputChange}
                            variant="outlined"
                            {...(errors.email && {error:true, helperText:errors.email })}
                        />

                        <TextField 
                            label="Name"
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}
                            variant="outlined" 
                            {...(errors.name && {error:true, helperText:errors.name })}
                    />
                        
                    <Button 
                        type="submit"
                        variant="contained"
                        size="large"
                        sx ={{width:'90%'}}
                    >Start</Button>

                    </form>
                </Box>
            </CardContent>
        </Card>
        </Center> 
    )  
}

export default Login;
// https://mui.com/material-ui/react-text-field/
// https://mui.com/material-ui/react-button/
// https://mui.com/material-ui/react-card/