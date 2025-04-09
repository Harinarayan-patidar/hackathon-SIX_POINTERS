const express = require("express");
const router = express.Router();
const{auth} = require("../middlewares/auth");
const{
    updateProfile,
    deleteAccount,
    getAllUserDetails,

}  = require("../controllers/Profile");

// delete user account
router.delete("/deleteProfile",auth, deleteAccount);
router.put("/updateProfile",auth, updateProfile);
router.get("/getAllUserDetails", auth , getAllUserDetails);

module.exports = router;