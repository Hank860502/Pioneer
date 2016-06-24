class WishlistsController < ApplicationController
  def index
  end

  def show
    user = User.find(params[:user_id])
    wishlist = Wishlist.find(params[:id])
    liked_places_ids = wishlist.places_wishlists.where(liked: true).pluck(:place_id)
    liked_places = Place.find(liked_places_ids)
    render json: liked_places.to_json
  end
end
