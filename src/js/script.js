var drake = dragula([document.querySelector('.dragTo'), document.querySelector('.menuitem')])

drake.on('drag', function(el, source){
  document.getElementsByTagName('body')[0].style.backgroundColor = '#28a0ef';
  if (source.className === 'dragTo'){
    el.children[0].style.color = '#218ee2';
    el.children[0].innerHTML = 'Drag Me!';
    source.style.border = '1px dashed white';
  }
});

drake.on('drop', function(el, target){
  if(target.className === 'dragTo'){
    document.getElementsByTagName('body')[0].style.backgroundColor = '#00cbb5';
    el.children[0].style.color = '#00cbb5';
    el.children[0].innerHTML = 'Niiiiceê :)';
    target.style.border = 'none';
  }else{
    document.getElementsByTagName('body')[0].style.backgroundColor = '#218ee2';

  }
})