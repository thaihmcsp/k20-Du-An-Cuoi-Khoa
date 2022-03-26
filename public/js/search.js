function search(){
  const search = $("#search").val();
  $.ajax({
    type: "get",
    url: "/codeProduct",
    data: { name: search },
  })
  .then(function (data) {
    console.log(22,data);
    $('.tessss').html('')
    for (let i = 0; i < data.data.length; i++) {
       let div = `
    <tr>
        <td> tên sản phẩm là :  ${data.data[i].name}</td>
        <td>giá là :  ${data.data[i].price}  </td>
    </tr>
       `
       $('.tessss').append(div)
    }
  })
  .catch(function (err) {
    console.log(err);
  });
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

