function gen(service) {


  return {
    list: list,
    create,
    read,
    update,
    del
  };
}


module.exports = function (service) {
  return {
    list: async function (req, res, next) {

      // Check the existence of the query parameters, If the exists doesn't exists assign a default value

      const page = req.query.page ? req.query.page : 1;
      const limit = req.query.limit ? req.query.limit : 10;

      try {

        const items = await service.list({}, page, limit);

        // Return the list with the appropriate HTTP Status Code and Message.

        return res.status(200).json({status: 200, data: items, message: `Succesfully ${service.type}s Recieved`});

      } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: e.message});

      }
    },

    create: async function (req, res, next) {

      // Req.Body contains the form submit values.
      try {

        // Calling the Service function with the new object from the Request Body
        const createdModel = await service.create(req.body);
        return res.status(201).json({status: 201, data: createdModel, message: `Succesfully Created ${service.type}`})
      } catch (e) {

        //Return an Error Response Message with Code and the Error Message.

        return res.status(400).json({status: 400, message: `${service.type} Creation was Unsuccesfull`})
      }
    },

    read: async function (req, res, next) {

      const id = req.params.id;

      try {
        const item = await service.read(id);
        return res.status(200).json({status: 200, data: item, message: `Succesfully ${service.type} Recieved`})
      } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
      }
    },

    update: async function (req, res, next) {

      // Id is necessary for the update

      if (!req.body._id) {
        return res.status(400).json({status: 400., message: "Id must be present"})
      }

      const id = req.body._id;

      try {
        const updatedUser = await service.update(req.body);
        return res.status(200).json({status: 200, data: updatedUser, message: `Succesfully Updated ${service.type}`})
      } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
      }


    },
    del: async function(req, res, next) {
      const id = req.params.id;

      try {
        const deleted = await service.delete(id);
        return res.status(204).json({status: 204, message: `Succesfully ${service.type} Deleted`})
      } catch (e) {
        return res.status(400).json({status: 400, message: e.message})
      }
    }
  }
};
