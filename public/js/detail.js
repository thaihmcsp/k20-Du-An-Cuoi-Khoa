render()
pointerImg()

// hiệu ứng mouse chuột qua smallImg
function pointerImg(){
    $('.smallImg').on('mouseover', function(){
        console.log(4,this);
        const link = $(this).attr('src')
        const id = $(this).attr('id')
        $('.bigImg').attr('src', link)
        $('.bigImg').attr('id', 'myimage' + id)
        $(this).css({ border: "1px solid green" })
    })
    $('.smallImg').on('mouseout', function imgBigOff(){
        $(this).css({ border: "" })
    })
}

// next - back div link ảnh sản phẩm
$('.img-line .back').css({ cursor: 'pointer' })
$('.img-line .next').css({ cursor: 'pointer' })
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
        $('.img-line .back').css({ cursor: 'pointer' })
    }else{
        $('.img-line .next').css({ cursor: 'not-allowed' })
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
        $('.img-line .next').css({ cursor: 'pointer' })
    }else{
        $('.img-line .back').css({ cursor: 'not-allowed' })
    }   
}
// + - số lượng sản phẩm
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
    const link = $(this).attr('src')
    const id = $(this).attr('id')
    $('.bigImg').attr('src', link)
    $('.bigImg').attr('id', 'myimage' + id)
    $(this).css({ border: "1px solid red" })  
    render()
})
$('.img-sp img').on('mouseout', function(){
    const mau = $(this).attr('alt')
    if ($(this).attr('class') === 'image-mau') {
        $(this).css({ border: "" })
        $('.ten-mau span').html('Vui lòng chọn')
    }
    render()
})
// hiệu ứng mouse chuột qua nút chon size
$('.btn-sp button').on('mouseover', function(){
    const mau = $(this).attr('alt')
    $('.ten-size span').html(mau)
    $(this).css({ border: "1px solid red" })   
    render() 
})
$('.btn-sp button').on('mouseout', function(){
    if ($(this).attr('class') === 'btn-size') {
        $(this).css({ border: "" })
        $('.ten-size span').html('Vui lòng chọn')
    }   
    render()
})

function render(){
    $('.mau-da-chon').html($('.mau-chon').attr('alt'))
    $('.ten-size span').html($('.size-chon').attr('alt'))
}

