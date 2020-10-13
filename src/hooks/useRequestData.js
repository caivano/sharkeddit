import { useEffect, useState } from 'react'
import axios from 'axios'
import { baseURL } from '../constants/urls'

const useRequestData = (initialData, endpoint) => {
  const [data, setData] = useState(initialData)

  useEffect(() => {
    requestData()
  }, [])

  const requestData = () => {
    axios.get(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
      .then((response) => {
        setData(response.data.posts)
      })
      .catch((error) => {
        console.log(error)
        alert('Ocorreu um erro, tente novamente')
      })
  }
  return data
}

export default useRequestData
