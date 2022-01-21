const main = document.getElementById('main');

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



