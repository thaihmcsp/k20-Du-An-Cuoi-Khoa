// var data = [
//     {
//         listimg:[ 'https://lzd-img-global.slatic.net/g/p/44c468411ab6380ac6cb1100dc20d2a0.jpg_720x720q80.jpg_.webp', 'https://lzd-img-global.slatic.net/g/tps/tfs/TB1oP2bbQvoK1RjSZFNXXcxMVXa-300-200.png',
//                 'https://lzd-img-global.slatic.net/g/p/cc01b830cacdd0b8c356266dad0f54da.jpg_120x120q80.jpg_.webp', 'https://lzd-img-global.slatic.net/g/p/44c468411ab6380ac6cb1100dc20d2a0.jpg_120x120q80.jpg_.webp',
//                 'https://lzd-img-global.slatic.net/g/p/25bc4432e5c27c8680c2e74dcf2d1991.jpg_120x120q80.jpg_.webp', 'https://lzd-img-global.slatic.net/g/p/d3a1835e242b937339080e9a50bbbcc2.jpg_120x120q80.jpg_.webp' ,
//                 'https://lzd-img-global.slatic.net/g/p/04ec0026a254d801e454387b331764ee.jpg_120x120q80.jpg_.webp', 'https://lzd-img-global.slatic.net/g/p/bd8afa6e8b4239a4cf0b6dc7d032ec54.jpg_120x120q80.jpg_.webp' ,
//                  'https://lzd-img-global.slatic.net/g/p/09fefcc45df0e5b52f546f1e0c447fdc.jpg_120x120q80.jpg_.webp' ]
//     }
// ]
// const data = $.ajax({
//     url:'/product/:id',
//     type: 'GET'
// })
// console.log(14,data);

// data.map(function(ele){
//     ele.listimg.map(function(image){
//         // console.log(image);
//         let img = `<img src="${image}" style=""; class="smallImg" > `
//         // $('.img-next-slick').append(img)
//     })
    
// })
$('.smallImg').on('mouseover', function(){
    // console.log(this);
    const link = $(this).attr('src')
    const id = $(this).attr('id')
    $('.bigImg').attr('src', link)
    $('.bigImg').attr('id', 'myimage' + id)
    $(this).css({ border: "1px solid red" })
})
$('.smallImg').on('mouseout', function(){
    $(this).css({ border: "" })
})

function next(len){
    max = len * 50 - 100
    let right = $('.img-next-slick img').attr('style')
    if (!right) {
        right = 0
    } else {
        let value = right.split(' ')[1].split('')
        let length = value.length
        value.splice(length-3,3)
        right = value.join('')        
    }
    if (max > right * 1 ) {
        // $('.img-next-slick img').css({ right: ` ${right*1 + 50}px ` })
        $('.img-next-slick img').css({ right: ` ${right}px ` })
        $('.img-next-slick img').animate({
            right : '+=200px'
        },500)
    }
    
}

function back(){
    let right = $('.img-next-slick img').attr('style')
    // console.log(right);
    if (!right) {
        right = 0
    } else {
        let value = right.split(' ')[1].split('')
        let length = value.length
        value.splice(length-3,3)
        right = value.join('')
    }
    if (right > 0) {
        // $('.img-next-slick img').css({ right: ` ${right*1 - 50}px ` })
        $('.img-next-slick img').css({ right: ` ${right}px ` })
        $('.img-next-slick img').animate({
            right : '-=200px'
        },500)
    }   
}
function down(){
    let number = $('#number-sp').val()
    if(number > 1){
        $('#number-sp').val(number*1 - 1)
    }
}

