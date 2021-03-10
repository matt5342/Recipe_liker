require 'faker'
require 'rest-client'
require 'json'
class RecipesController < ApplicationController
    def index
        @recipes = Recipe.all
        all_recs = []
        @recipes.each {|r| all_recs.push(build_recipe(r))}
        render json: all_recs
    end
    def this_course
        @course = Recipe.all.filter{|r| r.course == params[:course]}
        render json: @course
    end
    def this_recipe
        @recipe = Recipe.all.find{|r| r.id == params[:id].to_i}
        render json: build_recipe(@recipe)
    end
    def search
        url = "https://www.themealdb.com/api/json/v1/1/search.php?s=#{params[:search]}"
        response = RestClient.get(url)
        result = JSON.parse(response)
        recipe_arr = []
        if result["meals"]
            result["meals"].each do |meal|
                # byebug
                rec = Recipe.create(
                    picture: meal["strMealThumb"], 
                    name: meal["strMeal"], 
                    duration: rand(300).to_s + " minutes", 
                    instructions: meal["strInstructions"], 
                    course: meal["strCategory"], 
                    cuisine: meal["strArea"]
                )
                if rec
                    current_ing_num = 1
                    while meal["strIngredient#{current_ing_num}"]
                        ing = Ingredient.create(
                            name: meal["strIngredient#{current_ing_num}"]
                        )
                        RecipeIngredient.create(
                            ingredient_id: ing.id, 
                            recipe_id: rec.id, 
                            amount: meal["strMeasure#{current_ing_num}"]
                        )
                        current_ing_num += 1
                    end
                    UserRecipe.create(
                        user_id: User.all[rand(9)].id, 
                        recipe_id: rec.id, 
                        like: [true, false].sample,
                        comment: Faker::Marketing.buzzwords, 
                        rating: rand(1..5).to_s + " stars"
                    )
                    recipe_arr.push(build_recipe(rec))
                end
            end
            render json: recipe_arr
        else 
            render json: { message: "No recipes found"}
        end
    end
    
    def random_recipe
        @recipe = Recipe.all[rand(Recipe.all.length - 1)]
        render json: @recipe
    end

    def build_recipe(recipe)
        ingredients_with_amounts = []
        recipe.ingredients.each do |ingredient|
            current_amount = ingredient.recipe_ingredients.find{|ri| ri.recipe_id == recipe.id}.amount
            new_obj = {
                ingredient_id: ingredient.id, 
                ingredient_name: ingredient.name, 
                amount: current_amount
            }
            ingredients_with_amounts.push(new_obj)
        end
        whole_obj = {
            recipe_id: recipe.id,
            picture: recipe.picture, 
            name:recipe.name, 
            duration: recipe.duration, 
            instructions: recipe.instructions, 
            course: recipe.course, 
            cuisine: recipe.cuisine, 
            ingredients: ingredients_with_amounts
        }
    end
end
