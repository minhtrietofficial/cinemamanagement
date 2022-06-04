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
}

module.exports = new nhanvien