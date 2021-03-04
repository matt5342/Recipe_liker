# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
RecipeIngredient.destroy_all
UserRecipe.destroy_all
Recipe.destroy_all
Ingredient.destroy_all
User.destroy_all
courses = ["breakfast", "brunch", "lunch", "dinner", "dessert"]

30.times do 
    ing = Ingredient.create(
        name: Faker::Food.ingredient
    )
end
10.times do 
    User.create(
        name: Faker::Internet.username
    )
end
10.times do 
    rec = Recipe.create(
        picture: Faker::File.file_name(dir: 'foo/bar', ext: 'jpg'), 
        name: Faker::Food.dish, 
        duration: rand(300).to_s + " minutes",
        instructions: Faker::Food.description,
        course: courses[rand(4)], 
        cuisine: Faker::Demographic.demonym
    )
    8.times do
        RecipeIngredient.create(
        ingredient_id: Ingredient.all[rand(29)].id, 
        recipe_id: rec.id, 
        amount: Faker::Food.measurement
    )
    end
    UserRecipe.create(
        user_id: User.all[rand(9)].id, 
        recipe_id: rec.id, 
        like: [true, false].sample,
        comment: Faker::Marketing.buzzwords, 
        rating: rand(1..5).to_s + " stars"
    )
end

