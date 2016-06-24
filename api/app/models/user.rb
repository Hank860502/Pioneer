class User < ActiveRecord::Base
  has_many :wishlists

  has_secure_password
end
