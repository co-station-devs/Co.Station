const ignoredValues = ['date_created', 'date_modified','_id'];
function gen(model, updateFunc) {
  async function list(query, page, limit) {

    // Options setup for the mongoose paginate
    const options = {
      page,
      limit
    };

    // Try Catch the awaited promise to handle the error

    try {
      return await model.paginate(query, options);
    } catch (e) {
      // return a Error message describing the reason
      throw Error('Error while Paginating Users')
    }
  }

  async function create(user) {

    // Creating a new Mongoose Object by using the new keyword
    const newModel = new model(user);
    newModel.date_created = new Date();

    try {
      // Saving the User
      return await newModel.save();

    } catch (e) {

      // return a Error message describing the reason
      throw Error("Error while Creating User")
    }
  }

  async function read(id) {
    // Try Catch the awaited promise to handle the error

    try {
      return await model.findOne({_id: id});
    } catch (e) {
      // return a Error message describing the reason
      throw Error('Error while Paginating Users')
    }
  }

  async function update(user) {
    const id = user._id;
    let oldModel;

    try {
      //Find the old User Object by the Id
      oldModel = await model.findById(id);
    } catch (e) {
      throw Error("Error occured while Finding the User")
    }

    // If no old User Object exists return false
    if (!oldModel) {
      return false;
    }

    let newModel = updateFunc(oldModel, user);

    newModel.date_modified = new Date();

    try {
      return await newModel.save();
    } catch (e) {
      throw Error("And Error occured while updating the User");
    }
  }


  async function del(id) {

    // Delete the User
    try {
      const deleted = await model.remove({_id: id});
      if (deleted.result.n === 0) {
        throw Error("User Could not be deleted")
      }
      return deleted
    } catch (e) {
      throw Error("Error Occured while Deleting the User")
    }
  }

  return {
    list,
    create,
    read,
    update,
    del,
    type : model.modelName
  };
}

module.exports = function (schema) {
  return gen(schema.schemaModel, schema.schemaUpdate)
};
