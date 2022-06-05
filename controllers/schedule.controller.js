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
        let TenPhim = req.body.tenphim
        let TenPhongChieu = req.body.tenphongchieu

        if(IDPhim == null || ThoiGianBatDau == null || ThoiGianKetThuc == null || NgayChieu == null || IDPhongChieu == null || GiaVe == null || HinhThuc == null){
            return res.send(JSON.stringify({code: 412, msg: 'MISSING PARAMS'}))
        }
        
        const addScheduleQuery = `INSERT INTO lichchieu(IDPhim,ThoiGianBatDau,ThoiGianketThuc,NgayChieu,IDPhongChieu,GiaVe,HinhThuc,TenPhim,TenPhongChieu) VALUES (?,?,?,?,?,?,?,?,?)`

        DBConnection.query(addScheduleQuery, [IDPhim,ThoiGianBatDau,ThoiGianKetThuc,NgayChieu,IDPhongChieu,GiaVe,HinhThuc,TenPhim,TenPhongChieu], (err,result,fields) => {
            if(err){
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                let insertId = result.insertId

                const addSeatSchedule = `INSERT INTO ghelichchieu VALUES(?,?,0)`

                const getSeatRoom = `SELECT * FROM ghephongchieu WHERE IDPhongChieu = ?`
                DBConnection.query(getSeatRoom, [IDPhongChieu], (err,result,fields) => {
                    if(err){
                        console.log(err)
                        return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
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

                        res.send(JSON.stringify({code: 200, msg: "Schedule created"}))
                    }
                })
            }
        })
    }

    delete(req,res){
        let IDLichChieu = req.body.id

        DBConnection.query(`DELETE FROM lichchieu WHERE IDLichChieu = ${IDLichChieu}`, (err,result) => {
            if(err){
                console.log(err)
                res.send(JSON.stringify({code: 500}))
            }
            else{
                DBConnection.query(`DELETE FROM ghelichchieu WHERE IDLichChieu = ${IDLichChieu}`)
                res.send(JSON.stringify({code: 200}))
            }
        })
    }

    updateSchedule(req,res){
        let IDLichChieu = req.body.idlichchieu
        let IDPhim = req.body.idphim
        let TenPhim = req.body.tenphim
        let ThoiGianBatDau = req.body.thoigianbatdau
        let ThoiGianKetThuc = req.body.thoigianketthuc
        let NgayChieu = req.body.ngaychieu
        let IDPhongChieu = req.body.idphongchieu
        let TenPhongChieu = req.body.tenphongchieu
        let GiaVe = req.body.giave
        let HinhThuc = req.body.hinhthuc

        console.log(TenPhim)
        if(IDPhim == null || ThoiGianBatDau == null || ThoiGianKetThuc == null || NgayChieu == null || IDPhongChieu == null || GiaVe == null || HinhThuc == null || IDLichChieu == null || TenPhim == null || TenPhongChieu == null){
            return res.json({code: 412, msg: 'MISSING PARAMS'})
        }
        
        

        if(IDPhongChieu == 'no'){
            const updateScheduleQuery = `UPDATE lichchieu SET IDPhim = ?,ThoiGianBatDau = ?,ThoiGianketThuc = ?,NgayChieu = ?,GiaVe = ?,HinhThuc = ?,TenPhim = ? WHERE IDPhim = ?`

            DBConnection.query(updateScheduleQuery, [IDPhim,ThoiGianBatDau,ThoiGianKetThuc,NgayChieu,GiaVe,HinhThuc,TenPhim,IDPhim], (err,result,fields) => {
                if(err){
                    console.log(err)
                    return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                }
                else{
                    res.send(JSON.stringify({code: 200, msg: "Schedule updated"}))
                }
            })
        }
        else{
            const updateScheduleQuery = `UPDATE lichchieu SET IDPhim = ?,ThoiGianBatDau = ?,ThoiGianketThuc = ?,NgayChieu = ?,IDPhongChieu = ?,GiaVe = ?,HinhThuc = ?,TenPhim = ?,TenPhongChieu = ?`
            DBConnection.query(updateScheduleQuery, [IDPhim,ThoiGianBatDau,ThoiGianKetThuc,NgayChieu,IDPhongChieu,GiaVe,HinhThuc,TenPhim,TenPhongChieu], (err,result,fields) => {
                if(err){
                    console.log(err)
                    return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                }
                else{

                    DBConnection.query(`DELETE FROM ghephongchieu WHERE IDLichChieu = ${IDLichChieu}`)

                    const addSeatSchedule = `INSERT INTO ghelichchieu VALUES(?,?,0)`
    
                    const getSeatRoom = `SELECT * FROM ghephongchieu WHERE IDPhongChieu = ?`
                    DBConnection.query(getSeatRoom, [IDPhongChieu], (err,result,fields) => {
                        if(err){
                            console.log(err)
                            return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                        }
                        else{
                            const addSeatSchedule = `INSERT INTO ghelichchieu VALUES(?,?,0)`
    
                            for(const x of result){
                                DBConnection.query(addSeatSchedule, [IDLichChieu,x.SoGhe], (err,result) => {
                                    if(err){
                                        console.log(err)
                                    }
                                })
                            }
    
                            res.send(JSON.stringify({code: 200, msg: "Schedule updated"}))
                        }
                    })
                }
            })
        }
        
    }

    
    // updateSchedule(
        
    // )
}

module.exports = new schedule