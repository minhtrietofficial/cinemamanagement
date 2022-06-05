const DBConnection = require('../DB')

class schedule{

    getMovieSchedule(req,res){
        let IDPhim = req.body.idphim

        const scheduleQuery =  `SELECT * FROM lichchieu WHERE IDPhim = ?`
        DBConnection.query(scheduleQuery, [IDPhim], (err,result,fields) => {
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
            }
            else{
                return res.json({schedule: result})
            }
        })
    }

    getSeatSchedule(req,res){
        let IDLichChieu = req.body.idlichchieu

        const seatQuery = `SELECT * FROM ghelichchieu WHERE IDLichChieu = ?`

        DBConnection.query(seatQuery, [IDLichChieu], (err,result,fields) =>{
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
            }
            else{
                return res.json({schedule: result})
            }
        })
    }

    addSchedule(req,res){
        let IDPhim = req.body.idphim
        let ThoiGianBatDau = req.body.thoigianbatdau
        let ThoiGianKetThuc = req.body.thoigianketthuc
        let NgayChieu = req.body.ngaychieu
        let IDPhongChieu = req.body.idphongchieu
        let GiaVe = req.body.giave
        let HinhThuc = req.body.hinhthuc


        if(IDPhim == null || ThoiGianBatDau == null || ThoiGianKetThuc == null || NgayChieu == null || IDPhongChieu == null || GiaVe == null || HinhThuc == null){
            return res.json({code: 412, msg: 'MISSING PARAMS'})
        }
        
        const addScheduleQuery = `INSERT INTO lichchieu(IDPhim,ThoiGianBatDau,ThoiGianKetThuc,NgayChieu,IDPhongChieu,GiaVe,HinhThuc) VALUES (?,?,?,?,?,?,?)`

        DBConnection.query(addScheduleQuery, [IDPhim,ThoiGianBatDau,ThoiGianKetThuc,NgayChieu,IDPhongChieu,GiaVe,HinhThuc], (err,result,fields) => {
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
            }
            else{
                let insertId = result.insertId

                const addSeatSchedule = `INSERT INTO ghelichchieu VALUES(?,?,0)`

                const getSeatRoom = `SELECT * FROM ghephongchieu WHERE IDPhongChieu = ?`
                DBConnection.query(getSeatRoom, [IDPhongChieu], (err,result,fields) => {
                    if(err){
                        console.log(err)
                        return res.json({code: 500, msg: 'Server error'})
                    }
                    else{
                        const addSeatSchedule = `INSERT INTO ghelichchieu VALUES(?,?,0)`

                        for(const x of result){
                            DBConnection.query(addSeatSchedule, [insertId,x.SoGhe], (err,result) => {
                                if(err){
                                    console.log(err)
                                }
                            })
                        }

                        res.json({code: 200, msg: "Schedule created"})
                    }
                })
            }
        })
    }

    // updateSchedule(
        
    // )
}

module.exports = new schedule