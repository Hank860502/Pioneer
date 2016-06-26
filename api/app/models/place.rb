class Place < ActiveRecord::Base
  has_many :places_wishlists
  has_many :wishlists, through: :places_wishlists
end
