render();
$(".order-group").on("click", function () {
  window.location.href = "/order";
});
async function render() {
  try {
    $(".toast").css("display", " none");
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
    });
    let number = 0;
    for (let i = 0; i < $(".cart-item-left").length; i++) {
      $(`.checkbox${i}`).on("click", function () {
        console.log(10, `checkbox${i}`, $(`.checkbox${i}`).prop("checked"));
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
      for (let j = 0; j < $(".group-sp").length; j++) {
        if ($(`.gr${j}`).attr("val") !== $(`.sp${j}-${i}`).attr("val")) {
          $(`.sp${j}-${i}`).remove();
          $(`.sp${j}-${i}`).css("display", " none");
        }
      }
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
    $(".container").html("");
    $(".container").html(res);
    render();
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
    $(".container").html("");
    $(".container").html(res);
    render();
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
    $(".container").html("");
    $(".container").html(res);
    render();
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
    $(".container").html("");
    $(".container").html(res);
    render();
  } catch (error) {
    console.log(error);
  }
}

async function keyup(i, j, productID) {
  try {
    console.log(152);
    console.log(152, $(`.gr${j}`).attr("val"));
    console.log(152, $(`.Number${j}${i}`).attr("val"));
    if ($(`.gr${j}`).attr("val") === $(`.Number${j}${i}`).attr("val")) {
      const max = Number($(`.Number${j}${i}`).attr("max"));
      const min = Number($(`.Number${j}${i}`).attr("min"));
      console.log(max, min);
      $(`.Number${j}${i}`).on("keyup", function () {
        $(".toast").css("display", "block");
        async function timer() {
          var quantity = $(`.number-sp${i}`).val();
          $(`.number-sp${i}`).attr("value", quantity);
          if (
            (Number($(`.number-sp${i}`).attr("value")) <= Number(max)) &
            (Number($(`.number-sp${i}`).attr("value")) >= Number(min))
          ) {
            console.log(50, productID);
            const res = await $.ajax({
              url: "/cart/update",
              type: "PUT",
              data: { productID: productID, quantity: quantity, i },
            });
            $(".container").html("");
            $(".container").html(res);
            render();
          } else if (Number($(`.number-sp${i}`).attr("value")) > Number(max)) {
            quantity = max;
            console.log(50, productID);
            const res = await $.ajax({
              url: "/cart/update",
              type: "PUT",
              data: { productID: productID, quantity: quantity, i },
            });

            $(".toast").toast("show");
            setTimeout(function () {
              $(".container").html("");
              $(".container").html(res);
              render();
            }, 2000);
          } else {
            quantity = min;
            console.log(50, productID);
            const res = await $.ajax({
              url: "/cart/update",
              type: "PUT",
              data: { productID: productID, quantity: quantity, i },
            });

            $(".toast").toast("show");
            setTimeout(function () {
              $(".container").html("");
              $(".container").html(res);
              render();
            }, 2000);
          }
        }
        setTimeout(timer, 1000);
      });
    }
  } catch (error) {
    console.log(error);
  }
}
async function test(i, j, productID) {
  try {
    console.log(77, productID);
    const check = $(`.box${j}${i}`).prop("checked");
    if (check) {
      $(`.box${j}${i}`).attr("alt", true);
    } else {
      $(`.box${j}${i}`).attr("alt", false);
    }
    // console.log(78,check);
    const res = await $.ajax({
      url: "/cart/test",
      type: "PUT",
      data: { productID: productID, select: check },
    });
    $(".container").html("");
    $(".container").html(res);
    render();
    // window.location.href = '/cart'
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
    $(`.checkall`).attr("alt", check);
    $(".container").html("");
    $(".container").html(res);
    render();
  } catch (error) {
    console.log(error);
  }
}
