const { validationResult } = require('express-validator');

const db = require('../models');
const Journal = db.Journal;

// ------------ Create Record --------------------------------------
exports.createRecord = async (req, res, next) => {
    const {title,content, categoryId, isPublished, mood, reminder} = req.body;
    const userId = req.auth.userId;
  
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let journal_exists = await Journal.findOne({
      where: {
        title
      }
    });

    if (journal_exists) {
        return res.status(400).json({ code: -1, message: 'Journal with provided title  exists' });
    }


  
    const newJournalCat = new Journal({
        title,
        content,
        userId,
        categoryId,
        isPublished,
        mood,
        reminder
        });

    try {
        await newJournalCat.save();
    } catch {
        err = "Error! Something went wrong while saving record."
        return next(err);
    }



    res.status(201)
        .json({
            success: true,
            data: { ...newJournalCat},
        });
};

// ------------ Read Records --------------------------------------
exports.fetchRecords = async (req, res) => {
  let data = await Journal.findAll();
  console.log(data);
  res.status(200).send({
    message: data,
  });
};

// ------------ Read Record --------------------------------------
exports.fetchRecord = async (req, res) => {
  const id = req.params.id;
  try {
    let record = await Journal.findByPk(id);
    res.status(200).send(record);
  } catch (err) {
    res.status(500).send({
      code: -1,
      message: err.message || 'Error retrieving record with id=' + id,
    });
  }
};

// ------------ Update Record --------------------------------------
exports.updateRecord = async (req, res) => {};

// ------------ Delete Record --------------------------------------
exports.deleteRecord = async (req, res) => {
  const id = req.params.id;
  try {
    let del_record = await Journal.destroy({
      where: {
        id: id,
      },
    });

    let message = ''(del_record == 1)
      ? (message = 'Record was deleted successfully!')
      : (message = `Cannot delete Record with id=${id}. Maybe Record was not found!`);

    res.status(200).json({
      message,
    });
  } catch (err) {
    res.status(500).json({
      code: -1,
      message: err.message || 'Could not delete User with id=' + id,
    });
  }

}

