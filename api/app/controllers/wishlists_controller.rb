class WishlistsController < ApplicationController
  def index
  end

  def show
    user = User.find(params[:user_id])
    wishlist = Wishlist.find(params[:wishlist_id])
    places = wishlist.places

    # render json:
  end
end
