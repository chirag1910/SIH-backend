const express = require("express");
const router = express.Router();

const { auth, admin } = require("../Middlewares/auth");

const {
    addValidator,
    updateValidator,
    deleteValidator,
    getValidator,
} = require("../Validators/scheme");

const {
    add,
    update,
    deleteScheme,
    get,
    getAll,
} = require("../Controllers/scheme");

router.post("/add", admin, addValidator, add);
router.post("/update", admin, updateValidator, update);
router.post("/delete", admin, deleteValidator, deleteScheme);
router.post("/", auth, getValidator, get);
router.post("/all", auth, getAll);

module.exports = router;
