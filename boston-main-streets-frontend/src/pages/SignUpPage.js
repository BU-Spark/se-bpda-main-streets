import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import UserForm from "../components/UserForm";
import { createUser } from "../reducers/userReducer";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TopBar from "../components/TopBar";

const SignUpPage = () => {

    // ref
    const userFormRef = useRef()

    // router
    const history = useHistory()

    // redux
    const dispatch = useDispatch()

    // handle sign up
    const handleSignUp = (event) => {
        event.preventDefault()
        const email = userFormRef.current.email
        const password = userFormRef.current.password
        dispatch(createUser(email, password))
    }

    return (
        <>
        <TopBar/>
        <div style={{ maxWidth : 400, marginLeft : 'auto', marginRight : 'auto', marginTop : '10%', textAlign : 'center' }}>
            <h3>Sign Up</h3>
            <UserForm handleSubmit={handleSignUp} ref={userFormRef}>
                <Button variant="primary" type="submit">Sign Up</Button>
                <br/> or <br/>
                <Button variant="secondary" onClick={() => history.push("/")}>Back to Map</Button>
            </UserForm>
        </div>
        </>
    )
}

export default SignUpPage