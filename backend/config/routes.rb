Rails.application.routes.draw do

  resources :ingredients
  resources :recipe_ingredients
  resources :recipes, only: [:index]
  resources :user_recipes
  resources :users
  get 'courses/:course', to: 'recipes#this_course', as: 'this_course'
  get 'recipes/search/:search', to: 'recipes#search', as: 'search'
  get 'recipes/random', to: 'recipes#random_recipe', as: 'random_recipe'
  get 'recipes/:id', to: 'recipes#this_recipe', as: 'this_recipe'
  get 'recipes/:id/comments', to: 'recipes#comments', as: 'comments'
  get 'recipes/:id/likes', to: 'recipes#likes', as: 'likes'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
