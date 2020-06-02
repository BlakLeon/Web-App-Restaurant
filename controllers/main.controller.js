var testModel = require('../models/test.model')
var User = require('../models/user')
var Booking = require('../models/booking')

class mainController {
    async index() {
    console.log('cosaisndex');
    }
    async test(req, res) {
        await testModel.create({
            field1: 'sss',
            field2: 'sss',
            field3: 'ssdfss',
            field4: 'sss',
        });
        res.send('ok')
    }
    async deleteUser(req, res){
        let userID = req.params.userID;
        await User.deleteOne({ _id: userID })
        res.send('ok')
    }

    async approveBooking(req, res){
        let userID = req.params.userID;
        await Booking.updateOne({ _id: userID }, { status:true});
        res.send('ok')
    }

    async rejectBooking(req, res){
        let userID = req.params.userID;
        await Booking.deleteOne({ _id: userID })
        res.send('ok')
    }

    async updateUser(req, res){
        console.log(req.body);
        let userID = req.body.userId
        let name = req.body.name
        let email = req.body.email
        let role = req.body.role
        await User.updateOne({ _id: userID }, { name:name, email:email, role:role});
        res.send('ok')
    }

    async addBooking(req, res){
        console.log(req.body)
        var newBooking = new Booking();
        newBooking.email = req.body.email
        newBooking.phone = req.body.phone
        newBooking.name = req.body.name
        newBooking.date = req.body.date
        newBooking.timezone = req.body.timezone
        if(req.body.car){
            newBooking.car = req.body.car
        }
        newBooking.persons = req.body.persons
        console.log(newBooking)
        newBooking.save(function(err, result){
            if (err) {
                res.redirect('/');
            }
            res.redirect('/book');
        }) 
        
    }
}


module.exports = mainController;