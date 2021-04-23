require 'json'

class NpcController
    def initialize(env)
        @req = Rack::Request.new(env)
        @status = 200
        @headers = { 'Content-Type' => 'application/json' }
    end

    def path
        @req.path
    end

    def get
        path = @req.env['PATH_INFO'].split('/')
        puts path[2]
        begin
            camp = Campaign.find(path[2])
        rescue ActiveRecord::RecordNotFound
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Campaign For That Id' }.to_json]
        else
            return 200, { 'Content-Type' => 'application/json' }, [camp.return_npcs.to_json]
        end
    end

    def post
        data = JSON.parse @req.body.read
        begin
            camp = Campaign.find(data['campaign_id'])
        rescue StandardError
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Character For That Id' }.to_json]
        else
            npc =
                Npc.create(
                    name: data['name'],
                    appearance: data['appearance'],
                    best_ability: data['best_ability'],
                    worst_ability: data['worst_ability'],
                    talent: data['talent'],
                    ideal: data['ideal'],
                    mannerism: data['mannerism'],
                    trait: data['trait'],
                    bond: data['bond'],
                    flaw: data['flaw'],
                    campaign: camp,
                )
            data['items'].each { |i| Item.create(name: i['name'], description: i['description'], itemable: npc) }
            npc = Npc.find(npc.id)
            return 200, { 'Content-Type' => 'application/json' }, [npc.return_everything.to_json]
        end
    end

    def delete
        path = @req.env['PATH_INFO'].split('/')

        begin
            npc = Npc.find(path[2])
            npc.destroy
        rescue ActiveRecord::RecordNotFound
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Campaign For That Id' }.to_json]
        else
            return 200, { 'Content-Type' => 'application/json' }, [[].to_json]
        end
    end
end
