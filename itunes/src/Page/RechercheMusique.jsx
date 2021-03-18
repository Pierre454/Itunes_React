import React, { useState } from 'react'
import * as services from 'apiConsumer/services'
import { Button, TextField } from '@material-ui/core'

const RechercheMusique = () => {
    const [term, setTerm] = useState('')
    const [music, setMusic] = useState([])

    async function fetchMusic(term) {
        try {
            const data = await services.searchMusic(term)

            setMusic(data)
        } catch (e) {
            console.log('error')
        }
    }

    return (
        <div>
            Recherchez un artiste ou un titre:{' '}
            <TextField value={term} onChange={(e) => setTerm(e.target.value)} />{' '}
            <Button
                onClick={() => {
                    fetchMusic(term).then(() => console.log('Fetched'))
                }}
            >
                Search
            </Button>
            {music.map((x) => (
                <div>
                    {x.artistName} {x.collectionName} {x.collectionPrice}${' '}
                    {x.trackName}
                </div>
            ))}
        </div>
    )
}

export default RechercheMusique
