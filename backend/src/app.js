const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./configs/database');
const recipe = require('./models/recipe.model');
const ingredient = require('./models/ingredient.model');
const sub_recipe = require('./models/sub_recipe');
const recipeRouter = require('./routers/recipe.router');
const authRouter = require('./routers/auth.router');
const PORT = process.env.PORT | 3000;

const app = express();



app.use(cors());
app.use(bodyParser.json());
app.use(recipeRouter);
app.use(authRouter);
  db
  // .sync({force: true})
  .sync()
  .then(res =>{
    app.listen(PORT, () =>{
      // console.log(res);
        console.log('app is running ..'+PORT)
    })
  })
  .catch(err => {
      console.log(err);
  });

