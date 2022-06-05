const DBConnection = require('../DB')

class nhanvien{
    homePage(req,res){
        
        const getMoviesQuery = `SELECT * FROM phim`
    
        DBConnection.query(getMoviesQuery, (err,result,fields) => {
            if(err){
                console.log(err)
                return res.json({code: 500, msg: 'Server error'})
                }
            else{
                return res.render('nhanvienHomePage', {phim: result})
            }
        })
        
    }

    addPage(req,res){
        res.render('nhanvienAddPage')
    }

    updatePage(req,res){
        let IDPhim = req.params.IDPhim

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
                            return res.render('nhanvienUpdatePage',{movie: result})
                        }
                    })
                }
            }
        })
    }

    lichchieuPage(req,res){
        DBConnection.query(`SELECT * FROM lichchieu`, (err,result) => {
            if(err){
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                res.render('nhanvienLichChieu', {lichchieu: result,helpers: {
                    price(x) {
                        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                }})
            }
        })
    }

    lichchieuInfoPage(req,res){
        DBConnection.query(`SELECT * FROM lichchieu WHERE IDLichChieu = ${req.params.IDLichChieu}`, (err,result) => {
            if(err){
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                DBConnection.query(`SELECT * FROM phim WHERE IDPhim != ${result[0].IDPhim}`, (err,phim) => {
                    DBConnection.query(`SELECT * FROM phongchieu WHERE IDPhongChieu != ${result[0].IDPhongChieu}`, (err,phongchieu) => {
                        res.render('nhanvienInfoLichChieu', {lichchieu: result, phim: phim, phongchieu: phongchieu})
                    })
                })  
            }
        })
    }

    addLichChieuPage(req,res){
        DBConnection.query(`SELECT * FROM phim`, (err,phim) => {
            DBConnection.query(`SELECT * FROM phongchieu`, (err,phongchieu) => {
                res.render('nhanvienAddLichChieu', {phim: phim, phongchieu: phongchieu})
            })
        })  
    }
}

module.exports = new nhanvien