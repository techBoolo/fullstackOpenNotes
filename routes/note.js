import express from 'express'
import * as notesController from '../controllers/note.js'

const router = express.Router()

router.get('/', notesController.index)
router.get('/:id', notesController.show)
router.delete('/:id', notesController.remove)
router.put('/:id', notesController.update)
router.post('/', notesController.create)

export default router
