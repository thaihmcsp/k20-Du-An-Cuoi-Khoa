// dataorder()
// lấy data order admin
dataUserOrder()
async function dataUserOrder(){
    try {
        console.log(6,$(`.content-oder`).length);
        for (let i = 0; i < $(`.content-oder`).length; i++) {
            const userID = $(`.user-order${i}`).attr('alt')
            // console.log(8,userID);
            const data = await $.ajax({
                url: '/user/order/user',
                type: 'GET',
                data: { id: userID}
            })
            // console.log(14,data.username, data.email);
            $(`.name-user${i}`).html(data.username)
            $(`.email-user${i}`).html(data.email)
            // console.log(18,$(`.shop-body${i}`).length);
            for (let j = 0; j < $(`.shop-body${i}`).length; j++) {
                let productID = $(`.sp${i}${j}`).attr('alt')
                // console.log(21,productID);
                const img_main = await $.ajax({
                    url: '/dataUserOrder/img&main',
                    type: 'GET',
                    data: { id: productID}
                })
                $(`.img-${i}${j}`).attr('src',img_main.img)
                $(`.main-${i}${j}`).html(img_main.main)
                $(`.price-${i}${j}`).html(img_main.price)
                $(`.size-${i}${j}`).html(img_main.size)
                $(`.color-${i}${j}`).html(img_main.color)
                console.log(50, $(`.price-${i}${j}`).html().length);
                console.log(51, $(`.price-${i}${j}`).html().slice(3));
            }
        }
        
        
        // console.log(8,$(`.name-user${i}`),$(`.email-user${i}`));
        // $('.content').html('')
        // $('.content').html(res)
    } catch (error) {
        console.log(error);
    }
}
// $('.gia').html()
// $('.phan-tram-giam').html()
// const price = Number.parseInt('',10)
// const phantram = $('.phan-tram-giam').html()*0.01
// $('.gia').html(Math.floor( (price).toLocaleString("vi") ).toFixed(3))
// $('.gia').html(Number($('.gia').html()).toLocaleString("vi"))
console.log(49,$('.gia').html());
