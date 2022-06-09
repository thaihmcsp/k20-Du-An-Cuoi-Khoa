findaddress()

$('.edit').on('click',function(){
    $('.offchangeaddress').hide()
    $('.onEdit').show()
})
$('.v2-title-wrapper-edit').on('click',function(){
    $('.offchangeaddress').show()
    $('.onEdit').hide()
})
$('.toast').css('display','none');

async function findaddress(){
    try {
        // lấy địa chi các tỉnh thành việt nam
        $.ajax({
            url: 'https://provinces.open-api.vn/api/?depth=1',
            type:'GET'
        })
        .then(function (data) {
            // console.log(data);
            let datatinh = $('.adress_tinh').html()
                for (let i = 0; i < data.length; i++) {      
                    datatinh += `<option value='${data[i].name}'> ${data[i].name} </option>`
                }
            $('.adress_tinh').html(datatinh)
        })
        .catch(function (err) {
            console.log(err);
        })
        
        $('.checkout_adress').hide()

        const data = await $.ajax({ // tạo mới data
            url: '/order/checkadress',
            type: 'GET',
        })
        // console.log(29,data);
        if (data) {
            $('.checkout_adress').show()
            $('.mod-guest-register').hide()
            $('.v2-address-title').html(data.name)
            $('.v2-mobile').html(data.phone)
            $('.add-diachi').html(data.type)
            $('.address-user').html(data.address)
            $('.v2-title-wrapper').attr('alt',data._id)
            console.log(12,$('.add-diachi').html());
            van_phong()
        }
        if ($('.v2-mobile').html() !== '' & $('.address-user').html() !== '') {
            $('.dat-hang').css({'background-color' : 'rgb(245, 114, 36)'})
        }
    } catch (error) {
        console.log(error);
    }
}

