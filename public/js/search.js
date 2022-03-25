function search(){
  const search = $("#search").val();
  $.ajax({
    type: "get",
    url: "/product",
    data: { color: search },
  })
  .then(function (data) {
    console.log(22,data);
    $('.tessss').html('')
    for (let i = 0; i < data.data.length; i++) {
       let div = `
    <tr>
        <td> mầu là :  ${data.data[i].color}</td>
        <td>size là :  ${data.data[i].size}  </td>
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

