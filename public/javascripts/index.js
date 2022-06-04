function onloadTest(){
fetch('/movies', {
    method: 'GET'
}).then(res => JSON.parse(res))
.then(json => {
    console.log(json)

    for(const x of json.movies){
        let div = document.createElement('div')

        div.innerHTML = `${x.IDPhim} ${x.TenPhim}`

        document.getElementById('test').appendChild(div)
    }
})
}