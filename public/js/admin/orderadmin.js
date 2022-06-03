// dataorder()
// lấy data order admin
async function dataorder(){
    try {
        const res = await $.ajax({
            url: '/order/dataorder',
            type: 'GET',
        })
        console.log(8,res);
        // $('.content').html('')
        // $('.content').html(res)
    } catch (error) {
        console.log(error);
    }
}