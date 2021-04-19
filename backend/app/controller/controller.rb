require 'json'

class TaskController
    def initialize(env)
        @req = Rack::Request.new(env)
        # binding.pry
    end

    def path
        @req.path
    end
    #C
    def post
        data = JSON.parse @req.body.read
        category = Category.find_by(name: data['category'])
        task = Task.create(text: data['text'], category: category)

        res_task = { id: task.id, text: task.text, category: task.category.name }

        # binding.pry
        return 200, { 'Content-Type' => 'application/json' }, [res_task.to_json]
    end
    #R
    def get
        tasks = Task.all.map { |t| { id: t.id, text: t.text, category: t.category.name } }
        return 200, { 'Content-Type' => 'application/json' }, [{ tasks: tasks }.to_json]
    end

    #U

    # def patch
    # #No updating in this one.
    # end

    #D
    def delete
        id = @req.path.split('/tasks/').last
        Task.find(id).delete
        return 200, { 'Content-Type' => 'application/json' }, [{ message: 'Task deleted!' }.to_json]
    end
end
