const DBConnection = require('../DB')
class ticket{
    confirmTicket(req,res){
        let seats = JSON.parse(req.body.seats)

        if(seats.length == 0){
            return res.send(JSON.stringify({code: 412, msg: "Không có ghế nào được chọn"}))
        }
        else{
            req.session.seats = seats
            return res.send(JSON.stringify({code: 200}))
        }

    }

    saveTicket(req,res){
        let IDPhim = req.body.idphim
        let seats = req.session.seats
        let IDLichChieu = req.session.IDLichChieu

        for(const x of seats){
            DBConnection.query(`INSERT INTO ve(IDPhim,IDLichChieu,Email,SoGhe) VALUES (${IDPhim},${IDLichChieu},'${req.session.user}','${x}')`, (err,result) => {
                if(err){
                    console.log(err)
                }
                else{
                    DBConnection.query(`UPDATE ghelichchieu SET TrangThai = 1 WHERE SoGhe = '${x}' AND IDLichChieu = ${IDLichChieu}`,(err,result) => {
                        if(err) console.log(err)
                    })
                }
            })
        }

        res.send(JSON.stringify({code: 200}))


    }
}

module.exports = new ticket