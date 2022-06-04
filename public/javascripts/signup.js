document.getElementById('signupForm').addEventListener('submit', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let hoten = document.getElementById('hoten').value
    let sdt = document.getElementById('sdt').value
    let password = document.getElementById('password').value
    let confirmPass = document.getElementById('confirmPass').value

    let errMsg = document.getElementById('message')

    if(email == '' || hoten == '' || sdt == ''|| password == ''|| confirmPass == ''){
        errMsg.style.display = 'block'
        errMsg.innerText = 'Vui lòng điền đầy đủ thông tin'
        return false
    }

    if(password != confirmPass){
        errMsg.style.display = 'block'
        errMsg.innerText = 'Mật khẩu xác nhận không chính xác'
        return false
    }

    fetch('/account/signup', {
        method: 'POST',
        body: new URLSearchParams({
            email: email,
            hoten: hoten,
            sdt: sdt,
            password: password,
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/login')
        }
        else{
            errMsg.style.display = 'block'
            errMsg.innerText = json.msg
            return false
        }
    })
})