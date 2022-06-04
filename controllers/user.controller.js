const DBConnection = require('../DB')

class user{
    homePage(req,res){
        DBConnection.query(`SELECT IDPhim,TenPhim FROM lichchieu GROUP BY IDPhim`, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                res.render('index', {phim:result})
            }
        })
        
    }

    historyPage(req,res){
        res.render('history')
    }

    movieInfoPage(req,res){
        let IDPhim = req.params.IDPhim
        DBConnection.query(`SELECT * FROM phim WHERE IDPhim = ${IDPhim}`, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                return res.render('chitietphim', {phim:result})
            }
        })
    }

    lichchieuPage(req,res){
        let IDPhim = req.params.IDPhim
        DBConnection.query(`SELECT * FROM lichchieu WHERE IDPhim = ${IDPhim}`, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                return res.render('lichchieuphim', {lichchieu:result})
            }
        })
    }

    gheLichChieuPage(req,res){
        let IDLichChieu = req.params.IDLichChieu
        DBConnection.query(`SELECT * FROM ghelichchieu WHERE IDLichChieu = ${IDLichChieu} ORDER BY SoGhe ASC`, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                return res.render('ghelichchieu', {ghe: result, helpers: 
                    {
                        hangA(SoGhe){
                            return SoGhe.includes('A')
                        },
                        hangB(SoGhe){
                            return SoGhe.includes('B')
                        },
                        hangC(SoGhe){
                            return SoGhe.includes('C')
                        },
                        hangD(SoGhe){
                            return SoGhe.includes('D')
                        },
                        hangE(SoGhe){
                            return SoGhe.includes('E')
                        },
                        hangF(SoGhe){
                            return SoGhe.includes('F')
                        },
                        empty(TrangThai){
                            if(TrangThai == 0) return true
                            false
                        }
                    }})
            }
        })
    }
}

module.exports = new user

