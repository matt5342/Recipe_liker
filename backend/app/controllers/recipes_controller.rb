class RecipesController < ApplicationController
    def index
        @recipes = Recipe.all
        render json: @recipes
    end
    def this_course
        @course = Recipe.all.filter{|r| r.course == params[:course]}
        render json: @course
    end
    def search
        # byebug
        @search_term = Recipe.all.filter{|r| r.name.downcase == params[:search].downcase}
        render json: @search_term
    end
    def random_recipe
        @recipe = Recipe.all[rand(Recipe.all.length - 1)]
        render json: @recipe
    end

end

# def ing_and_amounts
#     Recipe.all.each do |recipe|
#         recipe.ingredients.each do |ing|
#             recipe.ingredients.extract_associated(:recipe_ingredients).each do |rec_ing|
#                 p recipe.name
#                 p ing.name
#                 p rec_ing.amount
#             end
#         end
#     end
# end
# ing_and_amounts