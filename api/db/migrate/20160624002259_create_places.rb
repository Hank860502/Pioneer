class CreatePlaces < ActiveRecord::Migration
  def change
    create_table :places do |t|
      t.string :name
      t.string :description
      t.string :image_url
      t.float :suggested_time
      t.float :price
      t.float :longitude
      t.float :latitude

      t.timestamps null: false
    end
  end
end
