class Recipe < ApplicationRecord
    has_many :user_recipes
    has_many :users, through: :user_recipes
    has_many :recipe_ingredients
    has_many :ingredients, through: :recipe_ingredients
    validates :name, uniqueness: {message: "Recipe has already been created"}
end
