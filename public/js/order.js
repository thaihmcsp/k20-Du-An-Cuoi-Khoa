findaddress();

//* Toast
function showToast() {
  var toastTrigger = document.getElementById("liveToastBtn");
  var toastLiveExample = document.getElementById("liveToast");
  if (toastTrigger) {
    var toast = new bootstrap.Toast(toastLiveExample);
    toastLiveExample.setAttribute("style", "animation: showToast linear 0.2s;");
    toast.show();
  }
}

function toastSuccess() {
  $(".toast").addClass("toast-success");
  $(".toast").removeClass("toast-error");
  $(".toast-logo").html('<i class="far fa-check-circle"></i>');
  $(".toast h3").text("Lưu thông tin thành công");
}

function toastError(message) {
  $(".toast").addClass("toast-error");
  $(".toast").removeClass("toast-success");
  $(".toast-logo").html('<i class="far fa-times-circle"></i>');
  $(".toast h3").text(message);
}

// * Find Address
async function findaddress() {
  $.ajax({
    url: "https://provinces.open-api.vn/api/?depth=1",
    type: "GET",
  })
    .then(function (data) {
      let datatinh = $(".adress_tinh").html();
      for (let i = 0; i < data.length; i++) {
        datatinh += `<option value='${data[i].name}'> ${data[i].name} </option>`;
      }
      $(".adress_tinh").html(datatinh);
    })
    .catch(function (err) {
      console.log(err);
    });
}

