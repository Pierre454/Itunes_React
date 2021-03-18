import { useState, useEffect } from 'react'
import * as services from 'apiConsumer/services'
import { TextField } from '@material-ui/core'
import RechercheMusique from './Page/RechercheMusique'

function App() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLogged, setIsLogged] = useState()

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
            <div>
                <TextField
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value)
                    }}
                    type="text"
                />
            </div>
            <div>
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
                    width: 200,
                    height: 200,
                }}
                onClick={handleClick}
            >
                Click here and check the developer console.
            </button>
            {isLogged ? <RechercheMusique /> : <div>You need to be logged</div>}
        </div>
    )
}

export default App
