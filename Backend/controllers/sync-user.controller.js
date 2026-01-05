// const { PrismaClient } = require("@prisma/client");

// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// console.log(prisma);

const sync_user = async (req,res) => {


    res.status(200).json({
        success: true,
        message: "All ok"
    })
}


module.exports = {sync_user}