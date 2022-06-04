const DBConnection = require('../DB')

const fs = require('fs')
const path = require('path') 
class movies{
    add(req,res){
        let TenPhim = req.body.tenphim
        let DaoDien = req.body.daodien
        let TheLoai = req.body.theloai
        let NhaPhatHanh = req.body.nhaphathanh
        let KhoiChieu = req.body.khoichieu
        let KetThuc = req.body.ketthuc
        let ThoiLuong = req.body.thoiluong
        let NgonNgu = req.body.ngonngu
        let Rated = req.body.rated
        let NSX = req.body.nsx

        if(TenPhim == null || DaoDien == null || TheLoai == null || NhaPhatHanh == null || KhoiChieu == null || KetThuc == null || ThoiLuong == null || NgonNgu == null || Rated == null || NSX == null){
            return res.json({code: 412, msg: 'Missing params'})
        }

        DBConnection.query(`SELECT * FROM phim WHERE TenPhim = '${TenPhim}'`, (err,result) =>{
            if(err) {
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                if(result.length > 0){
                    return res.send(JSON.stringify({code: 409, msg: 'Tên phim đã tồn tại'}))
                }
                else{
                    const query = `INSERT INTO phim(TenPhim,DaoDien,TheLoai,NhaPhatHanh,KhoiChieu,KetThuc,ThoiLuong,NgonNgu,Rated,NSX) VALUES(?,?,?,?,?,?,?,?,?,?)`

                    DBConnection.query(query, [TenPhim,DaoDien,TheLoai,NhaPhatHanh,KhoiChieu,KetThuc,ThoiLuong,NgonNgu,Rated,NSX], (err,result,fields) => {
                        if(err){
                            console.log(err)
                            return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                        }
                        else{
                            return res.send(JSON.stringify({code: 200, msg: 'movie added', id: result.insertId}))
                        }
                    })
                }
            }
        })
        
    }

    modify(req,res){
        let IDPhim = req.body.id
        let TenPhim = req.body.tenphim
        let DaoDien = req.body.daodien
        let TheLoai = req.body.theloai
        let NhaPhatHanh = req.body.nhaphathanh
        let KhoiChieu = req.body.khoichieu
        let KetThuc = req.body.ketthuc
        let ThoiLuong = req.body.thoiluong
        let NgonNgu = req.body.ngonngu
        let Rated = req.body.rated
        let NSX = req.body.nsx

        if(IDPhim == null || TenPhim == null || DaoDien == null || TheLoai == null || NhaPhatHanh == null || KhoiChieu == null || KetThuc == null || ThoiLuong == null || NgonNgu == null || Rated == null || NSX == null){
            return res.json({code: 412, msg: 'Missing params'})
        }

        const checkMovie = `SELECT * FROM phim WHERE IDPhim = ?`
        DBConnection.query(checkMovie, [IDPhim], (err,result,fields) => {
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
            }
            else{
                if(!result[0]){
                    return res.json({code: 404, msg: 'Movie ID not exist'})
                }
                else{
                    const query = `UPDATE phim SET TenPhim=?,DaoDien=?,TheLoai=?,NhaPhatHanh=?,KhoiChieu=?,KetThuc=?,ThoiLuong=?,NgonNgu=?,Rated=?,NSX=? WHERE IDPhim = ?`

                    DBConnection.query(query, [TenPhim,DaoDien,TheLoai,NhaPhatHanh,KhoiChieu,KetThuc,ThoiLuong,NgonNgu,Rated,NSX,IDPhim], (err,result,fields) => {
                        if(err){
                            console.log(err)
                            return res.json({code: 500, msg: 'Server error'})
                        }
                        else{
                            return res.json({code: 200, msg: 'movie updated'})
                        }
                    })
                }
            }
        })

        
    }

    delete(req,res){
        let IDPhim = req.body.id
        let link = path.join(__dirname,'../public/images/'+IDPhim+'.png')
        console.log(link)
        fs.unlink(link, (err) => {
            if (err) {
              console.error(err)
              return
            }
        })
        
        

        const checkID = `SELECT * FROM phim WHERE IDPhim = ?`

        DBConnection.query(checkID,[IDPhim], (err,result,fields) => {
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
            }
            else{
                if(!result[0]){
                    return res.json({code: 404, msg: 'movie ID not exist'})
                }
                else{
                    const deleteQuery = `DELETE FROM phim WHERE IDPhim = ?`

                    DBConnection.query(deleteQuery,[IDPhim], (err,result,fields) => {
                        if(err){
                            console.log(err)
                            return res.json({code: 500, msg: 'Server error'})
                        }
                        else{
                            return res.json({code: 200, msg: 'Movie deleted'})
                        }
                    })
                }
            }
        })
    }

    getMovies(req,res){
        const getMoviesQuery = `SELECT * FROM phim`

        DBConnection.query(getMoviesQuery, (err,result,fields) => {
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
            }
            else{
                return res.json({movies: result})
            }
        })
    }

    getMovie(req,res){
        let IDPhim = req.params.id

        const checkID = `SELECT * FROM phim WHERE IDPhim = ?`

        DBConnection.query(checkID,[IDPhim], (err,result,fields) => {
            if(err){
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                if(!result[0]){
                    return res.send(JSON.stringify({code: 404, msg: 'movie ID not exist'}))
                }
                else{
                    const getMovieQuery = `SELECT * FROM phim WHERE IDPhim = ?`

                    DBConnection.query(getMovieQuery,[IDPhim], (err,result,fields) => {
                        if(err){
                            console.log(err)
                            return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                        }
                        else{
                            return res.send(JSON.stringify({movie: result[0]}))
                        }
                    })
                }
            }
        })
    }
}

module.exports = new movies