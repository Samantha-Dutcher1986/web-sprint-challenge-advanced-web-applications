import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import axiosWithAuth from '../helpers/axiosWithAuth'

const Login = () => {
    const [user, setUser] = useState({
        login: { username: 'Lambda School', password: 'i<3Lambd4' },
        isLoading: false
    })
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    const history = useHistory()

    const handleChange = (e) => {
        setUser({ login: { ...user.login, [e.target.name]: e.target.value } })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axiosWithAuth()
            .post('http://localhost:3000/api/login', user.login)
            .then((res) => {
                window.localStorage.setItem('token', res.data.payload)
                history.push('/bubblepage')
            })
            .catch((err) => console.error('Login Error', err))
    }
    useEffect(() => {
        axios
            .delete(`http://localhost:3000/api/colors/1`, {
                headers: {
                    authorization:
                        'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98'
                }
            })
            .then((res) => {
                axios
                    .get(`http://localhost:3000/api/colors`, {
                        headers: {
                            authorization: ''
                        }
                    })
                    .then((res) => {
                        console.log(res)
                    })
                console.log(res)
            })
    })

    return (
        <>
            <h1>Welcome to the Bubble App!</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    type="text"
                    placeholder="UserName"
                    onChange={handleChange}
                    value={user.login.username}
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={user.login.password}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default Login

//Task List:

//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.