function up(){
    let number = $('#number-sp').val()
    $('#number-sp').val(number*1 + 1)
}
// hiệu ứng mouse chuột qua hình ảnh chọn màu
$('.img-sp img').on('mouseover', function(){
    const mau = $(this).attr('alt')
    $('.ten-mau span').html(mau)
    $(this).css({ border: "1px solid red" })    
})
$('.img-sp img').on('mouseout', function(){
    if ($(this).attr('class') === 'image-mau') {
        $(this).css({ border: "" })
        $('.ten-mau span').html('Vui lòng chọn')
    }   
})
// hiệu ứng mouse chuột qua nút chon size
$('.btn-sp button').on('mouseover', function(){
    const mau = $(this).attr('alt')
    $('.ten-size span').html(mau)
    $(this).css({ border: "1px solid red" })    
})
$('.btn-sp button').on('mouseout', function(){
    if ($(this).attr('class') === 'btn-size') {
        $(this).css({ border: "" })
        $('.ten-size span').html('Vui lòng chọn')
    }   
})
// chọn màu
$('.image-mau').on("click", function(){
    const select = $(this).attr('class')
    const mau = $(this).attr('alt')
    // console.log(100,$(this).attr('class'));
    if (select === 'image-mau') {
        $('.mau-chon').attr({class:"image-mau"})
        $('.image-mau').css({ border: "" })
        $(this).attr({class:"mau-chon"})
        $('.ten-mau span').html(mau)
        
    } else {
        $(this).attr({class:"image-mau"})
        $('.ten-mau span').html('Vui lòng chọn')
    }
    // console.log(107,$(this).attr('class'));
})
// chọn size
$('.btn-size').on("click", function(){
    const select = $(this).attr('class')
    const mau = $(this).attr('alt')
    // console.log(100,$(this).attr('class'));
    if (select === 'btn-size') {
        $('.size-chon').attr({class:"btn-size"})
        $('.btn-size').css({ border: "" })
        $(this).attr({class:"size-chon"})
        $('.ten-size span').html(mau)
        
    } else {
        $(this).attr({class:"btn-size"})
        $('.ten-size span').html('Vui lòng chọn')
    }
    // console.log(107,$(this).attr('class'));
})

// imageZoom("myimage", "myresult");
function imageZoom(imgID, resultID) {
    console.log(109,imgID,resultID);

    var img, lens, result, cx, cy;
    img = document.getElementById(imgID);
    result = document.getElementById(resultID);
    /*tạo ống kính:*/
    lens = document.createElement("DIV");
    lens.setAttribute("class", "img-zoom-lens");
    /*chèn ống kính:*/
    img.parentElement.insertBefore(lens, img);
    /*tính toán tỷ lệ giữa kết quả DIV và thấu kính*/
    cx = result.offsetWidth / lens.offsetWidth;
    cy = result.offsetHeight / lens.offsetHeight;
    /*đặt thuộc tính nền cho kết quả DIV:*/
    result.style.backgroundImage = "url('" + img.src + "')";
    result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
    /*thực thi một chức năng khi ai đó di chuyển con trỏ qua hình ảnh hoặc ống kính:*/
    lens.addEventListener("mousemove", moveLens);
    img.addEventListener("mousemove", moveLens);
    /*và cả đối với màn hình cảm ứng:*/
    lens.addEventListener("touchmove", moveLens);
    img.addEventListener("touchmove", moveLens);
    function moveLens(e) {
      var pos, x, y;
      /*ngăn chặn bất kỳ hành động nào khác có thể xảy ra khi di chuyển qua hình ảnh:*/
      e.preventDefault();
      /*lấy vị trí x và y của con trỏ:*/
      pos = getCursorPos(e);
      /*tính vị trí của thấu kính*/
      x = pos.x - (lens.offsetWidth / 2);
      y = pos.y - (lens.offsetHeight / 2);
      /*ngăn không cho ống kính được định vị bên ngoài hình ảnh:*/
      if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
      if (x < 0) {x = 0;}
      if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
      if (y < 0) {y = 0;}
      /*đặt vị trí của thấu kính::*/
      lens.style.left = x + "px";
      lens.style.top = y + "px";
      /*hiển thị những gì ống kính "nhìn thấy":*/
      result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
    }
    function getCursorPos(e) {
      var a, x = 0, y = 0;
      e = e || window.event;
      /*get the x and y positions of the image:*/
      a = img.getBoundingClientRect();
      /*tính toán tọa độ x và y của con trỏ, liên quan đến hình ảnh*/
      x = e.pageX - a.left;
      y = e.pageY - a.top;
      /*xem xét bất kỳ cuộn trang nào:*/
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {x : x, y : y};
    }
  }

// $('.img1 img').on('mouseover',function(){
//     // $(this).css({ border: "1px solid red" })
//     $('.img-zoom-result').show()
//     // 
//     // const link = $(this).attr('src')
//     // const id = $(this).attr('id')
//     // $('.bigImg').attr('src', link)
//     // console.log(171,id);
//     // imageZoom(id, "myresult");
// })
// $('.img1 img').on('mouseout',function(){
//     // $(this).css({ border: "" })
//     $('.img-zoom-result').hide()
//     // imageZoom(0, "myresult");
// })
$('.img-zoom-result').hide()

// tính giá sp sau khi giảm theo %
$('.numbers').html()
$('.phan-tram-giam').html()
const price = Number($('.numbers').html())
const phantram = $('.phan-tram-giam').html()*0.01
$('.price').html((price + price * phantram).toLocaleString("vi"))
$('.numbers').html(Number($('.numbers').html()).toLocaleString("vi"))