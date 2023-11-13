const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController')
const { authenticateToken } = require('../middleware/authMiddleware');


router.post("/newtodo",authenticateToken, todoController.newTodo);
router.get("/alltodos",authenticateToken, todoController.allTodos);
router.get("/alltodos/inprogress",authenticateToken, todoController.inprogress);
router.get("/alltodos/completed",authenticateToken, todoController.completed);
router.put("/updatetodo/:id", authenticateToken,todoController.updateTodo);
router.put("/deletetodo/:id",authenticateToken, todoController.deleteTodo);
router.put("/updatestatus/:id",authenticateToken, todoController.updateTodostatus);
module.exports = router;