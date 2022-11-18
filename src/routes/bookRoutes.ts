import { Request, Response } from 'express';
import express from 'express';
import { container } from '../infrastructure/container';
import { BookServise } from '../books/books.servise';
const router = express.Router()
const servise = container.get(BookServise)


router.get('/api/books', async (req: Request, res: Response) => {
    try {
        const books = await servise.findAll()

        res.render("books/index", {
            title: "Книги",
            books: books,
        });
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/api/create/', async (req: Request, res: Response) => {
    try {
        res.render("books/create", {
            title: "Создать книгу",
            book: []
        });
    } catch (e) {
        res.status(500).json(e)
    }

});

router.post('/api/create/', async (req: Request, res: Response) => {
    try {
        const books = await servise.create(req.body)
        res.redirect('/api/books')
    } catch (e) {
        res.status(500).json(e)
    }
})


router.get('/api/books/:id', async (req: Request, res: Response) => {
    const {
        id
    } = req.params

    try {
        const book = await servise.findId(id)
        res.render("books/view", {
            title: "Книга ",
            book: book,
            idBook: id,
        });
    } catch (e) {
        res.status(500).json(e)
    }
})

router.get('/api/book/update/:id', async (req, res) => {
    const {
        id
    } = req.params

    try {
        const book = await servise.findId(id)
        res.render("books/update", {
            title: "Книга ",
            book: book,
            idBook: id,
        });
    } catch (e) {
        res.status(404)
        res.json('404 | страница не найдена')
    }
})



router.post('/api/book/update/:id', async (req, res) => {
    const {
        id
    } = req.params
    try {
        const books = await servise.update(id, req.body)
        res.redirect(`/api/books`);
    } catch (e) {
        res.status(500).json(e)
    }
})

router.post('/api/book/remove/:id', async (req: Request, res: Response) => {
    const {
        id
    } = req.params
    try {
        const books = await servise.delete(id)
        res.redirect(`/api/books`);
    } catch (e) {
        res.status(500).json(e)
    }
})

export default router