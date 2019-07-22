const express=require('express')
const session=require('express-session')
const {db,Users}=require('./db')
const passport=require('./passport-set')
const app=express()

app.set('view engine','hbs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/',express.static(__dirname+'/public'))

app.use(
    session({
      secret: 'fbdsjfhj fdsfhskud ksdfhsuoi',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
    }),
  )

app.use(passport.initialize())
app.use(passport.session())


app.get('/login/fb', passport.authenticate('facebook'))
app.get('/login/fb/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

app.get('/login/git', passport.authenticate('github'))
app.get('/login/git/callback', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login'
}))

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/login',passport.authenticate('local',{
  successRedirect : '/',
  failureRedirect :'/login'
}))

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup', (req, res) => {
    Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then((user) => {
        console.log(user)
        res.redirect('/login')
      })
      .catch((err) => {
        console.error(err)
        res.redirect('/signup')
      })
  })

app.get('/',checkLoggedIn,(req,res)=>{
    res.send('Welcome Home')
})

function checkLoggedIn(req, res, next) {
    if (req.user) {
      return next()
    }
    res.redirect('/login')
}

db.sync().then(()=>{
    app.listen(4000,()=>{
        console.log('server started at http://localhost:4000')
    })
})
