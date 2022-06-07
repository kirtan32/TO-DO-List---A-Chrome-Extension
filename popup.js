//localStorage.setItem('todo',JSON.stringify(new Array));
   

var color1="#ffffff";//default
var color2="#ffffff";//default
var color3="#ff00cd";//default

function light_theme(){

    localStorage.setItem('theme',"10");

    document.body.style.backgroundColor="#ffffff";
    document.getElementById('container').style.borderColor="#000000";
    document.getElementById('date').style.color="#000000";
    document.getElementById('title').style.color="#000000";
    
    document.getElementById('clear').style.borderColor="#000000";
    document.getElementById('clear').style.background="#ffffff";
    document.getElementById('clear').style.color="#0000ff";

    document.getElementById('add').style.color="#000000";
    document.getElementById('add').style.borderColor="#000000";
    document.getElementById('add').style.background="#ffffff";

    document.getElementById('task').style.color="#000000";
    document.getElementById('task').style.borderColor="#000000";
    document.getElementById('task').style.background="#ffffff";

    color1="#000000";
    color2="#0000ff";
    color3="#ff00cd";
    show();
    
}

function dark_theme(){

    localStorage.setItem('theme',"20");

    document.body.style.backgroundColor="#1a1a1a";
    document.getElementById('container').style.borderColor="#ffffff";
    document.getElementById('date').style.color="#ffffff";
    document.getElementById('title').style.color="#ffffff";

    document.getElementById('clear').style.borderColor="#ffffff";
    document.getElementById('clear').style.background="#000000";
    document.getElementById('clear').style.color="#00ffff";

    document.getElementById('add').style.color="#ffffff";
    document.getElementById('add').style.borderColor="#ffffff";
    document.getElementById('add').style.background="#000000";

    document.getElementById('task').style.color="#ffffff";
    document.getElementById('task').style.borderColor="#ffffff";
    document.getElementById('task').style.background="#000000";
    
    color1 = "#ffffff";
    color2 = "#00ffff";
    color3 ="#ff00cd";
    show();
}

function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str != null) {
        todos = JSON.parse(todos_str);
    }
    return todos;
}
function add() {
    var mytask = document.getElementById('task').value.trim();
    var task="";
    var flag=0;
    
    while(flag!=1)
    {
        if(mytask.length>=35)
        {
            task+=mytask.substring(0,35)+"\n";
            mytask=mytask.substring(35,mytask.length);    
        }
        else
        {
            task+=mytask;
            flag=1;
        }
    }
    if(task == "")
    {
      document.getElementById('task').value=null;
      document.getElementById('task').focus();
      return;
    }
    var todos = get_todos();
    todos.push(task);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
    document.getElementById('task').value=null;
    document.getElementById('task').focus();

    return false;
}
function RemoveTODO() {

    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    show();
    return false;
}

function clearAll(){
    localStorage.setItem('todo',JSON.stringify(new Array));
    show();
}

function setTheme() {

    var colormode = localStorage.getItem('theme');
    if(colormode == "10")
    {
        light_theme();
    }
    else if(colormode == "20")
    {
        dark_theme();
    }
    else
    {
        light_theme();
    }

}
function show() {

    var todos = get_todos();
    
    var html = '<table class="table" id="table">';
    for(var i=0; i<todos.length; i++) {
        if(i%2==0)
        {
            html += '<tr><td class="td1">'+(i+1)+'</td><td class="td21" id="td21" style="color:'+color1+'">'+todos[i]+'</td><td class="td3">'+'<input type = "checkbox" class="RemoveTODO" id="' + i  + '"></td></tr>';
        }
        else
        {
            html += '<tr><td class="td1">'+(i+1)+'</td><td class="td22" id="td22" style="color:'+color2+'">'+todos[i]+'</td><td class="td3">'+'<input type = "checkbox" class="RemoveTODO" id="' + i  + '"></td></tr>';
        }
        
    };
    
    html += '</table>';
    if(todos.length==0 || todos==null)
    {
        html = '<h3 style="color:gray;">No TODOs</h3>'
    }
        
    chrome.action.setBadgeText({text: todos.length.toString()});
    document.getElementById('todos').innerHTML = html;
    var buttons = document.getElementsByClassName('RemoveTODO');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', RemoveTODO);
    };

    // var myEle = document.getElementById("table");
    // if(myEle){
    //     if(localStorage.getItem('theme')=='10')
    //     {
    //         document.getElementById('table').style.color="#000000";
    //     }
    //     else if(localStorage.getItem('theme')=='20')
    //     {
    //         document.getElementById('table').style.color="#ffffff";
    //     }
    // }

}
// If enter key is pressed , click event is called of add button
document.getElementById("task").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("add").click();
    }
});

var date = new Date();
document.getElementById("date").innerHTML = date.toDateString();

document.getElementById('add').addEventListener('click', add);
document.getElementById('clear').addEventListener('click', clearAll);

document.getElementById('theme1').addEventListener('click', light_theme);
document.getElementById('theme2').addEventListener('click', dark_theme);

document.getElementById('task').focus();

setTheme();