class Monster < ActiveRecord::Base
    def self.random_20
        idCount = self.count
        idStart = self.first.id
        arr = []
        20.times { arr << rand(idStart..(idCount + idStart)) }
        arr.map { |i| self.find(i) }
    end

    def self.search(string)
        self.all.select { |m| m.name.downcase.include? string.downcase }.take(20)
    end
end
