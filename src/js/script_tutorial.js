function name_product(name) {
    var idTop = document.getElementById('nameProduct');
    idTop.innerHTML = name;
}



function check_name(id) {
    var slider = document.getElementById('customRange1');
    var output = document.getElementById('showvalue');
    var cap = document.getElementById('capacity');
    if (id == "milk_powder") {
        slider.step = 0.5;
        slider.min = -1;
        slider.max = 5;
        slider.value = 2;
        output.innerHTML = slider.value;
        cap.innerHTML = "muỗm";
    } else {
        slider.step = 5;
        slider.min = -20;
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

function addboard() {
    const ele = document.getElementById('ele_name').textContent;
    const value = document.getElementById('showvalue').textContent;
    const cap = document.getElementById('capacity').textContent;
    
    const li = document.createElement('li');
    const span = document.createElement('span');
    const p = document.createElement('p');

    const spans = document.getElementById('ele_selected').getElementsByTagName('span');
    const ps = document.getElementById('ele_selected').getElementsByTagName('p');

    if (spans.length > 0) {
        for (let i = 0; i < spans.length; i++) {
            if (ele == spans[i].textContent) {
                // var lis = document.getElementById('ele_selected').getElementsByTagName('li');
                var new_value = parseFloat(value) + parseFloat(ps[i].textContent);
                ps[i].textContent = new_value;
                return;
            }
        }
        initElement(ele, value, cap, span, p, li);
    } else {
        initElement(ele, value, cap, span, p, li);
    }
}

function initElement(ele, value, cap, span, p, li) {
    let nodeSpan = document.createTextNode(ele);
    span.appendChild(nodeSpan);

    let nodeP = document.createTextNode(value);
    p.appendChild(nodeP);

    // const node = document.createTextNode(ele + ": " + value + " " + cap);
    // li.appendChild(node);
    li.append(span, document.createTextNode(': '), p, document.createTextNode(' ' + cap));

    let element = document.getElementById('ele_selected');
    element.appendChild(li);
}

function check_src_image() {
    const image = document.getElementById('myCup');
    if (image.src === '') {
        alert('Bạn chưa chọn size!\r\nMặc định size M\r\nCó thể chọn size khác ở lựa chọn bên dưới!');
        image.src = '/image/plastic-cup.png';
        image.style.height = '80%';
        document.getElementById('btnM').disabled = true;
    }
}

function change_cup(value) {
    const image = document.getElementById('myCup');
    const check_bar = document.getElementById('ele_selected');
    const btnM = document.getElementById('btnM');
    const btnL = document.getElementById('btnL');
    if (value == 0) {
        if (check_bar.innerHTML === '') {
            image.src = '/image/plastic-cup.png';
            image.style.height = '80%';
            btnM.disabled = true;
            btnL.disabled = false;
        } else {
            if (confirm('Chuyển size cốc sẽ xoá thông tin vừa nhập size L.\r\nBạn chắc chứ ?')) {
                image.src = '/image/plastic-cup.png';
                image.style.height = '80%';
                check_bar.innerHTML = '';
                btnM.disabled = true;
                btnL.disabled = false;
            }
        }
    } else {
        if (check_bar.innerHTML === '') {
            image.src = '/image/plastic-cup700.png';
            image.style.height = '82%';
            btnL.disabled = true;
            btnM.disabled = false;
        } else {
            if (confirm('Chuyển size cốc sẽ xoá thông tin vừa nhập size M.\r\nBạn chắc chứ ?')) {
                image.src = '/image/plastic-cup700.png';
                image.style.height = '82%';
                check_bar.innerHTML = '';
                btnL.disabled = true;
                btnM.disabled = false;
            }
        }
    }
}
