function changepage(page, name) {
  console.log(page, name);
  window.location.href = `/search?search=${name}&page=${page}&limit=8`;
  console.log(total1);
}
function changepagetruoc(page, name, pricemin, pricemax) {
  if (pricemax) {
    window.location.href = `/search?search=${name}&page=${page - 1}&limit=8`;
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
for (let i = 0; i < array.length; i++) {
  const element = array[i];
}

function sizeSS(url, size) {
  window.location.href = `${url}&size=${size}`;
}
function themMau(color) {
  let arrduochienthi = [];
  arrduochienthi.push(`${color}`);
}
function xoamaudo(color) {
  if (color == $("#color")) {
    this.htlm("");
  }
}

for (let index = 0; index < array.length; index++) {
  const element = array[index];
}
