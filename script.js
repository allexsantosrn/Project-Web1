const flexRadioDefault1 = document.getElementById('flexRadioDefault1');
const flexRadioDefault2 = document.getElementById('flexRadioDefault2');

flexRadioDefault1.addEventListener('click', postsTitle);
flexRadioDefault1.addEventListener('click', hiddenCombo);

flexRadioDefault2.addEventListener('click', tasksTitle);
flexRadioDefault2.addEventListener('click', showCombo);

function hiddenCombo() {    
    document.getElementById("content").style.display = "none"; 
}

function showCombo() {    
    document.getElementById("content").style.display = "inline";
}

function postsTitle() {

    if (document.getElementById("flexRadioDefault1").checked == true) {
        document.getElementById('titulo').innerHTML = "Posts do usuário";       
    }
}

function tasksTitle() {

    if (document.getElementById("flexRadioDefault2").checked == true) {
        document.getElementById('titulo').innerHTML = "Tarefas do usuário";       
    }
}

window.onload = function() {
    xhttpAssincrono(carryUsers,1);
}

function carryUsers(f){
    
    var users = JSON.parse(f)

    var comboUsers = document.getElementById("comboUsers");

    for(i = 0; i < users.length; i++){
        var option = document.createElement("option");
        option.innerHTML = users[i].name;
        option.value = users[i].id;
        comboUsers.appendChild(option);
    }   
}

/*
 * Função AJAX base do tipo assíncrona.
 * type é o tipo de objeto que você quer recuperar.
 * value é o valor do parâmetro para filtrar os resultados dos tipos 2, 3 e 4.
 * [Importante!] Você não pode, em nenhuma hipótese, alterar a função xhttpAssincrono.
 */
function xhttpAssincrono(callBackFunction, type, value) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a função em callback e passa a resposta da requisição
            callBackFunction(this.responseText);
        }
    };
    // Path para a requisição AJAX.
    var url = "http://jsonplaceholder.typicode.com/";
    switch (type) {
        case 1:
            url += "users"
            break;
        case 2:
            url += "posts?userId=" + value;
            break;
        case 3:
            url += "todos?userId=" + value;
            break;
        case 4:
            url += "comments?postId=" + value;
            break;
    }
    xhttp.open("GET", url, true);
    xhttp.send();
}




