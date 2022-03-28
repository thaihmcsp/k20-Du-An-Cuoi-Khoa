function search(){
  const search = $("#search").val();
  console.log(3,search);
  $.ajax({
    type: "get",
    url: "/codeProduct",
    data: { name: search },
  })
  .then(function (data) {
    console.log(22,data);
    
console.log(21,data.data.length);
    if (data.data.length === 0) {
      $('.headerkhoiphai').html('')
        let div1 = `
      <h1 class="">${search}</h1>
      <div class="">
        <span>Không tìm thấy sản phẩm phù hợp"</span>
      </div>
      `
      $('.headerkhoiphai').append(div1)
    } else {
      for (let i = 0; i < data.data.length; i++) {
        $('.headerkhoiphai').html('')
        let div1 = `
        <h1 class="">${search}</h1>
        <div class="">
          <span>${data.data.length} mặt hàng được tìm thấy theo "</span
          ><span> ${search} </span><span>"</span>
        </div>
        <div class="">Xem:</div>
        `
        $('.headerkhoiphai').append(div1)
     }
     $('.phantrang').html('')
     for (let i = 0; i < data.data.length / 5; i++) {
      let div = `
      <button onclick='getData(${i+1})' class="" type="button"> ${i+1}
                </button>
      `
      $('.phantrang').append(div)
      
    }
    }
  })
  .catch(function (err) {
    console.log(err);
  });
  render(1)

  function getData(page){
    render(page)
    }

}


function getData(page){
  render(page)
  }

function render(page){
  const search = $("#search").val();
  $.ajax({
     type: "get",
     url: `/codeProduct/?page=${page}&limit=5`,
     data: { name: search },
   })
   .then(function (data) {
     $('.noidungbenphaitable').html('')
     for (let i = 0; i < data.data.length; i++) {
        let div = `
     <tr>
         <td> tên sản phẩm là :  ${data.data[i].name}</td>
         <td>giá là :  ${data.data[i].price}  </td>
     </tr>
        `
        $('.noidungbenphaitable').append(div)
     }
     
   })
   .catch(function (err) {
     console.log(err);
   })
 }
// search sản phẩm và up lên trang search

// thêm sản phẩn đơn giản

function addsanpham(){
  const color= $('#color').val()
  const size= $('#size').val()
  const quantity= $('#quantity').val()
  console.log(color,size,quantity);
  $.ajax({
    url:'/product',
    type: 'Post',
    data:{color: color	,size:size	,quantity:quantity	}
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
}
// listImg: [{type:String}],
// productCode	: {ref:'productCode', type: String},
{/* <input type="text" name="" id="name" placeholder="name">
        <input type="text" name="" id="thumbnail" placeholder="thumbnail"></input> */}

function addcategory(){
  const name= $('#name').val()
  const thumbnail= $('#thumbnail').val()
  console.log(name,thumbnail);
  $.ajax({
    url:'/category',
    type: 'Post',
    data:{name: name	,thumbnail:thumbnail	}
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
}

{/* <input type="text" name="" id="code" placeholder="code">
        <input type="text" name="" id="name1" placeholder="name">
        <input type="number" name="" id="price" placeholder="price"></input> */}
function addproductCode(){
  const code= $('#code').val()
  const name1= $('#name1').val()
  const price= $('#price').val()
  console.log(code,name1,price);
  $.ajax({
    url:'/codeProduct',
    type: 'Post',
    data:{code: code	,name:name1	, price:price}
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
}
// ;


 let time
function suggest(){
  $('.searchconten').css({display: 'block'})
 clearTimeout(time)
 time = setTimeout(function(){
   const data = $('#search').val()
$.ajax({
    type: "get",
    url: "/codeProduct/?limit=8",
    data: { name: data },
  })
  .then(function (data) {
    console.log(104,data);
    $('.searchtong').html('')
    for (let i = 0; i < data.data.length; i++) {
       let div = `
       <div class="searchconten">
       tên sản phẩm là :  ${data.data[i].name},giá là :  ${data.data[i].price}
    </div>
       `
       $('.searchtong').append(div)
    }
  })
  .catch(function (err) {
    console.log(err);
  });
 }, 1000);
}

function oncz(){
  $('.searchtong').html('')
}

// function search1(){
//   console.log(999,$('#search').val().length);
  
// if (  $('#search').val().length <1) {
//   $('.searchconten').css({display: 'none'})
// } else {
//   $('.searchconten').css({display: 'block'})
// }
// }
