import React, {useState, useEffect, useContext} from 'react'
import {GlobalState} from '../../../GlobalState'
import axios from 'axios'

function Config() {

    const state = useContext(GlobalState)
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token
    const [user, setUser] = useState({})

    useEffect( () => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setUser(res.data)
                    console.log(res.data)
                    // setIsLogged(true)
                    // res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                    // setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    const onChangeInput = e =>{
        console.log(e.target)
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const Submit = async e =>{
        e.preventDefault()
        try {
            let res = await axios.patch('/user/config', {...user}, {
                headers: {Authorization: token}
            })
            console.log(res)

            window.location.href = "/";

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <>
            <div className="login-page">
                <form onSubmit={Submit}>

                    <div >
                        <label htmlFor="telefono">Ingresar de Teléfono actual :{user.telefono}</label>
                        <input type="text" name="telefono" id="telefono" required
                        value={user.telefono} onChange={onChangeInput} />
                    </div>

                    <div >
                        <label htmlFor="sheetId">Ingresar número de SheetId : {user.sheetId} </label>
                        <input type="text" name="sheetId" id="sheetId" required
                        value={user.sheetId} onChange={onChangeInput} />
                    </div>

                    <button type="submit">Update</button>
                </form>
            </div>
        </>
    )
}

export default Config
