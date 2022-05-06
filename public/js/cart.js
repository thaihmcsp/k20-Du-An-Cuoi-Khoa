render();
console.log(12232132321);
// thêm dấu . vào giá sp
for (let i = 0; i < $(".current-price").length; i++) {
  const price = Number($(`.price${i}`).html());
  $(`.price${i}`).html(Math.floor(price.toLocaleString("vi")).toFixed(3));
}

// check all tất cả checkbox
$(`.checkall`).on("click", function () {
  console.log(9, "checkall", $(`.checkall`).prop("checked"));
  for (let i = 0; i < $(".cart-item-left").length; i++) {
    if ($(`.checkall`).prop("checked") === true) {
      $(`.checkbox${i}`).prop("checked", true);
      $(`.checkbox${i}`).attr("alt", true);
    } else {
      $(`.checkbox${i}`).prop("checked", false);
      $(`.checkbox${i}`).attr("alt", false);
    }
  }
  // window.location.href = '/cart'
});
async function render() {
  try {
    let number = 0;
    for (let i = 0; i < $(".cart-item-left").length; i++) {
      $(`.checkbox${i}`).on("click", function () {
        // console.log(10, `checkbox${i}` ,$(`.checkbox${i}`).prop('checked'));
      });

      const link = $(`.number-sp${i}`).attr("value");
      const max = $(`.number-sp${i}`).attr("max");
      // console.log(26,link);
      // console.log(27,max);
      if (link == 1) {
        $(`.down${i}`).attr("disabled", true);
        $(`.down${i}`).addClass("disable");
      }
      if (link == max) {
        $(`.up${i}`).attr("disabled", true);
        // thêm lệnh tắt hover button
        $(`.up${i}`).addClass("disable");
      }
      //lưu checked đã nhận
      if ($(`.checkbox${i}`).attr("alt") === "true") {
        $(`.checkbox${i}`).prop("checked", true);
        number++;
      } else {
        $(`.checkbox${i}`).prop("checked", false);
      }
      // console.log(49,number);
    }
    //check checked của checkall
    if ((number === $(".cart-item-left").length) & (number !== 0)) {
      $(".checkall").attr("alt", true);
    } else {
      $(".checkall").attr("alt", false);
    }
    if ($(".checkall").attr("alt") === "true") {
      $(".checkall").attr("checked", true);
    }
  } catch (error) {
    console.log(error);
  }
}

async function xoa(productID) {
  try {
    const res = await $.ajax({
      url: "/cart/xoa",
      type: "DELETE",
      data: { productID: productID },
    });
    window.location.href = "/cart";
  } catch (error) {
    console.log(error);
  }
}
async function xoaAll(productID) {
  try {
    const res = await $.ajax({
      url: "/cart/xoaAll",
      type: "DELETE",
    });
    console.log(89, res);
    window.location.href = "/cart";
  } catch (error) {
    console.log(error);
  }
}

// + - sp
async function down(productID) {
  try {
    const res = await $.ajax({
      url: "/cart/down",
      type: "PUT",
      data: { productID: productID },
    });
    console.log(42, res);
    window.location.href = "/cart";
  } catch (error) {
    console.log(error);
  }
}
async function up(productID) {
  try {
    console.log(50, productID);
    const res = await $.ajax({
      url: "/cart/up",
      type: "PUT",
      data: { productID: productID },
    });
    console.log(55, res);
    window.location.href = "/cart";
  } catch (error) {
    console.log(error);
  }
}
async function test(i, productID) {
  try {
    console.log(77, productID);
    const check = $(`.checkbox${i}`).prop("checked");
    console.log(78, check);
    const res = await $.ajax({
      url: "/cart/test",
      type: "PUT",
      data: { productID: productID, select: check },
    });
    console.log(55, res);
    window.location.href = "/cart";
  } catch (error) {
    console.log(error);
  }
}
async function testall() {
  try {
    const check = $(`.checkall`).prop("checked");
    console.log(99, check);
    const res = await $.ajax({
      url: "/cart/testall",
      type: "PUT",
      data: { select: check },
    });
    console.log(55, res);
    $(`.checkall`).attr("alt", check);
    window.location.href = "/cart";
  } catch (error) {
    console.log(error);
  }
}
