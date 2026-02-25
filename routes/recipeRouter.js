const express = require("express")
const router = express.Router()
const Recipe = require("../models/Recipe.js")

const recipeController = require("../controllers/recipeController.js")

router.get("/:id/edit", async (req, res) => {
  const recipe = await Recipe.findById(req.params.id)
  res.render("./recipes/edit.ejs", { recipe })
})
router.post("/", recipeController.createRecipe)
router.get("/", recipeController.getAllRecipes)
router.get("/new", (req, res) => {
  res.render("./recipes/new.ejs")
})
router.get("/:id", recipeController.getRecipeById)
router.put("/:id", recipeController.updateRecipeById)
router.delete("/:id", recipeController.deleteRecipeById)

module.exports = router