async function chonTinh(obj){
    try {
        if ($('.adress_tinh').val() !== '') {
            $('.tinh span').html('')
            $('.adress_tinh').css('border','1px solid #ddd')
        }
        if ($('.adress_tinh7').val() !== '') {
            $('.tinh span').html('')
            $('.adress_tinh7').css('border','1px solid #ddd')
        }
        // Lấy danh sách các options
        var options = obj.children;
        // Biến lưu trữ các chuyên mục đa chọn
        var html = '';
        // lặp qua từng option và kiểm tra thuộc tính selected
        for (var i = 0; i < options.length; i++){
            if (options[i].selected){
                html += options[i].value;
                $('.adress_tinh').attr('alt',html)
                renderTinhThanh()
                renderpointer()
            }
        }
    } catch (error) {
        console.log(error);
    }
}
function renderTinhThanh(){
    if ($('.adress_tinh').attr('alt') !== '') {
        $.ajax({
            url: 'https://provinces.open-api.vn/api/?depth=2',
            type:'GET'
        })
        .then(function (data) {
            const data1 = data.find(function(a){
               return a.name === $('.adress_tinh').attr('alt')
            })            
            let dataquan = ''
                for (let i = 0; i < data1.districts.length; i++) {      
                    dataquan += `<option value='${data1.districts[i].name}_${data1.districts[i].code}'> ${data1.districts[i].name} </option>`
                }
            $('.adress_quan').html(dataquan)
        })
        .catch(function (err) {
            console.log(err);
        })
    } 
}
async function chonQuan(obj){
    try {
        if ($('.adress_quan').val() !== '') {
            $('.quan span').html('')
            $('.adress_quan').css('border','1px solid #ddd')
        }
        if ($('.adress_quan7').val() !== '') {
            $('.quan span').html('')
            $('.adress_quan7').css('border','1px solid #ddd')
        }
        // Lấy danh sách các options
        var options = obj.children;
        // Biến lưu trữ các chuyên mục đa chọn
        var html = '';
        // lặp qua từng option và kiểm tra thuộc tính selected
        for (var i = 0; i < options.length; i++){
            if (options[i].selected){
                html += options[i].value;
                $('.adress_quan').attr('alt',html)
                renderPhuongXa(($('.adress_quan').attr('alt')).split("_")[1]) // lấy code Phường để api data xã
                renderpointer()
            }
        }
    } catch (error) {
        console.log(error);
    }
}
function renderPhuongXa(code){
    if ($('.adress_quan').attr('alt') !== '') {
        $.ajax({
            url: `https://provinces.open-api.vn/api/d/${code}?depth=2`,
            type:'GET'
        })
        .then(function (data) {
            let dataphuong = ''
                for (let i = 0; i < data.wards.length; i++) {      
                    dataphuong += `<option value='${data.wards[i].name}'> ${data.wards[i].name} </option>`
                }
            $('.adress_phuong').html(dataphuong)
        })
        .catch(function (err) {
            console.log(err);
        })
    } 
}
async function chonPhuong(obj){
    try {
        var options = obj.children;
        var html = '';
        for (var i = 0; i < options.length; i++){
            if (options[i].selected){
                html += options[i].value;
                $('.adress_phuong').attr('alt',html)
            }
        }
    } catch (error) {
        console.log(error);
    }
}
function renderpointer() {
    if ($('.adress_tinh').attr('alt') !== '') {
        $('.adress_quan').removeClass('disable')
        $('.adress_quan').addClass('enabled')
    }
    if ($('.adress_quan').attr('alt') !== '') {
        $('.adress_phuong').removeClass('disable')
        $('.adress_phuong').addClass('enabled')
    }
}
///////////////////////////////////////////////////////
function nharieng() {
    if ($('.mod-address-tag-icon-2').css('color') !== 'rgb(255, 87, 59)' ) {
        $('.mod-address-tag-icon-2').css('color' , 'rgb(255, 87, 59)' ) 
        $('.mod-address-tag-icon-1').css('color' , '#999' )
    } else {
        $('.mod-address-tag-icon-2').css('color' , '#999' )
    }  
}
function vanphong() {
    if ($('.mod-address-tag-icon-1').css('color') !== 'rgb(0, 151, 186)' ) {
        $('.mod-address-tag-icon-1').css('color' , 'rgb(0, 151, 186)' ) 
        $('.mod-address-tag-icon-2').css('color' , '#999' )
    } else {
        $('.mod-address-tag-icon-1').css('color' , '#999' )
    }  
}
function hoten() {
    if ($('.hoten').val() !== '') {
        $('.mod-input-name span').html('')
        $('.hoten').css('border','1px solid #ddd')
    }
    if ($('.hoten7').val() !== '') {
        $('.mod-input-name span').html('')
        $('.hoten7').css('border','1px solid #ddd')
    }
}
function phone() {
    if ($('.phone').val() !== '') {
        $('.mod-input-phone span').html('')
        $('.phone').css('border','1px solid #ddd')
    }
    if ($('.phone7').val() !== '') {
        $('.mod-input-phone span').html('')
        $('.phone7').css('border','1px solid #ddd')
    }
}
function diachi() {
    console.log(211,$('.diachi7').html());
    if ($('.diachi').val() !== '') {
        $('.mod-input-adress span').html('')
        $('.diachi').css('border','1px solid #ddd')
    }
    if ($('.diachi7').val() !== '') {
        $('.mod-input-adress span').html('')
        $('.diachi7').css('border','1px solid #ddd')
    }
}
async function luuadress() {
    try {
        console.log($('.hoten').val(), $('.phone').val(), $('.diachi').val(),$('.adress_tinh').val(),$('.adress_quan').val() );
        if ($('.hoten').val() === '') {
            $('.mod-input-name span').html('Thông tin bắt buộc')
            $('.hoten').css('border','1px solid #f44336')
        }
        if ($('.phone').val() === '') {
            $('.mod-input-phone span').html('Thông tin bắt buộc')
            $('.phone').css('border','1px solid #f44336')
        }
        if ($('.diachi').val() === '') {
            $('.mod-input-adress span').html('Thông tin bắt buộc')
            $('.diachi').css('border','1px solid #f44336')
        }
        if ($('.adress_tinh').val() === '') {
            $('.tinh span').html('Thông tin bắt buộc')
            $('.adress_tinh').css('border','1px solid #f44336')
        }
        if ($('.adress_quan').val() === '') {
            $('.quan span').html('Thông tin bắt buộc')
            $('.adress_quan').css('border','1px solid #f44336')
        }
        if ($('.hoten').val() !== '' & $('.phone').val() !== '' & $('.diachi').val() !== '' & $('.adress_tinh').val() !== '' & $('.adress_quan').val() !== '') {
            // console.log(228);
            const name = $('.hoten').val()
            const phone = $('.phone').val()
            const address = $('.diachi').val() + ' , ' + $('.adress_phuong').val() + ' , ' + ($('.adress_quan').val()).split('_')[0] + ' , ' + $('.adress_tinh').val() 
            let addnhan
            if ($('.mod-address-tag-icon-2').css('color') === 'rgb(255, 87, 59)') {
                console.log(135,$('.nr').text());
                addnhan = $('.nr').text()
            }
            if ($('.mod-address-tag-icon-1').css('color') === 'rgb(0, 151, 186)') {
                console.log(135,$('.vp').text());
                addnhan = $('.vp').text()
            }
            $('.v2-address-title').val($('.hoten').val())
            console.log(199,$('.v2-address-title').html($('.hoten').val()));
            console.log(199,$('.v2-mobile').html($('.phone').val()));
            console.log(199,$('.add-diachi').html(addnhan));
            console.log(199,$('.address-user').html(address));
            van_phong()
            $('.checkout_adress').show()
            $('.mod-guest-register').hide()
            const data = await $.ajax({ // tạo mới data dia chỉ nhận hàng
                url: '/order/create',
                type: 'POST',
                data: {name: name,  phone: phone, address: address, type: addnhan}
            })
            console.log(211,data);
            $('.dat-hang').css('background-color','rgb(245, 114, 36)')
            location.reload()
        }
    } catch (error) {
        console.log(error);
    }    
}
async function luuadress1() {
    try {
        console.log($('.hoten7').val(), $('.phone7').val(), $('.diachi7').val(),$('.adress_tinh7').val(),$('.adress_quan7').val() );
        
        if ($('.hoten7').val() === '') {
            $('.mod-input-name span').html('Thông tin bắt buộc')
            $('.hoten7').css('border','1px solid #f44336')
        }
        if ($('.phone7').val() === '') {
            $('.mod-input-phone span').html('Thông tin bắt buộc')
            $('.phone7').css('border','1px solid #f44336')
        }
        if ($('.diachi7').val() === '') {
            $('.mod-input-adress span').html('Thông tin bắt buộc')
            $('.diachi7').css('border','1px solid #f44336')
        }
        if ($('.adress_tinh7').val() === '') {
            $('.tinh span').html('Thông tin bắt buộc')
            $('.adress_tinh7').css('border','1px solid #f44336')
        }
        if ($('.adress_quan7').val() === '') {
            $('.quan span').html('Thông tin bắt buộc')
            $('.adress_quan7').css('border','1px solid #f44336')
        }
        if ($('.hoten7').val() !== '' & $('.phone7').val() !== '' & $('.diachi7').val() !== '' & $('.adress_tinh7').val() !== '' & $('.adress_quan7').val() !== '') {
            console.log(228);
            $('.btn-luu-adress').attr('data-dismiss','modal')
            const name = $('.hoten7').val()
            const phone = $('.phone7').val()
            const address = $('.diachi7').val() + ' , ' + $('.adress_phuong7').val() + ' , ' + ($('.adress_quan7').val()).split('_')[0] + ' , ' + $('.adress_tinh7').val() 
            let addnhan
            if ($('.mod-address-tag-icon-2').css('color') === 'rgb(255, 87, 59)') {
                console.log(135,$('.nr7').text());
                addnhan = $('.nr7').text()
            }
            if ($('.mod-address-tag-icon-1').css('color') === 'rgb(0, 151, 186)') {
                console.log(135,$('.vp7').text());
                addnhan = $('.vp7').text()
            }
            $('.v2-address-title').val($('.hoten7').val())
            console.log(199,$('.v2-address-title').html($('.hoten7').val()));
            console.log(199,$('.v2-mobile').html($('.phone7').val()));
            console.log(2000,$('.add-diachi').html(addnhan));
            console.log(199,$('.address-user').html(address));
            
            $('.checkout_adress').show()
            $('.mod-guest-register').hide()
            const data = await $.ajax({ // tạo mới data dia chỉ nhận hàng
                url: '/order/create1',
                type: 'POST',
                data: {name: name,  phone: phone, address: address, type: addnhan}
            })
            $('.scroll').html('')
            $('.scroll').html(data)
            van_phong()   
        }else{
            $('.btn-luu-adress').attr('data-dismiss','')
        }
    } catch (error) {
        console.log(error);
    }    
}
tinhAllprice()
// tính giá sp sau khi giảm theo %
async function tinhAllprice() {
    try {
        for (let i = 0; i < $('.package').length; i++) {
            for (let j = 0; j < $('.cart-item').length; j++) {
                $(`.numbers${i}${j}`).html()
                $(`.phan-tram-giam${i}${j}`).html()
                const price = Number($(`.numbers${i}${j}`).html())
                const phantram = $(`.phan-tram-giam${i}${j}`).html()*0.01
                $(`.price${i}${j}`).html(Math.floor( (price + price * phantram).toLocaleString("vi") ).toFixed(3))
                $(`.numbers${i}${j}`).html(Number($(`.numbers${i}${j}`).html()).toLocaleString("vi"))
            }
            
        }
        
        // tính bill order
        let sumShip = 0
        for (let i = 0; i < $('.package').length; i++) {
            sumShip += Number($(`.current${i}`).text().split('.').join(''))
        }
        if (sumShip > 999) {
            const a = sumShip.toString().slice(0,sumShip.toString().length - 3)
            const b = sumShip.toString().slice(sumShip.toString().length - 3,sumShip.toString().length)
            $('.price-ship').html(a + '.' + b)
        }

        let total = Number($('.bill').text().split('.').join('')) + sumShip
        // console.log(241,total);
        if (total > 999999 & total < 999999999) {
            const a = total.toString().slice(0,total.toString().length - 3 - 3)
            const b = total.toString().slice(total.toString().length - 3 - 3,total.toString().length - 3)
            const c = total.toString().slice(total.toString().length - 3,total.toString().length)
            $('.bill-total').html(a + '.' + b + '.' + c)
        }
        if (total > 999 & total < 999999) {
            const a = total.toString().slice(0,total.toString().length - 3)
            const b = total.toString().slice(total.toString().length - 3,total.toString().length)
            $('.bill-total').html(a + '.' + b)
        }
    } catch (error) {
        console.log(error);
    }
}
// xóa
async function xoa(productID){
    try {
        const res = await $.ajax({
            url: '/order/xoa',
            type: 'DELETE',
            data: {productID: productID}
        })
        // console.log(res);
        $('.container').html('')
        $('.container').html(res)
        findaddress()
        tinhAllprice()
    } catch (error) {
        console.log(error);
    }
}
// update order
async function updateOrder(){
    try {
        $('.toast').css('display','block');
        const total = Number($('.bill-total').text().split('.').join(''))
        console.log(309,total);
        const name = $('.v2-address-title').html()
        const phone = $('.v2-mobile').html()
        const address = $('.address-user').html()
        const type = $('.add-diachi').html()
        console.log(327,total,name,phone,type, address);
        if (name != '' & phone != '' & address != '') { // kiểm tra đã có data nhận hàng chưa
            const data = await $.ajax({ // tạo mới data dia chỉ nhận hàng
                url: '/order/Neworder',
                type: 'POST',
                data: {total: total, name: name,  phone: phone,type: type, address: address}
            })
            // console.log(data);
            
            $('.toast').toast('show');
            setTimeout(function () {
                window.location.href = '/cart'
            },2000);
        }
         
    } catch (error) {
        console.log(error);
    }
}
async function changeAddress(i){
    try {
        for (let j = 0; j < $(`.add`).length; j++) {
            if (j == i) {
                console.log(345,$(`.checkAddress${i}`).prop('checked'));
                $(`.checkAddress${i}`).attr('aria-checked','true')
            }else{
                $(`.checkAddress${j}`).prop('checked', false)
                $(`.checkAddress${j}`).attr('aria-checked','false')
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function saveadd(){
    try {
        for (let j = 0; j < $(`.add`).length; j++) {
            // console.log(375,$(`.checkAddress${j}`).attr('aria-checked'));
            if ($(`.checkAddress${j}`).attr('aria-checked') === 'true') {
                $('.v2-address-title').html($(`.ten${j}`).html())
                $('.v2-mobile').html($(`.sdt${j}`).html())
                $('.add-diachi').html($(`.type${j}`).html())
                $('.address-user').html($(`.diachi${j}`).html())
                // console.log(378, $(`.ten${j}`).html(), $(`.sdt${j}`).html(), $(`.type${j}`).html(),$(`.diachi${j}`).html() );
            }
            if ($(`.add-diachi`).html() === 'VĂN PHÒNG') {
                $(`.add-diachi`).css({'background' : '#189cb7', 'border-radius' : '99px'})
                $(`.dc`).css({'background' : '#189cb7'})
            }else{
                $(`.add-diachi`).css({'background' : 'linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)'})
                $(`.dc`).css({'background' : 'linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)'})
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function saveadd1(){
    try {
        for (let j = 0; j < $(`.add`).length; j++) {
            if ($(`.checkAddress${j}`).attr('aria-checked') === 'true') {
                $('.name-nhan').html($(`.ten${j}`).html())
                $('.mobile-nhan').html($(`.sdt${j}`).html())
                $('.address-nhan').html($(`.diachi${j}`).html())
            }
            if ($(`.add-diachi`).html() === 'VĂN PHÒNG') {
                $(`.add-diachi`).css({'background' : '#189cb7', 'border-radius' : '99px'})
                $(`.dc`).css({'background' : '#189cb7'})
            }
            if ($(`.add-diachi`).html() === 'Nhà Riêng'){
                $(`.add-diachi`).css({'background' : 'linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)'})
                $(`.dc`).css({'background' : 'linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)'})
            }
            
        }
    } catch (error) {
        console.log(error);
    }
}
async function luu1(){
    try {
        for (let j = 0; j < $(`.add`).length; j++) {
            if ($('.v2-address-title').html() === $(`.ten${j}`).html()) {
                $('.name-nhan').html($(`.ten${j}`).html())
                $('.mobile-nhan').html($(`.sdt${j}`).html())
                $('.address-nhan').html($(`.diachi${j}`).html())
            }
        }
    } catch (error) {
        console.log(error);
    }
}
async function luu2(){
    try {
        // ('.btn-luu-adress').attr('data-dismiss','')
        $('.hoten7').val('')
        $('.phone7').val('')
        $('.diachi7').val('')
        $('.adress_tinh7').val('')
        $('.adress_quan7').val('')
        $('.adress_phuong7').val('')
        for (let j = 0; j < $(`.add`).length; j++) {
            if ($('.v2-address-title').html() === $(`.ten${j}`).html() & $('.v2-mobile').html() === $(`.sdt${j}`).html()) {
                $(`.checkAddress${j}`).attr('checked','true')
                $(`.checkAddress${j}`).attr('aria-checked','true')
            }
        }
    } catch (error) {
        console.log(error);
    }
}
van_phong()
async function van_phong(){
    try {
        for (let j = 0; j < $(`.add`).length; j++) {
            if ($(`.type${j}`).html() === 'VĂN PHÒNG') {
                $(`.type${j}`).css({'background' : '#189cb7', 'border-radius' : '99px'})
                $(`.t${j}`).css({'background' : '#189cb7'})
            }
        }
        if ($(`.add-diachi`).html() === 'VĂN PHÒNG') {
            $(`.add-diachi`).css({'background' : '#189cb7', 'border-radius' : '99px'})
            $(`.dc`).css({'background' : '#189cb7'})
        }
        if ($(`.add-diachi`).html() === 'Nhà Riêng'){
            $(`.add-diachi`).css({'background' : 'linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)'})
            $(`.dc`).css({'background' : 'linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)'})
        }
    } catch (error) {
        console.log(error);
    }
}




