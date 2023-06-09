// seccion de usuarios
const express = require('express');
const validatorHandler = require('../middleware/validator.handler');
const { getUserSchemas, createUserSchemas, updateUserSchemas } = require('../schemas/user.schema');
const UserService = require('../services/user.service');

const router = express.Router();
const service = new UserService();

router.get('/',
  async (req,res) => {
    const user = await service.find();
    res.json(user);
  });

router.get('/:id',
  validatorHandler(getUserSchemas, 'params'),
  async (req,res, next) => {                                 // este endpoint es para obtener el id en este caso de la url y es dinamico
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchemas, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.json(newUser);
  });

router.patch('/:id',
  validatorHandler(getUserSchemas,'params'),
  validatorHandler(updateUserSchemas,'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id,body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  });

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const rta = await service.delete(id);
  res.json(rta);
});

module.exports = router;
