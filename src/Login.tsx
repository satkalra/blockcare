import * as React from 'react';
import "./styles/login.css";
import { useNavigate } from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'

export default function Login(){
    const [input, setInput] = React.useState('')

    React.useEffect(()=>{
        const username = localStorage.getItem("username");
        if(username){
            navigate('/home')
        }
    })

    const navigate = useNavigate();
    const handleChange = (e: string) => {
        setInput(e)
      }


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        localStorage.setItem('username',input)
        navigate('/home')
      }

    return (
        <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              name='ActivationDate'
              className='form-control'
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => handleChange(e.target.value)}
              placeholder='Enter your username'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
    )
}