require 'json'

class MonsterController
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
        path = @req.env['PATH_INFO'].split('/')

        # binding.pry

        if query_hash.key?(:search)
            if !query_hash[:search].nil?
                begin
                    m = Monster.search(query_hash[:search])
                rescue ActiveRecord::RecordNotFound
                    return [
                        405,
                        { 'Content-Type' => 'application/json' },
                        [{ message: 'No Campaign For That Id' }.to_json]
                    ]
                else
                    return 200, { 'Content-Type' => 'application/json' }, [m.to_json]
                end
            end
        end

        begin
            m = Monster.random_20
        rescue ActiveRecord::RecordNotFound
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'No Campaign For That Id' }.to_json]
        else
            return 200, { 'Content-Type' => 'application/json' }, [m.to_json]
        end
    end
end
