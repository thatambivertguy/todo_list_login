const passport=require('passport')
const LocalStrategy=require('passport-local')
const FacebookStrategy=require('passport-facebook')
const GithubStrategy=require('passport-github')
const {Users}=require('./db')

passport.use(
    new FacebookStrategy(
      {
        clientID: '208166746792404',
        clientSecret: 'ef289776a5abd12f2508ba0479c0df11',
        callbackURL: 'http://localhost:4000/login/fb/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        Users.create({
            username : profile.id,
            fbAccessToken: accessToken,
          
        })
          .then((user) => {
            done(null, user)
          })
          .catch(done)
      },
    ),
  )

  passport.use(
    new GithubStrategy(
      {
        clientID: 'Iv1.cf53b0bbcf6b224e',
        clientSecret: '92954f5f4aee178443d878c620783d35cde1ca39',
        callbackURL: 'http://localhost:4000/login/git/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        Users.create({
          username: profile.id,
          ghAccessToken: accessToken,
        })
          .then((user) => {
            done(null, user)
          })
          .catch(done)
      },
    ),
  )
 
  passport.use(
    new LocalStrategy((username,password,done)=>{
      Users.findOne({
        where:{username}
      }).then((user)=>{
         if(!user){
           return done(new Error(`invalid`))
         }
         if(user.password!=password){
           return done(null,false)
         }
         return done(null,user)
      }).catch(done)
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((userId, done) => {
    Users.findOne({
      where: {
        id: userId,
      }
    })
      .then((user) => done(null, user))
      .catch(done)
  })
  module.exports=passport