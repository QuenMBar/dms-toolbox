class Character < ActiveRecord::Base
    belongs_to :campaign
    has_one :dm, through: :campaign
    has_many :notes, as: :noteable, dependent: :delete_all
    has_many :items, as: :itemable, dependent: :delete_all

    def return_everything
        nc = as_json
        nc['items'] = items.as_json
        nc['notes'] = notes.as_json
        nc
    end

    def hash_update(data)
        raise StandardError.new 'Ids must match' if id != data['id']
        self.name = data['name']
        self.klass = data['klass']
        self.language = data['language']
        self.race = data['race']
        self.alignment = data['alignment']
        self.armor_class = data['armor_class'].to_i
        self.level = data['level'].to_i
        self.strength = data['strength'].to_i
        self.dexterity = data['dexterity'].to_i
        self.constitution = data['constitution'].to_i
        self.intelligence = data['intelligence'].to_i
        self.wisdom = data['wisdom'].to_i
        self.charisma = data['charisma'].to_i
        self.background = data['background']

        # For each item, check the has to see if its id still exists in items.  If not, delete it
        items.each do |i|
            found = false
            data['items'].each { |l| found = true if l['id'] == i.id if l.key?('id') }
            if found == false
                item = Item.find(i.id)
                item.destroy
            end
        end

        notes.each do |i|
            found = false
            data['notes'].each { |l| found = true if l['id'] == i.id if l.key?('id') }
            if found == false
                note = Note.find(i.id)
                note.destroy
            end
        end

        data['items'].each do |i|
            if i.key?('id')
                local_i = items.find(i['id'])
                local_i.name = i['name']
                local_i.description = i['description']
                local_i.save
            else
                Item.create(name: i['name'], description: i['description'], itemable: self)
            end
        end

        data['notes'].each do |n|
            if n.key?('id')
                local_n = notes.find(n['id'])
                local_n.text = n['text']
                local_n.save
            else
                Note.create(text: n['text'], title: 'character', noteable: self)
            end
        end

        save
    end
end
