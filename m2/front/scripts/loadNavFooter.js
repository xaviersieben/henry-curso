export function loadNavFooter() {
  $(function () {
    $("#nav-placeholder").load("../pages/nav.html");
  });

  $(function () {
    $("#footer-placeholder").load("../pages/footer.html");
  });
}
