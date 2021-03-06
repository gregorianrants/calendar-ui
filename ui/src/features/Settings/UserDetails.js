import {
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
    Button, Icon,
    InputAdornment
} from "@material-ui/core";

import {useGetUserQuery} from "../api/apiSlice";
import React from "react";
import {Formik, Field, Form, useFormikContext} from "formik";
import * as yup from 'yup'
import styled from "styled-components";

import {useEditUserMutation} from "../api/apiSlice";
import SaveIcon from '@material-ui/icons/Save';
import EmailIcon from "@material-ui/icons/Email";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from '@material-ui/icons/Lock';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import DnsIcon from '@material-ui/icons/Dns';

const Row = styled.div`
  display: flex;
  width: 500px;
  margin-top: 35px;
`

const Key = styled.p`
  font-family: Roboto;
  margin: 0;
`
const Value = styled.p`
  font-family: Roboto;
  margin: 0;
  font-size: 0.8rem;
  margin-top: 10px;
  color: #757575
`
const IconContainer = styled.div`
  color: #757575
`

const Values = styled.div`
  padding-left: 20px;
  flex: 1 1 auto;
  padding-right: 20px;
`

const IconButtonContainer = styled.div`
  margin-left: auto;
  color: #757575
`


const Context = React.createContext()

function ReadRow() {
    const {values, handleChange, touched, errors, handleSubmit} = useFormikContext()
    const context = React.useContext(Context)

    const {icon, name, label, toggleEdit} = context
    const value = values[name]

    return (
        <Row alignItems={"flex-start"}>
            <IconContainer>
                {icon}
            </IconContainer>
            <Values>
                <Key>{label}</Key>
                <Value>{value}</Value>
            </Values>
            <IconButtonContainer onClick={toggleEdit}>
                <EditIcon fontSize='small'/>
            </IconButtonContainer>
        </Row>
    )
}

function ReadRowPassword() {
    const {values, handleChange, touched, errors, handleSubmit} = useFormikContext()
    const context = React.useContext(Context)

    const {icon, name, label, toggleEdit} = context
    const value = values[name]

    return (
        <Row alignItems={"flex-start"}>
            <IconContainer>
                {icon}
            </IconContainer>
            <Values>
                <Key>{label}</Key>
                <Value>{value ? value.replace(/./ig, '\u2022') : ''}</Value>
            </Values>
            <IconButtonContainer onClick={toggleEdit}>
                <EditIcon fontSize='small'/>
            </IconButtonContainer>
        </Row>
    )
}

function EditRow() {
    const {values, handleChange, touched, errors, handleSubmit} = useFormikContext()
    const context = React.useContext(Context)
    const {icon, name, toggleEdit} = context
    console.log(values)
    return (
        <Row>
            <IconContainer>
                {icon}
            </IconContainer>
            <Values>
                <TextField id={name}
                           name={name}
                           label={name}
                           value={values[name]}
                           onChange={handleChange}
                           error={touched[name] && Boolean(errors[name])}
                           helperText={touched[name] && errors[name]}
                           fullWidth

                />
            </Values>
            <IconButtonContainer onClick={
                (values) => {
                    handleSubmit(values)
                    toggleEdit()
                }
            }>
                <SaveIcon/>
            </IconButtonContainer>
        </Row>
    )
}


function EditRowPassword() {
    const {values, handleChange, touched, errors, handleSubmit} = useFormikContext()
    const context = React.useContext(Context)
    const [showPassword,setShowPassword] = React.useState(false)

    function togglePassword(){
        setShowPassword(val=>!val)
    }

    const {icon, name, label, toggleEdit} = context
    console.log(values)
    return (
        <Row>
            <IconContainer>
                {icon}
            </IconContainer>
            <Values>
                <TextField id={name}
                           name={name}
                           label={label}
                           value={values[name]}
                           onChange={handleChange}
                           error={touched[name] && Boolean(errors[name])}
                           helperText={touched[name] && errors[name]}
                           fullWidth
                           InputProps={
                               {
                                   endAdornment: <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={togglePassword}
                                           onMouseDown={togglePassword}
                                           edge="end"
                                       >
                                           {showPassword ?  <VisibilityIcon /> : <VisibilityOffIcon />}
                                       </IconButton>
                                   </InputAdornment>
                               }
                           }
                           type={showPassword ? 'text' : 'password'}

                />
            </Values>
            <IconButtonContainer onClick={
                (values) => {
                    handleSubmit(values)
                    toggleEdit()
                }
            }>
                <SaveIcon/>
            </IconButtonContainer>
        </Row>
    )
}


function FormRow({value, name, icon, label, children}) {
    const [edit, setEdit] = React.useState(false)

    function toggleEdit() {
        setEdit((val) => !val)
    }

    const contextValue = React.useMemo(() => ({
        toggleEdit,
        name,
        label,
        icon
    }), [toggleEdit, value, icon])

    const childrenArray = React.Children.toArray(children)

    const [EditRow,ReadRow] = React.Children.map(childrenArray, child=>{
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { toggleEdit });
        }
        return child;
    })


    return (
        <Context.Provider value={contextValue}>
            {
                edit
                    ?
                    ReadRow
                    :
                    EditRow
            }
        </Context.Provider>
    )
}

export default function UserDetails() {
    const {data, error, isLoading, isFetching} = useGetUserQuery()
    const [editUser] = useEditUserMutation()

    const validationSchema = yup.object({
        email: yup
            .string('Enter your email')
            .email('Enter a valid email'),
        emailPassword: yup
            .string('Enter your password'),
        companyName: yup
            .string('enter your company name'),
        emailHost: yup
            .string('please provide your email server host name')

    });

    return (
        isLoading
            ?
            <p>loading....</p>
            :
            <Formik
                //TODO are we creating a problem setting to empty string what if we later perform logical test
                initialValues={{
                    email: data?.email || '',
                    emailPassword: data?.emailPassword || '',
                    companyName: data?.companyName || '',
                    companyAddress: data?.companyAddress || '',
                    emailHost: data?.emailHost || ''
                }}
                onSubmit={(user) => {
                    editUser(user)
                }}
                validationSchema={validationSchema}
            >
                <Form>
                    <FormRow
                        icon={<EmailIcon fontSize={"small"}/>}
                        name={'email'}
                        label={'Email'}
                    >
                        <ReadRow/>
                        <EditRow/>
                    </FormRow>
                    <FormRow
                        icon={<BusinessIcon fontSize={"small"}/>}
                        name={'companyName'}
                        label={'Company Name'}
                    >
                        <ReadRow/>
                        <EditRow/>
                    </FormRow>
                    <FormRow
                        icon={<LocationOnIcon fontSize={"small"}/>}
                        name={'companyAddress'}
                        label={'Company Address'}
                    >
                        <ReadRow/>
                        <EditRow/>
                    </FormRow>
                </Form>

            </Formik>

    )


}