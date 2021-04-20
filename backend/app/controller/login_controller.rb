require 'json'

class LoginController
    def initialize(env)
        @req = Rack::Request.new(env)
        @status = 200
        @headers = {'Content-Type' => 'application/json'}
    end

    def path
        @req.path
    end

    def get
        user = JSON.parse @req.body.read
        dm = Dm.all.select { |dm| dm.username == user['username'] && dm.password == user['password']}
        return @status, @headers, [dm.to_json]
    end

end
