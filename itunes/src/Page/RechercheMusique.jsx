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
        <div style={{
            marginTop: 40,
        }}>
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
                <div style={{
                    margin: 50,
                }}>
                <div style={{
                    width: 600,
                    height: 100,
                    display: 'inline-block',
                }}>
                    <img src={x.artworkUrl100}></img>
                    <div> {x.artistName} - {x.collectionName} - {x.trackName} - {x.trackPrice}${' '} </div>
                    <audio
                        controls
                        src={x.previewUrl}>
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>
                </div>
                </div>
            ))}
        </div>
    )
}

export default RechercheMusique
