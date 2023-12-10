const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/recipeingredients", async (req, res) => {
    const recipes = await db.query(
        "SELECT a.recipeName, b.ingredientName FROM recipe a INNER JOIN IngredientInRecipe c ON a.id = c.recipeId INNER JOIN ingredient b ON b.id = c.ingredientId;"
    );

    const recipeMap = {};

    for (const item of recipes.rows) {
        const { recipename, ingredientname } = item;

        if (!recipeMap[recipename]) {
            recipeMap[recipename] = [];
        }

        recipeMap[recipename].push(ingredientname);
    }

    res.json(recipeMap);
});

module.exports = router;
