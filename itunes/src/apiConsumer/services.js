import axios from './axios'
import * as routes from './routes'

export const signIn = (data) =>
    axios.post(routes.SIGN_IN, data).then((r) => {
        localStorage.setItem('token', r.data.token)
        return r
    })

export const signUp = (data) => axios.post(routes.SIGN_UP, data)

export const searchMusic = async (term) => {
    const { data } = await axios.get(routes.SEARCH_MUSIC(term))

    return data
}
