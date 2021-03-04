class RecipesController < ApplicationController
    def index
        @recipes = Recipe.all
        render json: @recipes
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