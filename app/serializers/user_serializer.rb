class UserSerializer < ActiveModel::Serializer
  # attributes returned in JSON response
  attributes :id, :email
  has_many :reviews
  has_many :recipes
end
