import {useState, useEffect} from 'react'
import axios from 'axios'

function UserAPI(token) {
    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])

    useEffect( () => {
        if(token){
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/infor', {
                        headers: {Authorization: token}
                    })

                    setIsLogged(true)
                    res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                    if(res.data.role === 2){
                        setIsAdmin(true)
                    }

                    setCart(res.data.cart)

                } catch (err) {
                    alert(err.response.data.msg)
                }
            }

            getUser()
        }
    }, [token])

    const addCart = async (product) => {
        if(isLogged) return alert('Por favor ingresar como usuario para continuar comprando')

        const check = cart.every( item => {
            return item._id !== product._id
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.patch('/user/addcart', {cart: [...cart, {...product, quantity: 1}] }, {
                headers: {Authorization: token}
            })

        }else {
            alert("Este producto ya fue agregado al carrito.")
        }
    }

    const getUser = async () => {
        try {
            const res = await axios.get('/user/infor', {
                headers: {Authorization: token}
            })

            setIsLogged(true)
            res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
            if(res.data.role === 2){
                setIsAdmin(true)
            }

            setCart(res.data.cart)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return {
        isLogged: [isLogged, setIsLogged],
        isAdmin: [isAdmin, setIsAdmin],
        cart: [cart, setCart],
        addCart: addCart,
        getUser: getUser,
        history: [history, setHistory]
    }
}

export default UserAPI