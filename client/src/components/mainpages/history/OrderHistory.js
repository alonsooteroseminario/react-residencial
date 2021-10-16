import React, {useContext, useEffect} from 'react'
import {GlobalState} from '../../../GlobalState'
import {Link} from 'react-router-dom'
import axios from 'axios'

function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = state.userAPI.history
    const [isAdmin] = state.userAPI.isAdmin
    const [token] = state.token

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                if(isAdmin){
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })

                    setHistory(res.data)
                }else{
                    const res = await axios.get('/user/history', {
                        headers: {Authorization: token}
                    })
                    const resUser = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    let array = res.data

                    let filtroArray = array.filter( elem => elem.email === resUser.data.email)

                    setHistory(filtroArray)
                }
            }
            getHistory()
        }
    },[token, isAdmin, setHistory])

    return (
        <div className="history-page">
            <h2>Historial de Reservas</h2>

            <h4>Tienes {history.length} reservas registradas</h4>

            <table>
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Telefono</th>
                        <th>Ciudad</th>
                        <th>Habitaciones</th>
                        <th>Fecha de Ingreso</th>
                        <th>Hora de Ingreso</th>
                        <th>Hora de Salida</th>
                        <th>Forma de Pago</th>
                        <th>Hora de Registro</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr>

                                <td>{items.email}</td>
                                <td>{items.nombre}</td>
                                <td>{items.apellido}</td>
                                <td>{items.dni}</td>
                                <td>{items.telefono}</td>
                                <td>{items.ciudad}</td>
                                <td>{items.habitaciones}</td>
                                <td>{items.fechaIngreso}</td>
                                <td>{items.horaIngreso}</td>
                                <td>{items.horaSalida}</td>
                                <td>{items.formaPago}</td>
                                <td>{items.horaRegistro}</td>
                                <td><Link to={`/history/${items[0]}`}>View</Link></td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory
