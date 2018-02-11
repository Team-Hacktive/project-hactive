const router = require('express').Router()
const { Problem, Dialog } = require('../db/models')
module.exports = router

//get all problems
router.get('/', (req, res, next) => {
  Problem.findAll()
  .then(problems => res.json(problems))
  .catch(next)
})

//get a specific problem with associated dialog
router.get('/:problemId', (req, res, next) => {
  Problem.findOne({
    where: {
      id: req.params.problemId
    },
    include: [{model: Dialog, where: {
      problemId: req.params.problemId
    }}]
  })
  .then(problem => res.json(problem))
  .catch(next)
})