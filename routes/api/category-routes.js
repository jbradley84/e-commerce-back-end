const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET all Categories including associated Products
router.get('/', (req, res) => {
   Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
         model: Product,
         attributes: [
            'id',
            'product_name',
            'price',
            'stock',
            'category_id'
         ]
      }]
   })
   .then(dbCategoryData => res.json(dbCategoryData))
   .catch(err => {
      console.log(err);
      res.status(500).json(err);
   });
});

// GET single Category by `id` value including associated Products
router.get('/:id', (req, res) => {
  Category.findOne({
   where: {
      id: req.params.id
   },
   attributes: ['id', 'category_name'],
   include: [{
      model: Product,
      attributes: [
         'id', 'product_name', 'price', 'stock', 'category_id'
      ]
   }]
  })
  .then(dbCategoryData => {
   if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
   }
   res.json(dbCategoryData);
  })
  .catch(err => {
   console.log(err);
   res.status(500).json(err);
  });
});

// POST (create) a new category
router.post('/', (req, res) => {
  Category.create({
   category_name: req.body.category_name
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
   console.log(err);
   res.status(500).json(err);
  });
});

// PUT (update) a single category by `id`
router.put('/:id', (req, res) => {
  Category.update(req.body, {
   where: {
      id: req.params.id
   }
  })
  .then(dbCategoryData => {
   if(!dbCategoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
   }
   res.json(dbCategoryData);
  })
  .catch(err => {
   console.log(err);
   res.status(500).json(err);
  });
});

// DELETE a single category by `id`
router.delete('/:id', (req, res) => {
  Category.destroy({
   where: {
      id: req.params.id
   }
  })
  .then(dbCategoryData => {
   if(!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
   }
   res.json(dbCategoryData);
  })
  .catch(err => {
   console.log(err);
   res.status(500).json(err);
  });
});

module.exports = router;
