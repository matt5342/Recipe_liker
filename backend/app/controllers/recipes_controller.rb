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
        @search_term = Recipe.all.filter{|r| r.name.downcase == params[:search].downcase}
        render json: @search_term
    end
    def random_recipe
        @recipe = Recipe.all[rand(Recipe.all.length - 1)]
        render json: @recipe
    end

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
