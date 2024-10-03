"use client"
import data from '@/Angele/data.json'
import { useState, useEffect } from "react"
export default function Testing(){
    const [lista, setLista] = useState([])
    const [search, setSearch] = useState()

    useEffect(()=>{
        setLista(data)
    },[])

    const handleInput = (e) =>{
        setSearch(e.target.value)
    }

    const filteredList = search ? lista.filter((item) => item.name.toLowerCase().startsWith(search.toLowerCase())): lista

    return(
        <main>
            {lista.length > 3 && <input onInput={handleInput} type="search" placeholder="search"/>}
            
            {filteredList.map((item) => (<li key={item.name}>{item.name}</li>))}
        </main>
       
    )
}