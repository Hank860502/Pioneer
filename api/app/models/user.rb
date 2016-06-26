require 'bcrypt'

class User < ActiveRecord::Base
  include BCrypt
  has_many :wishlists

  has_secure_password
end
