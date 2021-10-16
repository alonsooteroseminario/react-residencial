import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'

function Reservar() {

    const state = useContext(GlobalState)
    const [token] = state.token

    const [user, setUser] = useState({
        email:'', 
        nombre: '', 
        apellido: '', 
        dni: '', 
        telefono: '', 
        ciudad: '', 
        habitaciones: '',
        fechaIngreso: '',
        horaIngreso: '',
        horaSalida: '',
        formaPago: ''
    })
    const onChangeInput = e =>{
        console.log(e.target)
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }
    const Submit = async e =>{
        e.preventDefault()
        try {
            let res = await axios.post('/api/reservar/enviar', {...user})
            console.log(res)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    useEffect(() => {
        if(token){
            const getUser = async () => {
                const resUser = await axios.get('/user/infor', {
                    headers: {Authorization: token}
                })
                // console.log(resUser.data)
                let nombre = resUser.data.name
                const splitNombre = nombre.split(" ")
                console.log(splitNombre)
                setUser({
                    email: resUser.data.email, 
                    nombre: splitNombre[0], 
                    apellido: splitNombre[1], 
                    dni: '', 
                    telefono: '', 
                    ciudad: '', 
                    habitaciones: '',
                    fechaIngreso: '',
                    horaIngreso: '',
                    horaSalida: '',
                    formaPago: ''
                })
            }
            getUser()
        }
    },[token])

    return (
        <>
            <section id="section-1">
                <div id="book-place">
                    <p><b>Registro de Ingreso</b></p>
                    <div>
                        <p>Estimado Cliente:
                        Contamos con habitaciones triples, matrimoniales, dobles y simples. Todas  cuentan con tv con cable, wifi y baño privado. La limpieza y desinfección es diaria.
                        Para reservar una habitación deberá llenar el siguiente formulario
                        </p>
                        <p>
                            Recordar:
                        </p>

                        <li>
                        1. Ingreso solo con DNI (mayores de 18 años) u otro documento de identidad.
                        </li>
                        <li>
                        2. Usar tapaboca al entrar y salir del edificio
                        </li>
                        <li>
                        3. Si presenta temperatura es más alta al establecido por el gobierno no podrá entrar al recinto.
                        </li>
                        <li>
                        4. La confirmación de la reserva solo estará garantizada con el pago de la misma.
                        </li>
                        <li>
                        5. Si desea estacionamiento deberá consultar su disponibilidad.
                        </li>

                    </div>

                    <form onSubmit={Submit}>
                        
                        <label htmlFor="email">Correo electrónico</label>
                        <input name="email" type="email" 
                        placeholder=" Ingresa tu correo electrónico" value={user.email} onChange={onChangeInput} />
                        
                        <label htmlFor="nombre">Nombres</label>
                        <input name="nombre" type="text" 
                        placeholder=" Nombres" value={user.nombre} onChange={onChangeInput} />
                    
                        <label htmlFor="apellido">Apellidos</label>
                        <input name="apellido" type="text" 
                        placeholder=" Apellidos" value={user.apellido} onChange={onChangeInput} />

                        <label htmlFor="dni">DNI u Pasaporte</label>
                        <input name="dni" type="text" 
                        placeholder=" DNI u Pasaporte" value={user.dni} onChange={onChangeInput} />

                        <label htmlFor="telefono">Teléfono</label>
                        <input name="telefono" type="text" 
                        placeholder=" Teléfono" value={user.telefono} onChange={onChangeInput} />

                        <label htmlFor="ciudad">Ciudad</label>
                        <input name="ciudad" type="text" 
                        placeholder=" Ciudad" value={user.ciudad} onChange={onChangeInput} />
                        
                        <label htmlFor="habitacion">Tipo de Habitación</label>
                        <select name="habitaciones" onChange={onChangeInput} value={user.habitaciones}>
                            <option value=''> </option>
                            <option value="simple-express">SIMPLE EXPRESS</option>
                            <option value="matrimonial">MATRIMONIAL</option>
                            <option value="doble">DOBLE</option>
                            <option value="triple">TRIPLE</option>
                            <option value="cuádruple">CUÁDRUPLE</option>
                        </select>

                        <label htmlFor="start">Fecha de ingreso</label>
                        <input name="fechaIngreso" type="date" id="start" value={user.fechaIngreso} onChange={onChangeInput}  />

                        <label htmlFor="start">Hora de Ingreso</label>
                        <input name="horaIngreso" type="time" value={user.horaIngreso} onChange={onChangeInput} />

                        <label htmlFor="start">Hora de Salida</label>
                        <input name="horaSalida" type="time" value={user.horaSalida} onChange={onChangeInput} />

                        <label htmlFor="forma-pago">Forma de Pago</label>
                        <select name="formaPago" onChange={onChangeInput} value={user.formaPago} >
                            <option value=''> </option>
                            <option value="bcp">BCP</option>
                            <option value="interbank">InterBank</option>
                            <option value="yape">Yape</option>
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tárjeta</option>
                        </select>

                        <p>TENER EN CUENTA
                        </p>              
                        <p>
                        Recordar:
                        </p>              
                        <li>
                        1. Ingreso solo con DNI. ( Mayores de 18 años)
                        </li>
                        <li>
                        2. Usar tapaboca al entrar y salir del Edificio
                        </li>
                        <li>
                        3. Si presenta fiebre no podrá entrar al recinto.
                        </li>
                        <li>
                        4. Enviar voucher de pago al 941590216
                        </li>
                        <li>
                        5. Llamar 10 minutos antes de llegar
                        </li>

                        <input id="submit" type="submit" value="Reservar" />

                    </form>
                </div>
            </section>
        </>
    )
}

export default Reservar
