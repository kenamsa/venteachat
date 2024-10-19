const Part = require("../model/part.model.js");

// Créer et sauvegarder une nouvelle pièce
exports.create = (req, res) => {
  // Valider la requête
  if (!req.body.title || !req.body.description || !req.body.brand || 
      !req.body.model || !req.body.condition || !req.body.price || 
      !req.body.location) {
    return res.status(400).send({
      message: "Le contenu de la pièce ne peut pas être vide.",
    });
  }

  // Créer une nouvelle pièce
  const part = new Part({
    title: req.body.title,
    description: req.body.description,
    brand: req.body.brand,
    model: req.body.model,
    condition: req.body.condition,
    price: req.body.price,
    location: req.body.location,
    createdAt: new Date(), // Date de création
  });

  // Sauvegarder la pièce dans la base de données
  part
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de la création de la pièce.",
      });
    });
};

// Récupérer toutes les pièces de la base de données
exports.findAll = (req, res) => {
  Part.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Une erreur est survenue lors de la récupération des pièces.",
      });
    });
};

// Récupérer une pièce spécifique par ID
exports.findOne = (req, res) => {
  Part.findById(req.params.partId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Pièce non trouvée avec l'ID " + req.params.partId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Pièce non trouvée avec l'ID " + req.params.partId,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la récupération de la pièce avec l'ID " + req.params.partId,
      });
    });
};

// Mettre à jour une pièce par ID
exports.update = (req, res) => {
  // Valider la requête
  if (!req.body.title || !req.body.description || !req.body.brand || 
      !req.body.model || !req.body.condition || !req.body.price || 
      !req.body.location) {
    return res.status(400).send({
      message: "Le contenu à mettre à jour ne peut pas être vide.",
    });
  }

  // Trouver et mettre à jour la pièce
  Part.findByIdAndUpdate(
    req.params.partId,
    {
      title: req.body.title,
      description: req.body.description,
      brand: req.body.brand,
      model: req.body.model,
      condition: req.body.condition,
      price: req.body.price,
      location: req.body.location,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Pièce non trouvée avec l'ID " + req.params.partId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Pièce non trouvée avec l'ID " + req.params.partId,
        });
      }
      return res.status(500).send({
        message: "Erreur lors de la mise à jour de la pièce avec l'ID " + req.params.partId,
      });
    });
};

// Supprimer une pièce par ID
exports.delete = (req, res) => {
  Part.findByIdAndDelete(req.params.partId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Pièce non trouvée avec l'ID " + req.params.partId,
        });
      }
      res.send({ message: "Pièce supprimée avec succès!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Pièce non trouvée avec l'ID " + req.params.partId,
        });
      }
      return res.status(500).send({
        message: "Impossible de supprimer la pièce avec l'ID " + req.params.partId,
      });
    });
};
