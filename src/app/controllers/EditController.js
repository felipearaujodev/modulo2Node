const moment = require('moment')
const { Op } = require('sequelize')
const { Appointment, User } = require('../models')

class EditController {
  async index (req, res) {
    const appointments = await Appointment.findAll({
      include: [{ model: User, as: 'user' }],
      where: {
        provider_id: req.session.user.id,
        date: {
          [Op.between]: [
            moment()
              .startOf('day')
              .format(),
            moment()
              .endOf('day')
              .format()
          ]
        }
      }
    })

    return res.render('editor/edit', { appointments })
  }
}

module.exports = new EditController()
