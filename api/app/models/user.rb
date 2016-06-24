require 'bcrypt'

class User < ActiveRecord::Base
  include Bcrypt
  has_many :wishlists

  has_secure_password
end
