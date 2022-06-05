const session = require('express-session')
const { render } = require('../app')
const DBConnection = require('../DB')

class user{
    homePage(req,res){
        req.session.seats = ''
        req.session.IDLichChieu = ''
        DBConnection.query(`SELECT IDPhim,TenPhim FROM lichchieu GROUP BY IDPhim`, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                res.render('index', {phim:result})
            }
        })
        
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

        req.session.IDLichChieu = IDLichChieu
        
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

    checkout(req,res){
        if(!req.session.IDLichChieu || !req.session.seats)
        {
            return res.redirect('/user')
        }
        
        DBConnection.query(`SELECT * FROM taikhoan WHERE Email = '${req.session.email}'`, (err,result) => {
            if(err){
                console.log(err)
            }
            else{
                DBConnection.query(`SELECT * FROM lichchieu WHERE IDLichChieu = ${req.session.IDLichChieu}`, (err,LichChieu) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        return res.render('checkout', {nguoidung: result, lichchieu: LichChieu, ghe: req.session.seats, tong: parseInt(LichChieu[0].GiaVe) * req.session.seats.length})
                    }
                })
            }
        })
    }

    history(req,res){
        DBConnection.query(`SELECT * FROM ve WHERE Email = '${req.session.email}'`, (err,result) => {
            if(err) console.log(err)
            else return res.render('history', {ve: result})
        })
    }

    thongtinve(req,res){
        DBConnection.query(`SELECT * FROM ve WHERE IDVe = ${req.query.IDVe}`, (err,result) => {
            if (err) {
                console.log(err)
            }
            else{
                DBConnection.query(`SELECT * FROM lichchieu WHERE IDLichChieu = ${req.query.IDLichChieu}`, (err,lich) => {
                    if(err){
                        console.log(err)
                    }
                    else{
                        DBConnection.query(`SELECT * FROM taikhoan WHERE Email = '${req.session.email}'`, (err,tk) => {
                            if(err){
                                console.log(err)
                            }
                            else{
                                return res.render('thongtinve', {ve: result, lichchieu: lich, taikhoan: tk, helpers: {
                                    price(x) {
                                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                                    }
                                }})
                            }
                        })
                    }
                })
            }
            
        })
    }
}

module.exports = new user

