import md5 from "md5"
import { useState, useEffect } from "react"
import {Navigate} from 'react-router-dom'

const MisOfertas = () => {
    const [nombre,setNombre] = useState('')
    const [goLogin,setGoLogin] = useState(false)

    
    const loadData = async () =>{
        try{
            const {email, username,id,company} = await JSON.parse(localStorage.getItem('user'))
            const idSession = localStorage.getItem('idSession')

            setNombre(company)
            if(idSession!==md5(id+email+username)){
                localStorage.clear()
                setGoLogin(true)
            }
        }catch(err){
            setGoLogin(true)
            localStorage.clear()
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    if(goLogin){
        return <Navigate to="/login"/>
    }

  return (
    <>
    <p>{nombre}</p>
    <strong></strong>
    </>
  )
}

export default MisOfertas