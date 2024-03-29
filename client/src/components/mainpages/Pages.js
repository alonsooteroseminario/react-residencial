import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import {GlobalState} from '../../GlobalState'
import DetailProduct from './detailProduct/DetailProduct'
import Login from './auth/Login'
import Register from './auth/Register'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import NotFound from './utils/not_found/NotFound'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import Reservar from './reservar/Reservar'
import Config from './config/Config'
import ConfirmacionReserva from './reservar/confirmacionReserva'


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            {/* <Route path="/" exact component={Products} /> */}
            <Route path="/" exact component={Reservar} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/reservar" exact component={Reservar} />
            <Route path="/confirmacionReserva" exact component={ConfirmacionReserva} />
            <Route path="/configuracion" exact component={Config} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            {/* <Route path="/cart" exact component={Cart} /> */}

            <Route path="*" exact component={NotFound} />
        </Switch>
    )
}

export default Pages