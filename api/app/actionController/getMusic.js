const axios = require('axios')
const _ = require('lodash')

const baseURL = 'https://itunes.apple.com/search?'

const formatSearch = async (search) =>
    _.join(_.split(search.replace(/  +/g, ' '), ' '), '+')

const destructureResults = (results) =>
    (({
        artistName,
        collectionName,
        trackName,
        collectionViewUrl,
        primaryGenreName,
        previewUrl,
        trackPrice,
        collectionPrice,
        artworkUrl100,
    }) => ({
        artistName,
        collectionName,
        trackName,
        collectionViewUrl,
        primaryGenreName,
        previewUrl,
        trackPrice,
        collectionPrice,
        artworkUrl100,
    }))(results)

const params = (term) => ({ country: 'fr', media: 'music', term })

module.exports = async (search) => {
    try {
        const { data } = await formatSearch(search).then((x) =>
            axios.get(baseURL, {
                withCredentials: true,
                params: params(search),
            })
        )

        const structuredResult = await _.map(data.results, destructureResults)
        console.log(structuredResult)
        return structuredResult
    } catch (err) {
        console.log(err)
    }
}
