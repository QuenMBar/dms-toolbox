require 'json'

class CharacterController
    def initialize(env)
        @req = Rack::Request.new(env)
        @status = 200
        @headers = { 'Content-Type' => 'application/json' }
    end

    def path
        @req.path
    end

    def patch
        data = JSON.parse @req.body.read
        path = @req.env['PATH_INFO'].split('/')
        if !path[2].nil?
            begin
                char = Character.find(path[2].to_i)
                char.hash_update(data)
            rescue StandardError
                return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Character For That Id' }.to_json]
            else
                return 200, { 'Content-Type' => 'application/json' }, [char.return_everything.to_json]
            end
        end
    end

    def post
        data = JSON.parse @req.body.read
        if !path[2].nil?
            begin
                camp = Campaign.find(data['campaign_id'])
            rescue StandardError
                return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Character For That Id' }.to_json]
            else
                char =
                    Character.create(
                        name: data['name'],
                        klass: data['klass'],
                        race: data['race'],
                        alignment: data['alignment'],
                        language: data['language'],
                        armor_class: data['armor_class'],
                        level: data['level'],
                        strength: data['strength'],
                        dexterity: data['dexterity'],
                        constitution: data['constitution'],
                        intelligence: data['intelligence'],
                        wisdom: data['wisdom'],
                        charisma: data['charisma'],
                        background: data['background'],
                        campaign: camp,
                    )
                return 200, { 'Content-Type' => 'application/json' }, [char.return_everything.to_json]
            end
        end
    end

    def delete
        path = @req.env['PATH_INFO'].split('/')
        if !path[2].nil?
            begin
                char = Character.find(path[2].to_i)
                char.destroy
            rescue StandardError
                return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Character For That Id' }.to_json]
            else
                return 200, { 'Content-Type' => 'application/json' }, [[].to_json]
            end
        end
    end

    def get
        queries = @req.env['QUERY_STRING'].split('&')
        query_hash = {}
        queries.each do |q|
            nq = q.split('=')
            query_hash[nq[0].to_sym] = nq[1]
        end
        path = @req.env['PATH_INFO'].split('/')
        if !path[2].nil?
            begin
                char = Character.find(path[2].to_i)
            rescue ActiveRecord::RecordNotFound
                return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Character For That Id' }.to_json]
            else
                return 200, { 'Content-Type' => 'application/json' }, [char.return_everything.to_json]
            end
        end

        # binding.pry

        begin
            camp = Campaign.find(query_hash[:campId].to_i)
        rescue ActiveRecord::RecordNotFound
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Campaign For That Id' }.to_json]
        else
            return 200, { 'Content-Type' => 'application/json' }, [camp.return_characters.to_json]
        end
    end
end
