const City = require("../models").City;

const Province = require("../models").Province;

module.exports = {
  list(req, res) {
    return City.findAll({
      include: [
        {
          model: Province,
          as: "provinces",
        },
      ],
    })
      .then((cities) => res.status(200).send(cities))
      .catch((error) => {
        res.status(400).send(error);
      });
  },

  getById(req, res) {
    return City.findById(req.params.id, {
      include: [
        {
          model: Province,
          as: "provinces",
        },
      ],
    })
      .then((city) => {
        if (!city) {
          return res.status(404).send({
            message: "City Not Found",
          });
        }
        return res.status(200).send(city);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return City.create({
      user_id: req.body.user_id,

      city_name: req.body.city_name,
    })
      .then((city) => res.status(201).send(city))
      .catch((error) => res.status(400).send(error));
  },
  addWithProvinces(req, res) {
    return City.create(
      {
        user_id: req.body.user_id,
        city_name: req.body.city_name,
        provinces: req.body.provinces,
      },
      {
        include: [
          {
            model: Province,
            as: "provinces",
          },
        ],
      }
    )
      .then((city) => res.status(201).send(city))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return City.findById(req.params.id, {
      include: [
        {
          model: Province,
          as: "provinces",
        },
      ],
    })
      .then((city) => {
        if (!city) {
          return res.status(404).send({
            message: "City Not Found",
          });
        }
        return city
          .updateAttributes(
            {
              user_id: req.body.user_id || city.user_id,
              prov_name: req.body.prov_name || city.prov_name,
              city_name: req.body.city_name || city.city_name,
              provinces: req.body.provinces || city.provinces,
            },

            {
              include: [
                {
                  model: Province,
                  as: "provinces",
                },
              ],
            }
          )
          .then(() => res.status(200).send(city))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return City.findById(req.params.id)
      .then((city) => {
        if (!city) {
          return res.status(400).send({
            message: "City Not Found",
          });
        }
        return city
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
