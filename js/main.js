function download(filename, content) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

document.getElementById("dwn-btn").addEventListener(
  "click",
  function () {
    var filename = `generated_Bookmarks_${new Date().toLocaleDateString()}.html`;
    let bookmarks = getSelcectedBookmarks();

    download(filename, renderTemplate(bookmarks));
  },
  false
);

const getSelcectedBookmarks = () => {
  var selectedBookmarks = [];
  var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");

  for (var i = 0; i < checkboxes.length; i++) {
    let data = {
      data: {
        bookmarks: checkboxes[i].value,
        dateAdded: Math.floor(Date.now() / 1000),
      },
      date: Math.floor(Date.now() / 1000),
    };
    selectedBookmarks.push(data);
  }
  return selectedBookmarks;
};

const renderTemplate = (data) => {
  console.log(data);
  return `
  <!DOCTYPE NETSCAPE-Bookmark-file-1>
  <!-- This is an automatically generated file.
       It will be read and overwritten.
       DO NOT EDIT! -->
  <META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
  <TITLE>Bookmarks</TITLE>
  <H1>Bookmarks</H1>
  <DL><p>
      <DT><H3 ADD_DATE="${data.date}}" LAST_MODIFIED="${
    data.date
  }" PERSONAL_TOOLBAR_FOLDER="true">Bookmarks bar</H3>
      <DL><p>
      ${data.map((book) => {
        return `<DT><A HREF="https://www.youtube.com/" ADD_DATE="${book.data.dateAdded}">${book.data.bookmarks}</A></DT>`;
      })}
      </DL><p>
  </DL><p>
  `;
};
