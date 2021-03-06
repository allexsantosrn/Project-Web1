const flexRadioDefault1 = document.getElementById('flexRadioDefault1');
const flexRadioDefault2 = document.getElementById('flexRadioDefault2');
const comboUsers = document.getElementById('comboUsers');
const flexRadioDefault3 = document.getElementById('flexRadioDefault3');
const flexRadioDefault4 = document.getElementById('flexRadioDefault4');
const flexRadioDefault5 = document.getElementById('flexRadioDefault5');

flexRadioDefault1.addEventListener('click', hiddenCombo);
flexRadioDefault1.addEventListener('click', setSelect);

comboUsers.addEventListener('click', selectUserPosts);
comboUsers.addEventListener('click', selectUserTodos);
comboUsers.addEventListener('click', selectTodosFinished);
comboUsers.addEventListener('click', selectTodosIncompleted);

flexRadioDefault2.addEventListener('click', showCombo);
flexRadioDefault2.addEventListener('click', setSelect2);
flexRadioDefault2.addEventListener('click', setSelect4);
flexRadioDefault2.addEventListener('click', setSelect6);

flexRadioDefault3.addEventListener('click', setSelect3);

flexRadioDefault4.addEventListener('click', setSelect5);

flexRadioDefault5.addEventListener('click', setSelect7);


function hiddenCombo() {    

    document.getElementById("content").style.display = "none"; 
}

function showCombo() {   

    document.getElementById("content").style.display = "inline";
}

window.onload = function() {

    xhttpAssincrono(carryUsers,1);
}

function carryUsers(f){
    
    var users = JSON.parse(f)   

    var comboUsers = document.getElementById("comboUsers");

    for(i = 0; i < users.length; i++){

        var option = document.createElement("option");        
        option.value = users[i].id;
        option.innerHTML = users[i].name;
        comboUsers.appendChild(option);
    }   
}

function selectUserPosts() {

    var comboUsers = document.getElementById("comboUsers");  
    var a = comboUsers.selectedIndex;
      
    if (flexRadioDefault1.checked && comboUsers.value > 0) {
        showPosts(a);        
    }
}

function setSelect() {

    selectUserPosts();
}

function showPosts(i) {
   
    xhttpAssincrono(carryPosts,2,i);   
}

function carryPosts(f){
    
    removeList();

    var posts = JSON.parse(f)

    document.getElementById('titulo').innerHTML = "Posts do usu??rio";
    var list = document.getElementById("list");
    
    for(i = 0; i < posts.length; i++){
         
        var item = document.createElement("li");        
        item.innerHTML = posts[i].title;
        list.appendChild(item);       
    }   
}

function selectUserTodos() {

    var comboUsers = document.getElementById("comboUsers");  
    var a = comboUsers.selectedIndex;
      
    if (flexRadioDefault2.checked && comboUsers.value > 0 && flexRadioDefault3.checked) {
        showTodos(a);
    }
}

function setSelect2() {

    selectUserTodos();
}

function setSelect3() {

    selectUserTodos();
}

function showTodos(i) {
   
    xhttpAssincrono(carryTodos,3,i);   
}

function carryTodos(f){
    
    removeList();

    var posts = JSON.parse(f)

    document.getElementById('titulo').innerHTML = "Tarefas do usu??rio";
    var list = document.getElementById("list");
    
    for(i = 0; i < posts.length; i++){
         
        var item = document.createElement("li");        
        item.innerHTML = "Conclu??da: " + posts[i].completed + " - " + posts[i].title;
        list.appendChild(item);       
    }   
}

function selectTodosFinished() {

    var comboUsers = document.getElementById("comboUsers");  
    var a = comboUsers.selectedIndex;
      
    if (flexRadioDefault2.checked && comboUsers.value > 0 && flexRadioDefault4.checked) {
        showFinished(a);
    }
}

function setSelect4() {

    selectTodosFinished();
}

function setSelect5() {

    selectTodosFinished();
}

function showFinished(i) {
   
    xhttpAssincrono(carryFinished,3,i);   
}

function carryFinished(f){
    
    removeList();

    var posts = JSON.parse(f)

    document.getElementById('titulo').innerHTML = "Tarefas do usu??rio";
    var list = document.getElementById("list");
    
    for(i = 0; i < posts.length; i++){
        
        if (posts[i].completed == true) {
            var item = document.createElement("li");        
            item.innerHTML = "Conclu??da: " + posts[i].completed + " - " + posts[i].title;
            list.appendChild(item); 
        }      
    }   
}

function selectTodosIncompleted() {

    var comboUsers = document.getElementById("comboUsers");  
    var a = comboUsers.selectedIndex; 
 

    if (flexRadioDefault2.checked && comboUsers.value > 0 && flexRadioDefault5.checked) {
        showIncompleted(a);    }
}

function setSelect6() {

    selectTodosIncompleted();
}

function setSelect7() {

    selectTodosIncompleted();
}

function showIncompleted(i) {
   
    xhttpAssincrono(carryIncompleted,3,i);   
}

function carryIncompleted(f){
    
    removeList();

    var posts = JSON.parse(f)

    document.getElementById('titulo').innerHTML = "Tarefas do usu??rio";
    var list = document.getElementById("list");
    
    for(i = 0; i < posts.length; i++){
        
        if (posts[i].completed == false) {
            var item = document.createElement("li");        
            item.innerHTML = "Conclu??da: " + posts[i].completed + " - " + posts[i].title;
            list.appendChild(item); 
        }      
    }   
}

function removeList() {

    var list = document.getElementById("list");

    while (list.hasChildNodes()) {

        list.removeChild(list.firstChild);
    }
}


/*
 * Fun????o AJAX base do tipo ass??ncrona.
 * type ?? o tipo de objeto que voc?? quer recuperar.
 * value ?? o valor do par??metro para filtrar os resultados dos tipos 2, 3 e 4.
 * [Importante!] Voc?? n??o pode, em nenhuma hip??tese, alterar a fun????o xhttpAssincrono.
 */
function xhttpAssincrono(callBackFunction, type, value) {
    var xhttp = new XMLHttpRequest();;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // Chama a fun????o em callback e passa a resposta da requisi????o
            callBackFunction(this.responseText);
        }
    };
    // Path para a requisi????o AJAX.
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