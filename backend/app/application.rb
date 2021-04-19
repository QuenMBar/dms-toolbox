require 'pry'

class Application
    def call(env)
        verb = env['REQUEST_METHOD']
        resp = Rack::Response.new
        req = TaskController.new(env)

        if req.path.match(/tasks/)
            return req.send(verb.downcase)
        else
            resp.write 'Path Not Found'
        end

        resp.finish
    end
end
