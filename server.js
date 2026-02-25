require("dotenv").config({ quiet: true })

const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const session = require("express-session")
const { MongoStore } = require("connect-mongo")
const path = require("path")

const authRouter = require("./routes/authRouter.js")
const userRouter = require("./routes/userRouter.js")
const recipeRouter = require("./routes/recipeRouter.js")

const db = require("./db")

const middleware = require("./middleware")

const PORT = process.env.PORT ? process.env.PORT : 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))
app.use(morgan("dev"))
app.use(methodOverride("_method"))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
)

app.use(middleware.passUserToView)

app.get("/", (req, res) => {
  res.render("index.ejs")
})

app.use("/auth", authRouter)
app.use("/users", userRouter)
app.use("/recipes", recipeRouter)

app.listen(PORT, () => {
  console.log(`🥘 Mongoose Recipes Server is cooking on Port ${PORT}...`)
})
