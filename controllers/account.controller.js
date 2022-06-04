const DBConnection = require('../DB')

class account{

    verifyAccount(req,res){
        let Email = req.body.email
        let MatKhau = req.body.password

        if(Email == null || MatKhau == null){
            return res.json({code: 412, msg: 'Missing params'})
        }

        let findAccountQuery = `SELECT * FROM taikhoan WHERE Email = ? AND MatKhau = ?`

        DBConnection.query(findAccountQuery, [Email,MatKhau], (err,result,fields) => {
            if(err) {
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                if(!result[0]){
                    return res.send(JSON.stringify({code: 404, msg: 'User or Password is not correct'}))
                }
                else{
                    req.session.role = result[0].LoaiTaiKhoan
                    req.session.email = Email
                    return res.send(JSON.stringify({code: 200, msg: 'Success'}))
                }
            }
        })
    }

    signUp(req,res){
        let Email = req.body.email
        let HoTen = req.body.hoten
        let SoDienThoai = req.body.sdt
        let LoaiTaiKhoan = 0
        let MatKhau = req.body.password

        if(Email == null || HoTen == null || SoDienThoai == null || MatKhau == null){
            return res.send(JSON.stringify({code: 412, msg: 'Missing params'}))
        }

        const checkEmail = `SELECT * FROM taikhoan WHERE Email = ?`
        DBConnection.query(checkEmail, [Email], (err,resultEmail,fields)=>{
            if(err) {
                console.log(err)
                return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
            }
            else{
                if(resultEmail[0]){
                    return res.send(JSON.stringify({code: 409, msg: 'Email Already Exist'}))
                }
                else{
                    const checkPhoneNum = `SELECT * FROM taikhoan WHERE SoDienThoai = ?`
                    DBConnection.query(checkPhoneNum, [SoDienThoai], (err,resultNum,fields)=>{
                        if(err) {
                            console.log(err)
                            return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                        }
                        else{
                            if(resultNum[0]){
                                return res.send(JSON.stringify({code: 409, msg: 'Phone number Already Exist'}))
                            }
                            else{
                                const query = `INSERT INTO taikhoan(Email,HoTen,SoDienThoai,LoaiTaiKhoan,MatKhau) VALUES(?,?,?,?,?)`

                                DBConnection.query(query, [Email,HoTen,SoDienThoai,LoaiTaiKhoan,MatKhau], (err,result,fields) => {
                                    if(err) {
                                        console.log(err)
                                        return res.send(JSON.stringify({code: 500, msg: 'Server error'}))
                                    }
                                    else{
                                        return res.send(JSON.stringify({code: 200, msg: 'User added'}))
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

    }

    logout(req,res){
        req.session.destroy()
        res.redirect('/login')
    }
}

module.exports = new account