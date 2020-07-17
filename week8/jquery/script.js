$(document).ready(function () {
  $('#generateRandomDoge').click(function () {
    console.log('button clicked');
    $.get('https://dog.ceo/api/breeds/image/random')
      .done(function (data) {
        console.log(data);
        $('#dogoContainer').html(renderDogoImage(data.message));
      })
      .fail(function (error) {
        console.log(error);
      });
  });

  function renderDogoImage(image) {
    return `
      <img src="${image}" class="mw-100" />
      `;
  }
});