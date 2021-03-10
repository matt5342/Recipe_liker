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
        i = 0
        if result["meals"]
            result["meals"].each do |meal|

                rec = Recipe.create(
                    picture: meal[i]["strMealThumb"], 
                    name: meal[i]["strMeal"], 
                    duration: rand(300).to_s + " minutes", 
                    instructions: meal[i]["strInstructions"], 
                    course: meal[i]["strCategory"], 
                    cuisine: meal[i]["strArea"]
                )
                if rec
                current_ing_num = 1
                while meal[i]["strIngredient#{current_ing_num}"]
                    ing = Ingredient.create(
                        name: meal[i]["strIngredient#{current_ing_num}"]
                    )
                    RecipeIngredient.create(
                        ingredient_id: ing.id, 
                        recipe_id: rec.id, 
                        amount: meal[i]["strMeasure#{current_ing_num}"]
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
                i += 1
                render json: recipe_arr
            end
        else 
            render json: { message: "No recipes found"}
        end
            # @search_term = Recipe.all.filter{|r| r.name.downcase == params[:search].downcase}
            # render json: @search_term
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
