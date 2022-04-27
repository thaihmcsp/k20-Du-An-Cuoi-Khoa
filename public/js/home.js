function btnView() {
  window.location.href = "/pagination";
}

async function btnPage(page, listPage) {
  let numPage = page * 1;
  try {
    // Previous
    $(".page-pre").on("click", () => {
      numPage = numPage - 1;
      btnPage(numPage, listPage);
    });
    if (numPage == 1) {
      $(".page-pre").off("click");
      $(".page-pre").attr("style", "opacity : 0.5; pointer-events: none;");
    } else {
      $(".page-pre").attr("style", "opacity : 1; ");
    }
    // Next
    $(".page-next").on("click", () => {
      numPage = numPage + 1;
      btnPage(numPage, listPage);
    });
    if (numPage == listPage) {
      $(".page-next").off("click");
      $(".page-next").attr("style", "opacity : 0.5 ; pointer-events: none");
    } else {
      $(".page-next").attr("style", "opacity : 1; ");
    }
    const res = await $.ajax({
      type: "GET",
      url: `/codeProduct/pagination?page=${numPage}`,
    });
    $(".product-list").html(res);
    // window.location.href = "/pagination?page=" + page;
  } catch (error) {
    console.log(error);
  }
}

btnPage(1);
