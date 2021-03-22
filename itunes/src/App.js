import { useState, useEffect } from 'react'
import * as services from 'apiConsumer/services'
import { TextField } from '@material-ui/core'
import RechercheMusique from './Page/RechercheMusique'

function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState(localStorage.getItem('token') !== undefined)

    const handleClick = async () => {
        try {
            const response = await services
                .signIn({
                    username: username,
                    password: password,
                })
                .then((x) => !!x.data.message && setIsLogged(true))
        } catch (e) {
            console.log('wrong login')
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                marginLeft: 300,
                left: 0,
                right: 0,
                bottom: 0,
                margin: 'auto',
            }}
        >
            <div style={{
                    display: 'inline-block',
                    marginRight: 5,
                }}>
                <TextField
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    type="text"
                />
            </div>
            <div style={{
                    display: 'inline-block',
                    marginRight: 5,
                }}>
                <TextField
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value)
                    }}
                    type="text"
                />
            </div>
            <button
                style={{
                    width: 100,
                    height: 30,
                    marginTop: 5,
                    marginRight: 5,
                    backgroundColor: '#555555',
                    color: '#FFFFFF',
                    display: 'inline-block',
                }}
                onClick={handleLogOut}
            >
                Déconnexion
            </button>
            <button
                style={{
                    width: 100,
                    height: 30,
                    marginTop: 5,
                    display: 'inline-block',
                }}
                onClick={handleClick}
            >
                Connexion
            </button>
            {isLogged ? <RechercheMusique /> : <div>You need to be logged</div>}
        </div>
    )
}

function handleLogOut() {
    localStorage.setItem('token', undefined)
    localStorage.clear()
    window.location.reload()
}

export default App
