const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')
//const { authenticateToken } = require('../middleware/authMiddleware');


router.post("/newtodo", todoController.newTodo);
router.get("/alltodos", todoController.allTodos);
router.get("/alltodos/inprogress", todoController.inprogress);
router.get("/alltodos/completed", todoController.completed);
router.put("/updatetodo/:id",todoController.updateTodo);
router.put("/deletetodo/:id", todoController.deleteTodo);
router.put("/updatestatus/:id", todoController.updateTodostatus);
module.exports = router;