// Change Password
function checkEmpty(data) {
  data.forEach((item) => {
    if (item.val() === "") {
      item.css("border", "1px solid var(--error-color)");
      item[0].parentElement.querySelector(
        ".content-info-group span"
      ).innerText = "Thông tin này bắt buộc";
    } else {
      item.css("border", "1px solid #ddd");
    }
  });
}

async function saveChange() {
  $(".content-info-group span").text("");
  const currentPassword = $("#currentPassword");
  const newPassword = $("#newPassword");
  const confirmPassword = $("#confirmPassword");
  try {
    checkEmpty([currentPassword, newPassword, confirmPassword]);
    if (newPassword.val().length < 6) {
      newPassword[0].parentElement.querySelector(
        ".content-info-group span"
      ).innerText = "Mật khẩu này quá yếu";
      newPassword.css("border", "1px solid var(--error-color)");
    } else {
      if (newPassword.val() === confirmPassword.val()) {
        await $.ajax({
          type: "PUT",
          url: "/user/profile/change-password",
          data: {
            currentPassword: currentPassword.val(),
            newPassword: newPassword.val(),
          },
        });
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      } else {
        confirmPassword[0].parentElement.querySelector(
          ".content-info-group span"
        ).innerText = "Mật khẩu phải được trùng khớp";
        newPassword.css("border", "1px solid var(--error-color)");
        confirmPassword.css("border", "1px solid var(--error-color)");
      }
    }
  } catch (error) {
    currentPassword[0].parentElement.querySelector(
      ".content-info-group span"
    ).innerText = error.responseJSON.message;
    currentPassword.css("border", "1px solid var(--error-color)");
  }
}

document.onkeydown = function (e) {
  if (e.code === "Enter") {
    saveChange();
  }
};

// Edit Info
function editName() {
  const username = $("#edit-username");
  username.css("border", "1px solid #ddd");
  $(".error-text").text("");
  $(".content-info-detail-name").css("display", "none");
  $(".error-edit").attr("style", "display : flex");
  username.on("blur", () => {
    if (username.val().length > 2 && username.val().length < 50) {
      $(".error-edit").css("display", "none");
      $(".content-info-detail-name").css("display", "flex");
      $(".content-info-detail-name p").text(username.val());
    } else {
      username.css("border", "1px solid var(--btn-color)");
      $(".error-text").text("Username phải có từ 2-50 kí tự");
    }
  });
}

async function changeInfo() {
  try {
    const username = $("#edit-username").val();
    const address = $("#address").val();
    const day = $("#day").val();
    const month = $("#month").val().slice(6, $("#month").val().length);
    const year = $("#year").val();
    const gender = $("#gender").val();
    if (username.length > 2 && username.length < 50) {
      await $.ajax({
        url: "/user/profile/edit",
        type: "PUT",
        data: {
          username: username,
          address: address,
          day: day,
          month: month,
          year: year,
          gender: gender,
        },
      });
      window.location.href = "/profile/info";
    } else {
      alert("Invalid Username");
    }
  } catch (error) {
    console.log(error);
  }
}

$("#avatar-edit").on("click", () => {
  $("#upload-avatar").trigger("click");
  console.log($("#upload-avatar").val());
});
