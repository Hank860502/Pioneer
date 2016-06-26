class CreatePlacesWishlists < ActiveRecord::Migration
  def change
    create_table :places_wishlists do |t|
      t.integer :place_id
      t.integer :wishlist_id
      t.boolean :liked

      t.timestamps null: false
    end
  end
end
