# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'rest-client'
require 'json'
require 'pry'
RecipeIngredient.destroy_all
UserRecipe.destroy_all
Recipe.destroy_all
Ingredient.destroy_all
User.destroy_all
courses = ["breakfast", "brunch", "lunch", "dinner", "dessert"]
10.times do 
    User.create(
        name: Faker::Internet.username
    )
end
def build_seeds
    url = "https://www.themealdb.com/api/json/v1/1/random.php"
    response = RestClient.get(url)
    result = JSON.parse(response)
    rec = Recipe.create(
        picture: result["meals"][0]["strMealThumb"], 
        name: result["meals"][0]["strMeal"], 
        duration: rand(300).to_s + " minutes", 
        instructions: result["meals"][0]["strInstructions"], 
        course: result["meals"][0]["strCategory"], 
        cuisine: result["meals"][0]["strArea"]
    )
    if rec
        current_ing_num = 1
        while result["meals"][0]["strIngredient#{current_ing_num}"]
            if result["meals"][0]["strIngredient#{current_ing_num}"] != ""
                ing = Ingredient.create(
                    name: result["meals"][0]["strIngredient#{current_ing_num}"]
                )
                RecipeIngredient.create(
                    ingredient_id: ing.id, 
                    recipe_id: rec.id, 
                    amount: result["meals"][0]["strMeasure#{current_ing_num}"]
                )
            end
            current_ing_num += 1
        end
        UserRecipe.create(
            user_id: User.all[rand(9)].id, 
            recipe_id: rec.id, 
            like: [true, false].sample,
            comment: Faker::Marketing.buzzwords, 
            rating: rand(1..5).to_s + " stars"
        )
    end
end

30.times do 
    build_seeds
end

# 30.times do 
#     ing = Ingredient.create(
#         name: Faker::Food.ingredient
#     )
# end
# 10.times do 
#     rec = Recipe.create(
#         picture: Faker::File.file_name(dir: 'foo/bar', ext: 'jpg'), 
#         name: Faker::Food.dish, 
#         duration: rand(300).to_s + " minutes",
#         instructions: Faker::Food.description,
#         course: courses[rand(4)], 
#         cuisine: Faker::Demographic.demonym
#     )
#     8.times do
#         RecipeIngredient.create(
#         ingredient_id: Ingredient.all[rand(29)].id, 
#         recipe_id: rec.id, 
#         amount: Faker::Food.measurement
#     )
#     end
# end

