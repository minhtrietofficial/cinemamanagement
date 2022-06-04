document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault()

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    let errMsg = document.getElementById('message')

    if(email == '' || password == ''){
        errMsg.style.display = 'block'
        errMsg.innerText = 'Vui lòng điền đầy đủ thông tin'
        return false
    }

    fetch('/account', {
        method: 'POST',
        body: new URLSearchParams({
            email: email,
            password: password
        })
    }).then(res => res.json())
    .then(json => {
        if(json.code == 200){
            window.location.replace('/user')
        }
        else{
            errMsg.style.display = 'block'
            errMsg.innerText = json.msg
            return false
        }
    })

})