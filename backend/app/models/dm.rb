class Dm < ActiveRecord::Base
    has_many :campaigns
    has_many :characters, through: :campaigns
end
