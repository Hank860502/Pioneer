5.times do
  User.create(username: Faker::Internet.user_name, password: "123", email: Faker::Internet.email)
end

10.times do
  Wishlist.create(user_id: User.all.sample.id, description: Faker::Lorem.sentence)
end

20.times do
  Place.create(name: Faker::University.name, description: Faker::Lorem.sentence, image_url: Faker::Avatar.image, suggested_time: rand(5), price: rand * 100, longitude: rand * 100, latitude: rand * 100)

end

50.times do
  PlacesWishlist.create(place_id: Place.all.sample.id, wishlist_id: Wishlist.all.sample.id, liked: [true, false].sample)
end
