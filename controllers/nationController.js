const Nations = require("../models/nation");
const Players = require("../models/player");
class nationController {
  index(req, res, next) {
    Nations.find({})
      .then((nations) => {
        res.render("nations", {
          title: "The Nations",
          nations: nations,
        });
      })
      .catch(next);
  }

  getNation(req, res, next) {
    Nations.findById(req.params.id)
      .then((nation) => {
        res.render("updateNation", {
          title: "The Nation",
          nation: nation,
        });
      })
      .catch(next);
  }

  create(req, res, next) {
    const nation = new Nations({
      name: req.body.name.trim(),
      description: req.body.description.trim(),
    });
    nation
      .save()
      .then(() => res.redirect("/nations"))
      .catch((error) => {});
  }

  update(req, res, next) {
    Nations.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name.trim(), description: req.body.description.trim() },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          res.redirect("/nations");
        }
      }
    );
  }

  async delete(req, res, next) {
    const errors = {};
    const players = await Players.find({});
    let isSafeDelete = true;
    players.forEach(function (player) {
      if (player.nation._id.toString() === req.params.id) {
        isSafeDelete = false;
        errors.msg = "Already player with this nation";
      }
    });
    if (isSafeDelete) {
      Nations.findByIdAndRemove(req.params.id, function (err, nation) {
        if (err) throw err;
        console.log("Success");
        res.redirect("/nations");
      });
    } else res.redirect("/nations");
  }
}
module.exports = new nationController();
