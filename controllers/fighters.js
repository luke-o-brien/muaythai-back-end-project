const Fighter = require('../models/fighters.js')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const createdFighter = await Fighter.create(req.body);
        res.status(201).json(createdFighter);
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
});

router.get('/', async (req, res) => {
    try {
        const foundFighters = await Fighter.find();
        res.status(200).json(foundFighters);  
      } catch (err) {
        res.status(500).json({ err: err.message })
      }
  });

  router.get('/:fighterId', async (req, res) => {
    try {
      const foundFighter = await Fighter.findById(req.params.fighterId);
      if (!foundFighter) {
        res.status(404);
        throw new Error('Fighter not found.');
      }
      res.status(200).json(foundFighter);
    } catch (err) {
      if (res.statusCode === 404) {
        res.json({ err: err.message });
      } else {
        res.status(500).json({ err: err.message });
      }
    }
  });

  router.delete('/:fighterId', async (req, res) => {
    try {
      const deletedFighter = await Fighter.findByIdAndDelete(req.params.fighterId)

      if (!deletedFighter) {
        res.status(404)
        throw new Error('Fighter not found')
      }
      res.status(200).json(deletedFighter)
    } catch (err) {
      if (res.statusCode === 404) {
        res.json({ err: err.message })
      } else {
        res.status(500).json({err: err.message})
      }
    }
  });


module.exports = router;