// chọn color
$('.image-mau').on("click", function(){
    const select = $(this).attr('class')
    const mau = $(this).attr('alt')
    // console.log(100,$(this).attr('class'));
    if (select === 'image-mau') {
        $('.mau-chon').attr({class:"image-mau"})
        $('.image-mau').css({ border: "" })
        $(this).attr({class:"mau-chon"})
        $('.ten-mau span').html($(this).attr('alt'))
        console.log(1111,$(this).attr('alt'));
        change($(this).attr('alt'),$('.name-sp').attr('alt')) // đổi link ảnh trên class smallImg
        checksize($(this).attr('alt'),$('.name-sp').attr('alt')) // check size
        render()
    } else {
        $(this).attr({class:"image-mau"})
        $('.ten-mau span').html('Vui lòng chọn')
        for (let i = 0; i < $('.btn-sp').length; i++) {
            if ($(`#size-sp${i*2}`).attr('disabled',false) === -1) {
                $(`#size-sp${i*2}`).attr('disabled',true)
            }
        }
        render()
    }
    console.log(107,$(this).attr('class'));
})
// check size từ color đã chọn
async function checksize(mau,idcode){ 
 try {
    // console.log(129,mau);
    // console.log(130,idcode);
    const res = await $.ajax({
        url : '/product/check/size',
        type : 'GET',
        data: {mau:mau,idcode:idcode}
    })
    console.log(137,res);
    // console.log(138,$('.btn-sp').length);
    for (let i = 0; i < $('.btn-sp').length; i++) {
        const checksize = res.indexOf($(`#size-sp${i*2}`).attr('alt'))
        // console.log(1400, $(`#size-sp${i*2}`).attr('alt'));
        // console.log(checksize);
        if (checksize === -1) {
            $(`#size-sp${i*2}`).attr('disabled',true)
        }else{
            $(`#size-sp${i*2}`).attr('disabled',false)
        }
    }
 } catch (error) {
    console.log(error);
 }
}
// đoi link ảnh smallimg khi chọn color
async function change(mau,idcode){ 
 try {
    // console.log(114,mau);
    // console.log(115,idcode);
    const res = await $.ajax({
        url : '/product/change/mau',
        type : 'GET',
        data: {mau:mau,idcode:idcode}
    })
    // console.log(117,res);
    $('.block-left').html(res)
    pointerImg() // zoom ảnh lên bigImg
    zoombigImg() // zoom in ảnh từ bigImg
 } catch (error) {
    console.log(error);
 }
}
// chọn size
$('.btn-size').on("click", function(){
    const select = $(this).attr('class')
    const mau = $(this).attr('alt')
    // console.log(100,$(this).attr('alt'));
    if (select === 'btn-size') {
        $('.size-chon').attr({class:"btn-size"})
        $('.btn-size').css({ border: "" })
        $(this).attr({class:"size-chon"})
        $('.ten-size span').html(mau)
        checkcolor($(this).attr('alt'),$('.name-sp').attr('alt')) // check color
    } else {
        $(this).attr({class:"btn-size"})
        $('.ten-size span').html('Vui lòng chọn')
        for (let i = 0; i < $('.img-sp').length; i++) {
            $(`#mau-sp${i*2}`).show(1000)
        }
    }
    // console.log(107,$(this).attr('class'));
    render()
})
// check color từ size đã chọn
async function checkcolor(size,idcode){ 
    try {
       console.log(193,size);
       console.log(194,idcode);
       const res = await $.ajax({
           url : '/product/check/color',
           type : 'GET',
           data: {size:size,idcode:idcode}
       })
    //    console.log(137,res);
    //    console.log(138,$('.img-sp').length);
       for (let i = 0; i < $('.img-sp').length; i++) {
           const checksize = res.indexOf($(`#mau-sp${i*2}`).attr('alt'))
        //    console.log(2500, $(`#mau-sp${i*2}`).attr('alt'));
        //    console.log(checksize);
           if (checksize === -1) {
            // $(`#mau-sp${i*2}`).slideToggle(1000)
            $(`#mau-sp${i*2}`).hide(1000)
           }else{
            $(`#mau-sp${i*2}`).show(1000)
           }
       }
    } catch (error) {
       console.log(error);
    }
}
zoombigImg()
// imageZoom("myimage", "myresult");
//zoom ảnh bigImg
function zoombigImg(){
    $('.img1 img').on('mouseover',function(){
        $('.img-zoom-result').show()
        const id = $('.bigImg').attr('id')
        imageZoom(`${id}`, "myresult");
    })
    $('.img1').on('mouseleave',function(){
        $('.img-zoom-result').hide()
        $('.img-zoom-lens').remove() // xóa ống kính cũ
    })
}
$('.img-zoom-result').hide()

function imageZoom(imgID, resultID) {
    console.log(109,imgID,resultID);
    $('.img-zoom-lens').remove() // xóa ống kính cũ
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

// tính giá sp sau khi giảm theo %
$('.numbers').html()
$('.phan-tram-giam').html()
const price = Number($('.numbers').html())
const phantram = $('.phan-tram-giam').html()*0.01
$('.price').html(Math.floor( (price + price * phantram).toLocaleString("vi") ).toFixed(3))
$('.numbers').html(Number($('.numbers').html()).toLocaleString("vi"))

// add Cart
async function addCart(){
    try {
        const mauchon = $('.mau-chon').attr('alt')
        const sizechon = $('.size-chon').attr('alt')
        const idchon = $('.name-sp').attr('alt')
        const soluong = $('#number-sp').val()
        if (mauchon === undefined || sizechon === undefined) {
            $('.cart-text').html('Vui lòng chọn màu và size ')
            $('.modal-body span,.modal-body i').css({color: "red"})
        } else {
            const res = await $.ajax({
                url : `/product/check/${mauchon}&${sizechon}&${idchon}&${soluong}`,
                type : 'GET'
            })
            if (res._id) { // check có id ko
                console.log(325,res._id);
                const update = await $.ajax({ // update data đã có
                    url: '/cart/update',
                    type: 'PUT',
                    data: {productID: res._id, quantity: soluong}
                })
                console.log(339,update.modifiedCount);
                if (update.modifiedCount) {
                    console.log(341,update);
                } else {
                    const data = await $.ajax({ // tạo mới data
                    url: '/cart/create',
                    type: 'POST',
                    data: {productID: res._id,  quantity: soluong}
                    })
                    console.log(348,data);
                }
                
                $('.cart-text').html('Thêm vào giỏ hàng thành công')
                $('.modal-body span,.modal-body i').css({color: "#4caf50"})
            } else {
                console.log(356,res.mess);
                console.log(357,res.quantity);
                $('.cart-text').html(res.mess +'. Tối đa : '+ res.quantity)
                $('.modal-body span,.modal-body i').css({color: "red"})
            }
            
        }
        
    } catch (error) {
        console.log(error);
    }
}
