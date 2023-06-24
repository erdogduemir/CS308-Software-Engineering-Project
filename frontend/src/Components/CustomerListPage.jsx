import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CUSTOMERS_API_URL } from '../constants/index'


function CustomerListPage() {
    const [post, setPost] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(CUSTOMERS_API_URL).then((response) => {
            setPost(response.data)
        })
    }, [])

    if (!post) return null

    return (
        <div>
            {post.map((p) => (
                <div>
                    <p>Name: {p.name}</p>
                    <p>Surname: {p.surname}</p>
                    <p>Email: {p.email}</p>
                </div>
            ))}

            <button onClick={() => navigate(-1)}>
                Return back
            </button>
        </div>
    )
}

export default CustomerListPage