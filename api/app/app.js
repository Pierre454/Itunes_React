const app = require('../server')
const routes = require('./routes')
const action = require('./actionController')
const middleware = require('./middleware')

app.all(routes.all, middleware.VERIFY_TOKEN)

app.get('/', (req, res) => res.send('Hello world'))
app.post(routes.signup, middleware.CHECK_USERNAME_ON_SIGNUP, action.SIGNUP)
app.post(routes.signin, middleware.CHECK_USERNAME_ON_SIGN_IN, action.SIGNIN)

app.get('/userActionRoute', (req, res) => res.send('You are logged in'))

app.get('/music/:term', async (req, res) => {
    res.json(await action.GET_MUSIC(req.params.term))
})
