class PlacesWishlist < ActiveRecord::Base
  belongs_to :wishlist
  belongs_to :place
end
