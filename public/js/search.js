function search() {
  const search = $("#search").val();
  window.location.href = `/search?search=${search}&page=1&limit=8`;
}

// khi gõ vào ô tìm kiếm sẽ ra 8 kết quả đầu tiên ở dưới ô search
let time
function suggest() {
  $(".searchconten").css({ display: "block" });
  clearTimeout(time);
  time = setTimeout(function () {
    const data = $("#search").val();
    $.ajax({
      type: "get",
      url: "/codeProduct/?limit=8",
      data: { name: data },
    })
      .then(function (data) {
        console.log(104, data);
        $(".searchtong").html("");
        for (let i = 0; i < data.length; i++) {
          let div = `
          <a href="http://localhost:3000/product/${data[i]._id}">
       <div class="searchconten">
       tên sản phẩm là :  ${data[i].name},giá là :  ${data[i].price}
    </div> </a>
       `;
          $(".searchtong").append(div);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, 1000);
}
// khi search xong click ra bất cứ chỗ khác thì hộp search sẽ biến mất
function oncz() {
  $(".searchtong").html("");
}

function changepage(page, name) {
  console.log(page, name);
  window.location.href = `/search?search=${name}&page=${page}&limit=8`;
  console.log(total1);
}
function changepagetruoc(page, name, pricemin, pricemax) {
  if (pricemax) {
    window.location.href = `/search?search=${name}&page=${page - 1}&limit=8`
  } else {
    console.log(page, name);
    if (page > 1) {
      window.location.href = `/search?search=${name}&page=${page - 1}&limit=8`;
    }
  }
}
function changepagesau(page, name, max) {
  let page2 = page * 1;
  console.log(page, name);
  if (page < max) {
    window.location.href = `/search?search=${name}&page=${page2 + 1}&limit=8`;
  }
}
// function changepagesau(page,name) {
//  console.log(page,name);
//   window.location.href = `/search?search=${name}&page=${page}&limit=8`
// }

function timtheogia(page, name) {
  const minprice = $("#giatoithieu").val();
  const maxprice = $("#giatoida").val();
  console.log(minprice, maxprice);
  window.location.href = `/search?search=${name}&page=1&limit=8&pricemin=${minprice}&pricemax=${maxprice}`;
  
}
