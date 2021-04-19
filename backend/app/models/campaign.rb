class Campaign < ActiveRecord::Base
    belongs_to :dm
    has_many :characters
    has_many :notes, as: :noteable
end
