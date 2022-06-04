function movieInfoPage(IDPhim){
    window.location.replace('/user/'+IDPhim)
}

function lichchieu(IDPhim){
    window.location.replace('/user/lichchieu/'+IDPhim)
}

function ghelichchieu(IDLichChieu){
    window.location.replace('/user/ghelichchieu/'+IDLichChieu)
}

function cancelDatVe(){
    window.location.replace('/user')
}

function getGhe(){
    var array = []
    var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

    for (var i = 0; i < checkboxes.length; i++) {
        array.push(checkboxes[i].value)
    }

    fetch('/ticket', {
        method: 'POST',
        body: new URLSearchParams({
            seats: JSON.stringify(array)
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/user/checkout')
        }
        else{
            alert('Somthing went wrong')
        }
    })
}

function confirmDatVe(IDPhim){
    fetch('/ticket/confirm', {
        method: 'POST',
        body: new URLSearchParams({
            idphim: IDPhim
        })
    })
    .then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/user/history')
        }
        else{
            alert('Somting went wrong')
        }
    })
}

function thongTinVe(IDVe,IDLichChieu){
    window.location.replace(`/user/thongtinve?IDVe=${IDVe}&IDLichChieu=${IDLichChieu}`)
}