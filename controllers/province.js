const Province = require("../models").Province;
const City = require("../models").City;
const User = require("../models").User;

module.exports = {
  list(req, res) {
    return Province.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: City,
          as: "city",
        },
      ],
    })
      .then((provinces) => res.status(200).send(provinces))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return Province.findById(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: City,
          as: "city",
        },
      ],
    })
      .then((province) => {
        if (!province) {
          return res.status(404).send({
            message: "Province Not Found",
          });
        }
        return res.status(200).send(province);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Province.create({
      city_id: req.body.city_id,
      user_id: req.body.user_id,
      prov_name: req.body.prov_name,
    })
      .then((province) => res.status(201).send(province))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Province.findById(req.params.id, {
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: City,
          as: "city",
        },
      ],
    })
      .then((province) => {
        if (!province) {
          return res.status(404).send({
            message: "Province Not Found",
          });
        }
        return province
          .update({
            prov_name: req.body.prov_name || city.prov_name,
          })
          .then(() => res.status(200).send(province))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Province.findById(req.params.id)
      .then((province) => {
        if (!province) {
          return res.status(400).send({
            message: "Province Not Found",
          });
        }
        return province
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
