const Account = require('../models/Account')
const Meet = require('../models/Meet')
const createMeet = async(req,res)=>{
    try{
        const {name,date,time,meetmembers} = req.body
        if(!name || !date || !time || !meetmembers){
            res.status(403).send('wrong body')
        }
        const meet  = await Meet.create({name:name,date:date,time:time})
        const validAccounts = await Account.findAll({
            where: { id: meetmembers },
            include: {
                model: UserRole,
                where: { id: [3, 4, 5, 6] }, 
            },
        });
        if (validAccounts.length === 0) {
            return res.status(400).json({ error: "No valid committee members found to add to the meeting." });
        }
        await meet.addAccounts(validAccounts);
        return res.status(201).json({ message: "Meeting created successfully", meet });
    }
    catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const getMeets = async (req, res) => {
    try {
        const meetings = await Meet.findAll({
            include: [
                {
                    model: Account,
                    through: { attributes: [] }, // Hide the pivot table `MeetMembers`
                    attributes: ["id", "userId"], // Include account details
                },
            ],
        });

        if (!meetings.length) {
            return res.status(404).json({ message: "No meetings found." });
        }

        return res.status(200).json(meetings);

    } catch (err) {
        console.error("❌ Error fetching meetings:", err);
        return res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
};


module.exports = { 
    createMeet,
    getMeets
  };