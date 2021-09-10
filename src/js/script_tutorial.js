const arr_item = [];
function check_name(id) {
    var slider = document.getElementById('customRange1');
    var output = document.getElementById('showvalue');
    var cap = document.getElementById('capacity');
    if (id == "milk_powder") {
        slider.step = 0.5;
        slider.min = 0;
        slider.max = 5;
        slider.value = 2;
        output.innerHTML = slider.value;
        cap.innerHTML = "muỗm";
    } else {
        slider.step = 5;
        slider.min = 0;
        slider.max = 250;
        slider.value = 55;
        output.innerHTML = slider.value;
        cap.innerHTML = "ml";
    }
}

function reply_click(clicked_id) {
    var str;
    var ele_name = document.getElementById('ele_name');
    if (clicked_id == "milk") {
        str = "Sữa";
    } else if (clicked_id == "milk_powder") {
        str = "Sữa bột";
    } else if (clicked_id == "sugar") {
        str = "Đường";
    } else if (clicked_id == "hot_water") {
        str = "Nước nóng";
    } else if (clicked_id == "tea") {
        str = "Trà";
    } else {
        str = clicked_id;
    }
    check_name(clicked_id);
    // alert(clicked_id);
    ele_name.innerHTML = str;
    document.getElementById("staticBackdropLabel").innerHTML = str;
}

// function more_click(id, name){

// }

// function more_item() {
//     arr_item.forEach(data => {
//         alert(data);
//     })
// } 

// function normalize (alias) {
//     var str = alias;
//     str = str.toLowerCase();
//     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
//     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
//     str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
//     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
//     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
//     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
//     str = str.replace(/đ/g,"d");
//     str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
//     str = str.replace(/ + /g," ");
//     str = str.trim(); 
//     arr_item.push(str);
//     return str;
// }

// function updateTextInput(val) {
//   document.getElementById('textInput').value = val;
// }

function addboard() {
    const ele = document.getElementById('ele_name').textContent;
    const value = document.getElementById('showvalue').textContent;
    const cap = document.getElementById('capacity').textContent;
    // alert(ele);
    const li = document.createElement('li');
    const node = document.createTextNode(ele + ": " + value + " " + cap);
    li.appendChild(node);
    const element = document.getElementById('ele_selected');
    element.appendChild(li);
}

function check_src_image() {
    const image = document.getElementById('myCup');
    if(image.src === ''){
        alert('Bạn chưa chọn size!\r\nMặc định size M\r\nCó thể chọn size khác ở lựa chọn bên dưới!');
        image.src='/image/plastic-cup.png';
        image.style.height='80%';
        document.getElementById('btnM').disabled = true;
    }
}

function change_cup(value){
    const image = document.getElementById('myCup');
    const check_bar = document.getElementById('ele_selected');
    const btnM = document.getElementById('btnM');
    const btnL = document.getElementById('btnL');
    if(value == 0){
        if(check_bar.innerHTML === ''){
            image.src='/image/plastic-cup.png';
            image.style.height='80%';
            btnM.disabled = true;
            btnL.disabled = false;
        } else {
            if (confirm('Chuyển size cốc sẽ xoá thông tin vừa nhập size L.\r\nBạn chắc chứ ?')){
                image.src='/image/plastic-cup.png';
                image.style.height = '80%';
                check_bar.innerHTML = '';
                btnM.disabled = true;
                btnL.disabled = false;
            }
        }
    }else{
        if(check_bar.innerHTML === ''){
            image.src='/image/plastic-cup700.png';
            image.style.height='82%';
            btnL.disabled = true;
            btnM.disabled = false;
        } else {
            if (confirm('Chuyển size cốc sẽ xoá thông tin vừa nhập size M.\r\nBạn chắc chứ ?')){
                image.src='/image/plastic-cup700.png';
                image.style.height='82%';
                check_bar.innerHTML = '';
                btnL.disabled = true;
                btnM.disabled = false;
            }
        }
    }
}