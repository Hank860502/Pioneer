class Wishlist < ActiveRecord::Base
  belongs_to :user
  has_many :places_wishlists
  has_many :places, through: :places_wishlists

end