async function chonTinh(obj) {
  try {
    if ($(".adress_tinh").val() !== "") {
      $(".tinh span").html("");
      $(".adress_tinh").css("border", "1px solid #ddd");
    }
    if ($(".adress_tinh7").val() !== "") {
      $(".tinh span").html("");
      $(".adress_tinh7").css("border", "1px solid #ddd");
    }
    // Lấy danh sách các options
    var options = obj.children;
    // Biến lưu trữ các chuyên mục đa chọn
    var html = "";
    // lặp qua từng option và kiểm tra thuộc tính selected
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        html += options[i].value;
        $(".adress_tinh").attr("alt", html);
        renderTinhThanh();
        renderpointer();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function renderTinhThanh() {
  if ($(".adress_tinh").attr("alt") !== "") {
    $.ajax({
      url: "https://provinces.open-api.vn/api/?depth=2",
      type: "GET",
    })
      .then(function (data) {
        const data1 = data.find(function (a) {
          return a.name === $(".adress_tinh").attr("alt");
        });
        let dataquan = "";
        for (let i = 0; i < data1.districts.length; i++) {
          dataquan += `<option value='${data1.districts[i].name}_${data1.districts[i].code}'> ${data1.districts[i].name} </option>`;
        }
        $(".adress_quan").html(dataquan);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

async function chonQuan(obj) {
  try {
    if ($(".adress_quan").val() !== "") {
      $(".quan span").html("");
      $(".adress_quan").css("border", "1px solid #ddd");
    }
    if ($(".adress_quan7").val() !== "") {
      $(".quan span").html("");
      $(".adress_quan7").css("border", "1px solid #ddd");
    }
    // Lấy danh sách các options
    var options = obj.children;
    // Biến lưu trữ các chuyên mục đa chọn
    var html = "";
    // lặp qua từng option và kiểm tra thuộc tính selected
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        html += options[i].value;
        $(".adress_quan").attr("alt", html);
        renderPhuongXa($(".adress_quan").attr("alt").split("_")[1]); // lấy code Phường để api data xã
        renderpointer();
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function renderPhuongXa(code) {
  if ($(".adress_quan").attr("alt") !== "") {
    $.ajax({
      url: `https://provinces.open-api.vn/api/d/${code}?depth=2`,
      type: "GET",
    })
      .then(function (data) {
        let dataphuong = "";
        for (let i = 0; i < data.wards.length; i++) {
          dataphuong += `<option value='${data.wards[i].name}'> ${data.wards[i].name} </option>`;
        }
        $(".adress_phuong").html(dataphuong);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}

async function chonPhuong(obj) {
  try {
    var options = obj.children;
    var html = "";
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) {
        html += options[i].value;
        $(".adress_phuong").attr("alt", html);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function renderpointer() {
  if ($(".adress_tinh").attr("alt") !== "") {
    $(".adress_quan").removeClass("disable");
    $(".adress_quan").addClass("enabled");
  }
  if ($(".adress_quan").attr("alt") !== "") {
    $(".adress_phuong").removeClass("disable");
    $(".adress_phuong").addClass("enabled");
  }
}

function nharieng() {
  if ($(".mod-address-tag-icon-2").css("color") !== "rgb(255, 87, 59)") {
    $(".mod-address-tag-icon-2").css("color", "rgb(255, 87, 59)");
    $(".mod-address-tag-icon-1").css("color", "#999");
    $(".vp").css("color", "#999");
    $(".nr").css("color", "rgb(255, 87, 59)");
  } else {
    $(".mod-address-tag-icon-2").css("color", "#999");
    $(".nr").css("color", "#999");
  }
}

function vanphong() {
  if ($(".mod-address-tag-icon-1").css("color") !== "rgb(0, 151, 186)") {
    $(".mod-address-tag-icon-1").css("color", "rgb(0, 151, 186)");
    $(".mod-address-tag-icon-2").css("color", "#999");
    $(".nr").css("color", "#999");
    $(".vp").css("color", "rgb(0, 151, 186)");
  } else {
    $(".mod-address-tag-icon-1").css("color", "#999");
    $(".vp").css("color", "#999");
  }
}

function hoten() {
  if ($(".hoten").val() !== "") {
    $(".mod-input-name span").html("");
    $(".hoten").css("border", "1px solid #ddd");
  }
  if ($(".hoten7").val() !== "") {
    $(".mod-input-name span").html("");
    $(".hoten7").css("border", "1px solid #ddd");
  }
}

function phone() {
  if ($(".phone").val() !== "") {
    $(".mod-input-phone span").html("");
    $(".phone").css("border", "1px solid #ddd");
  }
  if ($(".phone7").val() !== "") {
    $(".mod-input-phone span").html("");
    $(".phone7").css("border", "1px solid #ddd");
  }
}

function diachi() {
  if ($(".diachi").val() !== "") {
    $(".mod-input-adress span").html("");
    $(".diachi").css("border", "1px solid #ddd");
  }
  if ($(".diachi7").val() !== "") {
    $(".mod-input-adress span").html("");
    $(".diachi7").css("border", "1px solid #ddd");
  }
}

async function sendCode(code) {
  try {
    const htmlSuccess = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="currentColor"
      class="bi bi-check-circle"
      viewBox="0 0 16 16"
    >
      <path
        style="fill: var(--success-color)"
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        style="fill: var(--success-color)"
        d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
      />
    </svg>
    `;
    $(".summary-section-code-send").html(htmlSuccess);
    await $.ajax({
      type: "POST",
      url: "/order/sendCode",
      data: {
        code,
        name: $(".hoten").val(),
      },
    });
  } catch (error) {
    console.log(error);
  }
}

async function saveInfo() {
  let fullname = $(".hoten").val(),
    phone = $(".phone").val(),
    address = `${$(".diachi").val()}, ${$(".adress_phuong").val()}, ${$(
      ".adress_quan"
    ).val()}, ${$(".adress_tinh").val()}`;
  if (
    fullname == "" ||
    phone == "" ||
    $(".diachi").val() == "" ||
    $(".adress_phuong").val() == "" ||
    $(".adress_quan").val() == "" ||
    $(".adress_tinh").val() == ""
  ) {
    toastError("Lưu thất bại, vui lòng điền đầy đủ thông tin giao hàng!");
    $(".dat-hang").addClass("hide-btn");
  } else if (
    $(".mod-address-tag-icon-1").css("color") == "rgb(153, 153, 153)" &&
    $(".mod-address-tag-icon-2").css("color") == "rgb(153, 153, 153)"
  ) {
    toastError("Vui lòng chọn tên cho địa chỉ");
    $(".dat-hang").addClass("hide-btn");
  } else {
    if (isVietnamesePhoneNumber(phone)) {
      toastSuccess();
      $(".mod-guest-register").addClass("hide-btn");
      $(".summary-section-code-send button").removeClass("hide-btn");
      $(".dat-hang").removeClass("hide-btn");
      const code = Math.random().toFixed(6) * 10 ** 6;
      const codeConfirm = code >= 10 ** 5 ? code : code + 10 ** 5;
      $(".summary-section-code-send button").on("click", async () => {
        sendCode(codeConfirm);
      });
      $(".dat-hang").on("click", async function () {
        const type =
          $(".vp").css("color") !== "rgb(153, 153, 153)"
            ? $(".vp").text()
            : $(".nr").text();
        try {
          $(".summary-section-code span").text("");
          if ($("#codeConfirm").val() == codeConfirm) {
            window.location.href = `/order/${$(this).attr(
              "id"
            )}?result=success`;
            await $.ajax({
              type: "POST",
              url: "/order/create",
              data: {
                name: fullname,
                phone,
                address,
                total: $(".bill-total").attr("data-price"),
                type,
              },
            });
          } else {
            $("#codeConfirm").css("border", "1px solid var(--error-color)");
            let turnNumber = $(this).attr("turn-number");
            turnNumber = turnNumber * 1 + 1;
            $(this).attr("turn-number", turnNumber);
            const turnError = $(this).attr("turn-number");
            if (turnError < 3) {
              $(".summary-section-code span").text(
                $("#codeConfirm").val() == ""
                  ? "Đây là trường bắt buộc. Vui lòng điền đầy đủ! " +
                      ` (${turnError}/3)`
                  : "Mã xác nhận không chính xác" + ` (${turnError}/3)`
              );
            } else {
              alert(
                "Bạn đã thất bại cả 3 lần. Vui lòng thoát ra và thử lại sau!"
              );
              window.location.href = "/cart";
            }
          }
        } catch (error) {
          alert(error.responseJSON.mess);
        }
      });
    } else {
      toastError("Số điện thoại này không hợp lệ");
      $(".dat-hang").addClass("hide-btn");
    }
  }
  showToast();
}

function isVietnamesePhoneNumber(number) {
  return /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(number);
}

// xóa
async function xoa(productID) {
  try {
    await $.ajax({
      url: "/order/xoa",
      type: "DELETE",
      data: { productID },
    });
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

// update order
// async function updateOrder() {
//   try {
//     $(".toast").css("display", "block");
//     const total = Number($(".bill-total").text().split(".").join(""));
//     console.log(309, total);
//     const name = $(".v2-address-title").html();
//     const phone = $(".v2-mobile").html();
//     const address = $(".address-user").html();
//     const type = $(".add-diachi").html();
//     console.log(327, total, name, phone, type, address);
//     if ((name != "") & (phone != "") & (address != "")) {
//       // kiểm tra đã có data nhận hàng chưa
//       const data = await $.ajax({
//         // tạo mới data dia chỉ nhận hàng
//         url: "/order/Neworder",
//         type: "POST",
//         data: {
//           total: total,
//           name: name,
//           phone: phone,
//           type: type,
//           address: address,
//         },
//       });
//       // console.log(data);

//       $(".toast").toast("show");
//       setTimeout(function () {
//         window.location.href = "/cart";
//       }, 2000);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function changeAddress(i) {
//   try {
//     for (let j = 0; j < $(`.add`).length; j++) {
//       if (j == i) {
//         console.log(345, $(`.checkAddress${i}`).prop("checked"));
//         $(`.checkAddress${i}`).attr("aria-checked", "true");
//       } else {
//         $(`.checkAddress${j}`).prop("checked", false);
//         $(`.checkAddress${j}`).attr("aria-checked", "false");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function saveadd() {
//   try {
//     for (let j = 0; j < $(`.add`).length; j++) {
//       // console.log(375,$(`.checkAddress${j}`).attr('aria-checked'));
//       if ($(`.checkAddress${j}`).attr("aria-checked") === "true") {
//         $(".v2-address-title").html($(`.ten${j}`).html());
//         $(".v2-mobile").html($(`.sdt${j}`).html());
//         $(".add-diachi").html($(`.type${j}`).html());
//         $(".address-user").html($(`.diachi${j}`).html());
//         // console.log(378, $(`.ten${j}`).html(), $(`.sdt${j}`).html(), $(`.type${j}`).html(),$(`.diachi${j}`).html() );
//       }
//       if ($(`.add-diachi`).html() === "VĂN PHÒNG") {
//         $(`.add-diachi`).css({
//           background: "#189cb7",
//           "border-radius": "99px",
//         });
//         $(`.dc`).css({ background: "#189cb7" });
//       } else {
//         $(`.add-diachi`).css({
//           background:
//             "linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)",
//         });
//         $(`.dc`).css({
//           background:
//             "linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function saveadd1() {
//   try {
//     for (let j = 0; j < $(`.add`).length; j++) {
//       if ($(`.checkAddress${j}`).attr("aria-checked") === "true") {
//         $(".name-nhan").html($(`.ten${j}`).html());
//         $(".mobile-nhan").html($(`.sdt${j}`).html());
//         $(".address-nhan").html($(`.diachi${j}`).html());
//       }
//       if ($(`.add-diachi`).html() === "VĂN PHÒNG") {
//         $(`.add-diachi`).css({
//           background: "#189cb7",
//           "border-radius": "99px",
//         });
//         $(`.dc`).css({ background: "#189cb7" });
//       }
//       if ($(`.add-diachi`).html() === "Nhà Riêng") {
//         $(`.add-diachi`).css({
//           background:
//             "linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)",
//         });
//         $(`.dc`).css({
//           background:
//             "linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function luu1() {
//   try {
//     for (let j = 0; j < $(`.add`).length; j++) {
//       if ($(".v2-address-title").html() === $(`.ten${j}`).html()) {
//         $(".name-nhan").html($(`.ten${j}`).html());
//         $(".mobile-nhan").html($(`.sdt${j}`).html());
//         $(".address-nhan").html($(`.diachi${j}`).html());
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// async function luu2() {
//   try {
//     // ('.btn-luu-adress').attr('data-dismiss','')
//     $(".hoten7").val("");
//     $(".phone7").val("");
//     $(".diachi7").val("");
//     $(".adress_tinh7").val("");
//     $(".adress_quan7").val("");
//     $(".adress_phuong7").val("");
//     for (let j = 0; j < $(`.add`).length; j++) {
//       if (
//         ($(".v2-address-title").html() === $(`.ten${j}`).html()) &
//         ($(".v2-mobile").html() === $(`.sdt${j}`).html())
//       ) {
//         $(`.checkAddress${j}`).attr("checked", "true");
//         $(`.checkAddress${j}`).attr("aria-checked", "true");
//       }
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
// van_phong();
// async function van_phong() {
//   try {
//     for (let j = 0; j < $(`.add`).length; j++) {
//       if ($(`.type${j}`).html() === "VĂN PHÒNG") {
//         $(`.type${j}`).css({ background: "#189cb7", "border-radius": "99px" });
//         $(`.t${j}`).css({ background: "#189cb7" });
//       }
//     }
//     if ($(`.add-diachi`).html() === "VĂN PHÒNG") {
//       $(`.add-diachi`).css({ background: "#189cb7", "border-radius": "99px" });
//       $(`.dc`).css({ background: "#189cb7" });
//     }
//     if ($(`.add-diachi`).html() === "Nhà Riêng") {
//       $(`.add-diachi`).css({
//         background:
//           "linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)",
//       });
//       $(`.dc`).css({
//         background:
//           "linear-gradient(-143deg, rgb(255, 123, 83) 0%, rgb(255, 75, 40) 100%)",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
