import express from 'express'
import * as notesController from '../controllers/note.js'
import authenticate from '../middlewares/authenticate.js'

const router = express.Router()

router.get('/', notesController.index)
router.get('/:id', notesController.show)
router.delete('/:id', notesController.remove)
router.put('/:id', notesController.update)
router.post('/', authenticate, notesController.create)

export default router
