const Todo= require('../models/todoModel');
const newTodo = async (req, res) => {
    try {
        const userID = req.user._id; 
        const formData = req.body;

        const newTodo = new Todo({
            title: formData.title,
            description: formData.description,
            duedate: formData.duedate,
            priority : formData.priority,
            user: userID
        });

        const todo = await newTodo.save();
        res.json(todo);
        console.log(formData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Failed to create a new todo' });
    }
};



        const allTodos = (req, res) => {
            const userID = req.user._id; 
            Todo.find({ is_delete: false, user:userID})
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                });
        };


        const inprogress = (req, res) => {
            const userID = req.user._id; 
            Todo.find({ is_delete: false,status: false, user:userID})
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                });
        };
        const completed = (req, res) => {
            const userID = req.user._id; 
            Todo.find({ is_delete: false,status: true, user:userID})
                .then((data) => {
                    res.json(data);
                })
                .catch((error) => {
                    errorHandler(error, req, res);
                });
        };
        
        const updateTodo = async (req, res) => {
            try {
                const todoId = req.params.id;
                const updatedTodoData = req.body;
                const userID = req.user._id; 
                const todo = await Todo.findByIdAndUpdate(todoId, updatedTodoData, {is_deleted:false,user:userID });
                
                
                if (!todo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }
                const updatedTodo = await todo.save();
        

                res.json(updatedTodo);
            } catch (error) {
                console.error('Error updating todo:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };


        const deleteTodo = async (req, res) => {
            try {
                const todoId = req.params.id;
                const updatedTodoData = req.body;
                
                const userID = req.user._id; 
                updatedTodoData.is_delete = true;
        
                const todo = await Todo.findByIdAndUpdate(todoId, updatedTodoData, {
                    user: userID,
                });
        
                const updatedTodo = await todo.save();
        
                res.json(updatedTodo);
            } catch (error) {
                res.status(500).json({ error: 'Failed to delete Order' });
            }
        };

        const updateTodostatus = async (req, res) => {
            try {
                const todoId = req.params.id;
                const userID = req.user._id; 
           
                const todo = await Todo.findOne({ _id: todoId, user: userID });
        
                if (!todo) {
                    return res.status(404).json({ error: 'Todo not found' });
                }
        
      
                todo.status = !todo.status;
        
              
                const updatedTodo = await todo.save();
        
                res.json(updatedTodo);
            } catch (error) {
                console.error('Error updating todo:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        };
        

module.exports = {
    newTodo,
    allTodos,
    updateTodo,
    deleteTodo,
    inprogress,
    completed,
    updateTodostatus
};