async function ADD() {
  const fullName = $("#fullName").val();
  const password = $("#password").val();
  const repassword = $("#repassword").val();
  const email = $("#email").val();
  const role = $("#role").val();
  if (
    fullName == "" ||
    password == "" ||
    repassword == "" ||
    email == "" ||
    role == ""
  ) {
    $(".note").text("Vui lòng điền đầy đủ thông tin");
  } else {
    console.log(fullName, password, repassword, email, role);
    if (password === repassword) {
      try {
        const res = await $.ajax({
          url: "/user/createadmin",
          type: "POST",
          data: {
            fullName: fullName,
            password: password,
            email: email,
            role: role,
          },
        });
        $("#fullName").val("");
        $("#password").val("");
        $("#repassword").val("");
        $("#email").val("");
        console.log(res);
        alert(res.mess)
      } catch (error) {
        alert(error.responseJSON.mess);
      }
    } else {
      $("#mk").text("Mật khẩu điền không khớp");
      $("#remk").text("Mật khẩu điền không khớp");
    }
  }
}
