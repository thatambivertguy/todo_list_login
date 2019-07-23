const passport=require('passport')
const LocalStrategy=require('passport-local')
const FacebookStrategy=require('passport-facebook')
const GithubStrategy=require('passport-github')
const GoogleStrategy=require('passport-google-oauth2')
const {Users}=require('./db')

passport.use(
    new FacebookStrategy(
      {
        clientID: 'Facebook_clientId',
        clientSecret: 'Facebook_clientSecret',
        callbackURL: 'http://localhost:4000/login/fb/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Users.create({
        //     username : profile.id,
        //     fbAccessToken: accessToken,
          
        // })
        //   .then((user) => {
        //     console.log(user)
        //     done(null, user)
        //   })
        //   .catch(done)

        Users.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            fbAccessToken: accessToken,
          
        }
        })
          .then((user,created) => {
            done(null, user[0])
          })
          .catch(done)
      },
    ),
  )

  passport.use(
    new GithubStrategy(
      {
        clientID: 'Github_clientId',
        clientSecret: 'Github_clientSecret',
        callbackURL: 'http://localhost:4000/login/git/callback',
      },
      (accessToken, refreshToken, profile, done) => {
         // Users.create({
        //   username: profile.id,
        //   ghAccessToken: accessToken,
        // })
        //   .then((user) => {
        //     done(null, user)
        //   })
        //   .catch(done)
        Users.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            ghAccessToken: accessToken,
          }
        })
          .then((user,created) => {
            done(null, user[0])
          })
          .catch(done)
      },
    ),
  )
  passport.use(
    new GoogleStrategy(
      {
        clientID: 'Google_clientId',
        clientSecret: 'Google_clientSecret',
        callbackURL: 'http://localhost:4000/login/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
         // Users.create({
        //   username: profile.id,
        //   ghAccessToken: accessToken,
        // })
        //   .then((user) => {
        //     done(null, user)
        //   })
        //   .catch(done)
        Users.findOrCreate({where : {username : profile.id},
          defaults :
          {
            username : profile.id,
            gAccessToken: accessToken,
          }
        })
          .then((user,created) => {
            done(null, user[0])
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