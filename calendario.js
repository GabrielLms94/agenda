const date = new Date();
const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
let daySelected;
let selected;
let sendDate;
let getItems;


const renderCalendar = () => {
    date.setDate(1);

    const monthDays = document.querySelector(".days");

    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();

    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();

    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();

    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    let today = new Date();
    document.querySelector(".date p").innerHTML = today.toLocaleDateString(undefined, options)

    let days = "";

    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {

        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            days += `<div class="day today">${i}</div>`;
        } else {
            days += `<div class="day other">${i}</div>`;
        }


    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="next-date">${j}</div>`;
    }

    monthDays.innerHTML = days;


    var form = document.getElementById('form');
    getRegisters()

    document.getElementById('buscar').addEventListener('input',  (e) => {

        var url = './controller/getFilter.php';

        var datos = new FormData(form)

        datos.append('datos', e.target.value )

        fetch(url, {
            method: 'POST', // or 'PUT'
            body: datos, // data can be `string` or {object}!
        }).then(res => res.json())
            .then(response => {
                let table = ''
                for (let i in response) {
                    table += `<tr>
                            <td style="vertical-align:middle;" ><h3>${response[i].fecha}</h3></td>
                            <td style="vertical-align:middle;" ><h3>${response[i].hora}</h3> </td>
                            <td style="vertical-align:middle;" ><h3>${response[i].descripcion}</h3> </td>
                            <td style="vertical-align:middle;" ><h3>${response[i].lugar}</h3> </td>
                            <td>
                            <br>
                            <br>
                            <a class="option-btn" href="./cambiar_Info.html?id=${response[i].id}"><h3>Modificar</h3></a>
                            </td>
                            <td style="vertical-align:middle;" >
                            <form method="post" action="./controller/deleteSelected.php">
                            <input type="hidden" value="${response[i].id}" name="id">
                            <input class="delete-btn" type="submit" value="Eliminar">
                            </form>
                            </td>
                          </tr>`
                }
                $('#tbody').html(table);

            });

    })

    form.addEventListener('submit', function (e) {
        e.preventDefault()
        getDate()
        var datos = new FormData(form)

        datos.append('fecha', date.toLocaleDateString(undefined, options))

        var url = './controller/postNewDate.php';

        if (datos.get('descripcion') || datos.get('lugar')) {
            fetch(url, {
                method: 'POST', // or 'PUT'
                body: datos, // data can be `string` or {object}!
            }).then(res => res.json())
                .then(response => {
                    console.log('Success:', response)

                });

            document.getElementById('lugar').value = ''
            document.getElementById('descripcion').value = ''
            // selected.className = 'day selected'
            $('#menu').hide('slow')
            getRegisters()
        }


    })

};


document.querySelector(".prev").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar();
    x()
});

document.querySelector(".next").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar();
    x()
});

renderCalendar();


function x() {
    let days = document.getElementsByClassName('day')

    for (let i in days) {
        days[i].addEventListener('click', (e) => {
            daySelected = e.target.textContent
            selected = e.target;

            var setDay_menu = date
            setDay_menu.setDate(e.target.textContent)
            document.getElementById('menu-date').innerHTML =  setDay_menu.toLocaleDateString(undefined, options)
            $('#menu').show('slow')
        })
    }
}

x()


function cancelar() {
    document.getElementById('menu-date').innerHTML = ''
    $('#menu').hide('slow')
}

function getDate() {
    sendDate = date;
    sendDate.setDate(daySelected)
}


function getRegisters() {
    var url = './controller/getAllDates.php';

    fetch(url, {
        method: 'GET', // or 'PUT'
    }).then(res => res.json())
        .then(response => {
            let table = ''
            moment.locale('es')
            for (let i in response) {
                table += `<tr>
                            <td style="vertical-align:middle;" ><h3>${response[i].fecha}</h3></td> 
                            <td style="vertical-align:middle;" ><h3>${response[i].hora}</h3> </td>
                            <td style="vertical-align:middle;" ><h3>${response[i].descripcion}</h3> </td>
                            <td style="vertical-align:middle;" ><h3>${response[i].lugar}</h3> </td>                 
                            <td>
                            <br>
                            <br>
                            <a class="option-btn" href="./cambiar_Info.html?id=${response[i].id}"><h3>Modificar</h3></a>
                            </td>         
                            <td style="vertical-align:middle;" >
                            <form method="post" action="./controller/deleteSelected.php"> 
                            <input type="hidden" value="${response[i].id}" name="id">
                            <input class="delete-btn" type="submit" value="Eliminar">
                            </form>
                            </td>           
                          </tr>`
            }
            $('#tbody').html(table);

        });
}



