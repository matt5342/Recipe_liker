class CreateRecipes < ActiveRecord::Migration[6.1]
  def change
    create_table :recipes do |t|
      t.string :picture
      t.string :name
      t.string :duration
      t.string :instructions
      t.string :course
      t.string :cuisine

      t.timestamps
    end
  end
end
