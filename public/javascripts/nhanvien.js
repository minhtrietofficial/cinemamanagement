
function modalConfirm(IDPhim){

    document.getElementById('modal-bg').style.display = 'flex'
    document.getElementById('modal-box').style.display = 'block'

    document.getElementById('modal-message').innerText = 'Bạn có muốn xóa bộ phim này'
    
    document.getElementById('modal-close').addEventListener('click', (e) => {
        document.getElementById('modal-bg').style.display = 'none'
        document.getElementById('modal-box').style.display = 'none'
    })

    document.getElementById('modal-confirm').addEventListener('click', (e) => {
        fetch('/movies', {
            method: 'DELETE',
            body: new URLSearchParams({
                id: IDPhim
            })
        }).then(res => res.json())
        .then(json => {
            if(json.code == 200){
                window.location.reload()
            }
            else{
                alert('Something went wrong')
            }
        })
    })
}

function infomationPage(IDPhim){
    window.location.replace('/nhanvien/'+IDPhim)
}

function cancelUpdate(){
    window.location.replace('/nhanvien/')
}
function submitMovie(){
    let tenphim = document.getElementById('tenphim').value
    let daodien = document.getElementById('daodien').value
    let nhaphathanh = document.getElementById('nhaphathanh').value
    let theloai = document.getElementById('theloai').value
    let khoichieu = document.getElementById('khoichieu').value
    let ketthuc = document.getElementById('ketthuc').value
    let thoiluong = document.getElementById('thoiluong').value
    let ngonngu = document.getElementById('ngonngu').value
    let rated = document.getElementById('rated')
    let nsx = document.getElementById('nsx').value

    let errMsg = document.getElementById('message')

    if(tenphim == '' || daodien == '' || nhaphathanh == '' || theloai == '' || khoichieu == '' || ketthuc == '' || thoiluong == '' || ngonngu == ''|| rated == '' || nsx == ''){
        errMsg.style.display = 'block'
        errMsg.innerText = 'Vui lòng điền đầy đủ thông tin'
        return false
    }

    fetch('/movies', {
        method: 'POST',
        body: new URLSearchParams({
            tenphim: tenphim,
            daodien: daodien,
            theloai: theloai,
            nhaphathanh: nhaphathanh,
            khoichieu: khoichieu,
            ketthuc: ketthuc,
            thoiluong: thoiluong,
            ngonngu: ngonngu,
            rated: rated,
            nsx: nsx
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/nhanvien')
        }
        else{
            errMsg.style.display = 'block'
            errMsg.innerText = json.msg
            return false
        }
    })
}

function updateMovie(IDPhim){
    let tenphim = document.getElementById('tenphim').value
    let daodien = document.getElementById('daodien').value
    let nhaphathanh = document.getElementById('nhaphathanh').value
    let theloai = document.getElementById('theloai').value
    let khoichieu = document.getElementById('khoichieu').value
    let ketthuc = document.getElementById('ketthuc').value
    let thoiluong = document.getElementById('thoiluong').value
    let ngonngu = document.getElementById('ngonngu').value
    let rated = document.getElementById('rated')
    let nsx = document.getElementById('nsx').value

    let errMsg = document.getElementById('message')

    if(tenphim == '' || daodien == '' || nhaphathanh == '' || theloai == '' || khoichieu == '' || ketthuc == '' || thoiluong == '' || ngonngu == ''|| rated == '' || nsx == ''){
        errMsg.style.display = 'block'
        errMsg.innerText = 'Vui lòng điền đầy đủ thông tin'
        return false
    }

    fetch('/movies', {
        method: 'PUT',
        body: new URLSearchParams({
            id: IDPhim,
            tenphim: tenphim,
            daodien: daodien,
            theloai: theloai,
            nhaphathanh: nhaphathanh,
            khoichieu: khoichieu,
            ketthuc: ketthuc,
            thoiluong: thoiluong,
            ngonngu: ngonngu,
            rated: rated,
            nsx: nsx
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/nhanvien')
        }
        else{
            errMsg.style.display = 'block'
            errMsg.innerText = json.msg
            return false
        }
    })
}