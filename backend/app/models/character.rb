class Character < ActiveRecord::Base
    belongs_to :campaign
    has_one :dm, through: :campaign
    has_many :notes, as: :noteable
    has_many :items, as: :itemable
end
