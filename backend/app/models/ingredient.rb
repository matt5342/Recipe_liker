class Ingredient < ApplicationRecord
    has_many :recipe_ingredients
    has_many :recipes, through: :recipe_ingredients
    validates :name, uniqueness: {message: "Recipe has already been created"}
end
