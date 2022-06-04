
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
    let rated = document.getElementById('rated').value
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

function modalLichChieuConfirm(IDLichChieu){
    document.getElementById('modal-bg').style.display = 'flex'
    document.getElementById('modal-box').style.display = 'block'

    document.getElementById('modal-message').innerText = 'Bạn có muốn hủy lịch chiếu này'
    
    document.getElementById('modal-close').addEventListener('click', (e) => {
        document.getElementById('modal-bg').style.display = 'none'
        document.getElementById('modal-box').style.display = 'none'
    })
        
    document.getElementById('modal-close1').addEventListener('click', (e) => {
        document.getElementById('modal-bg').style.display = 'none'
        document.getElementById('modal-box').style.display = 'none'
    })

    document.getElementById('modal-confirm').addEventListener('click', (e) => {
        fetch('/schedule', {
            method: 'DELETE',
            body: new URLSearchParams({
                id: IDLichChieu
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

function informationLichChieuPage(IDLichChieu){
    window.location.replace('/nhanvien/lichchieu/' + IDLichChieu)
}


function cancelUpdateLichChieu(){
    window.location.replace('/nhanvien/lichchieu')
}

function updateLichChieu(IDLichChieu,IDPC){
    let IDPhim = document.getElementById('phim').value.split(',')[0]
    let TenPhim = document.getElementById('phim').value.split(',')[1]
    let IDPhongChieu = document.getElementById('phongchieu').value.split(',')[0]
    let TenPhongChieu = document.getElementById('phongchieu').value.split(',')[1]
    let ThoiGianBatDau = document.getElementById('thoigianbatdau').value
    let ThoiGianKetThuc = document.getElementById('thoigianketthuc').value
    let NgayChieu = document.getElementById('ngaychieu').value
    let GiaVe = document.getElementById('giave').value
    let HinhThuc = document.getElementById('hinhthuc').value

    let msg = document.getElementById('message')

   

    if(TenPhim == ''|| IDPhim == ''|| IDPhongChieu == ''|| ThoiGianBatDau == ''|| ThoiGianKetThuc == ''|| NgayChieu == ''|| GiaVe == '' || HinhThuc == '' || TenPhongChieu == ''){
        msg.style.display = 'block'
        msg.innerText = 'Vui lòng không để trống thông tin'
        return false
    }
    

    if(ThoiGianBatDau > ThoiGianKetThuc){
        msg.style.display = 'block'
        msg.innerText = 'Thời gian không hợp lệ'
        return false
    }
    
    let today = new Date()
    let dateNgayChieu = new Date(NgayChieu)
    if(dateNgayChieu.getTime() < today.getTime()){
        msg.style.display = 'block'
        msg.innerText = 'Ngày chiếu không hợp lệ'
        return false
    }

    
    if(IDPC == IDPhongChieu){
        IDPhongChieu = 'no'
    }

    
    
    fetch('/schedule', {
        method: 'PUT',
        body: new URLSearchParams({
            idlichchieu: IDLichChieu,
            idphim: IDPhim,
            tenphim: TenPhim,
            thoigianbatdau: ThoiGianBatDau,
            thoigianketthuc: ThoiGianKetThuc,
            ngaychieu: NgayChieu,
            idphongchieu: IDPhongChieu,
            tenphongchieu: TenPhongChieu,
            giave: GiaVe,
            hinhthuc: HinhThuc
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/nhanvien/lichchieu')
        }
        else{
            msg.style.display = 'block'
            msg.innerText = json.msg
            return false
        }
    })
}

function addLichChieu(){
    let IDPhim = document.getElementById('phim').value.split(',')[0]
    let TenPhim = document.getElementById('phim').value.split(',')[1]
    let IDPhongChieu = document.getElementById('phongchieu').value.split(',')[0]
    let TenPhongChieu = document.getElementById('phongchieu').value.split(',')[1]
    let ThoiGianBatDau = document.getElementById('thoigianbatdau').value
    let ThoiGianKetThuc = document.getElementById('thoigianketthuc').value
    let NgayChieu = document.getElementById('ngaychieu').value
    let GiaVe = document.getElementById('giave').value
    let HinhThuc = document.getElementById('hinhthuc').value

    let msg = document.getElementById('message')

   

    if(TenPhim == ''|| IDPhim == ''|| IDPhongChieu == ''|| ThoiGianBatDau == ''|| ThoiGianKetThuc == ''|| NgayChieu == ''|| GiaVe == '' || HinhThuc == '' || TenPhongChieu == ''){
        msg.style.display = 'block'
        msg.innerText = 'Vui lòng không để trống thông tin'
        return false
    }
    

    if(ThoiGianBatDau > ThoiGianKetThuc){
        msg.style.display = 'block'
        msg.innerText = 'Thời gian không hợp lệ'
        return false
    }
    
    let today = new Date()
    let dateNgayChieu = new Date(NgayChieu)
    if(dateNgayChieu.getTime() < today.getTime()){
        msg.style.display = 'block'
        msg.innerText = 'Ngày chiếu không hợp lệ'
        return false
    }
    
    fetch('/schedule', {
        method: 'POST',
        body: new URLSearchParams({
            idphim: IDPhim,
            tenphim: TenPhim,
            thoigianbatdau: ThoiGianBatDau,
            thoigianketthuc: ThoiGianKetThuc,
            ngaychieu: NgayChieu,
            idphongchieu: IDPhongChieu,
            tenphongchieu: TenPhongChieu,
            giave: GiaVe,
            hinhthuc: HinhThuc
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/nhanvien/lichchieu')
        }
        else{
            msg.style.display = 'block'
            msg.innerText = json.msg
            return false
        }
    })
}