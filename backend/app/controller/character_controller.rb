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

    def get
        queries = @req.env['QUERY_STRING'].split('&')
        query_hash = {}
        queries.each do |q|
            nq = q.split('=')
            query_hash[nq[0].to_sym] = nq[1]
        end

        begin
            camp = Campaign.find(query_hash[:campId].to_i)
        rescue ActiveRecord::RecordNotFound
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Campaign For That Id' }.to_json]
        else
            return 200, { 'Content-Type' => 'application/json' }, [camp.return_characters.to_json]
        end
    end
end
