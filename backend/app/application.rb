require 'pry'

class Application
    def call(env)
        verb = env['REQUEST_METHOD']
        resp = Rack::Response.new
        path = Rack::Request.new(env).path

        # uninitialized constant Application::LoginController
        if path.match(/check_login/)
            log_req = LoginController.new(env)
            return log_req.send(verb.downcase)
        elsif path.match(/dm/)
            dm_req = DmController.new(env)
            return dm_req.send(verb.downcase)
        elsif path.match(/characters/)
            char_req = CharacterController.new(env)
            return char_req.send(verb.downcase)
        elsif path.match(/campaign/)
            camp_req = CampaignController.new(env)
            return camp_req.send(verb.downcase)
        elsif path.match(/note/)
            note_req = NoteController.new(env)
            return note_req.send(verb.downcase)
        elsif path.match(/sign_up/)
            log_req = SignUpController.new(env)
            return log_req.send(verb.downcase)
        elsif path.match(/monster/)
            log_req = MonsterController.new(env)
            return log_req.send(verb.downcase)
        elsif path.match(/npc/)
            log_req = NpcController.new(env)
            return log_req.send(verb.downcase)
        else
            resp.write 'Path Not Found'
            return 405, { 'Content-Type' => 'application/json' }, [{ message: 'Bad Request' }]
        end

        resp.finish
    end
end
