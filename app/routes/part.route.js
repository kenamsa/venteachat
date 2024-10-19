module.exports = (app) => {
  const partController = require("../controllers/part.controllers.js");

  app.post("/create", partController.create);

  app.get("/get-all", partController.findAll);

  app.get("/message/:messageId", partController.findOne);

  app.put("/message/:messageId", partController.update);

  app.delete("/message/:messageId", partController.delete);
};
