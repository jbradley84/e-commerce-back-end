const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// GET all Tags including associated Product data
router.get('/', (req, res) => {
   Tag.findAll({
      attributes: ['id', 'tag_name'],
      include: [
         {
            model: Product,
            attributes: [
               'id',
               'product_name',
               'price',
               'stock',
               'category_id'
            ]
         }
      ]
   })
      .then(dbTagData => res.json(dbTagData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// GET a single Tag by `id` inclucing associated Product data
router.get('/:id', (req, res) => {
   Tag.findOne({
      where: {
         id: req.params.id
      },
      attributes: ['id', 'tag_name'],
      include: [
         {
            model: Product,
            attributes: [
               'id',
               'product_name',
               'price',
               'stock',
               'category_id'
            ]
         }
      ]
   })
      .then(dbTagData => {
         if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
         }
         res.json(dbTagData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// POST (create) a new category
router.post('/', (req, res) => {
   Tag.create({
      tag_name: req.body.tag_name
   })
      .then(dbTagData => res.json(dbTagData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// PUT (update) a single Tag by `id`
router.put('/:id', (req, res) => {
   Tag.update(req.body, {
      where: {
         id: req.params.id
      }
   })
      .then(dbTagData => {
         if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
         }
         res.json(dbTagData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

// DELETE a single Tag by `id`
router.delete('/:id', (req, res) => {
   Tag.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbTagData => {
         if (!dbTagData) {
            res.status(404).json({ message: 'No tag found with this id!' });
            return;
         }
         res.json(dbTagData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;
