$.ajax({
  url: "/users",
  method: "GET",
  success: function (data) {
    data.forEach(function (user) {
      var newRow = $(
        `<tr style="cursor: pointer;" data-user-id='${user._id}' data-user-description='${user.description}' onclick="displayInfo('${user._id}')">`
      );
      newRow.append($("<td>").text(user.username));
      newRow.append($("<td>").text(user.email));
      newRow.append(
        $("<td>")
          .html(`<button class='btn' onclick='handleDelete(event, "${user._id}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5zm13-3H1v2h14zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
    </svg></button>`)
      );

      $("#user-table").append(newRow);
    });
  },
  error: function (xhr, status, error) {
    if (xhr.responseJSON) {
      showAlertModal(xhr.responseJSON.message);
    } else {
      showAlertModal("Something went wrong while fetching userlist");
    }
    console.error(status, error);
  },
});

function handleDelete(event, userId) {
  event.stopPropagation();
  event.preventDefault();

  $.ajax({
    url: "/users/" + userId,
    method: "DELETE",
    success: function () {
      $("#user-table")
        .find('[data-user-id="' + userId + '"]')
        .remove();
    },
    error: function (xhr, status, error) {
      if (xhr.responseJSON) {
        showAlertModal(xhr.responseJSON.message);
      }
      console.error(status, error);
    },
  });
}

function displayInfo(userId) {
  const row = $("#user-table").find('[data-user-id="' + userId + '"]');

  const username = row.find("td:eq(0)").text();
  const email = row.find("td:eq(1)").text();
  const description = row.attr("data-user-description");

  const modalBody = $("#user-info-modal-body");
  modalBody.empty();

  const newDiv = $("<div>");
  newDiv.append($("<p>").text(username));
  newDiv.append($("<p>").text(email));
  newDiv.append($("<p class='mt-4'>").text(description));

  modalBody.append(newDiv);

  const modal = new bootstrap.Modal("#modal", {});
  modal.show();
}

function showAlertModal(message) {
  const modalBody = $("#alert-modal-body");
  modalBody.empty();

  modalBody.text(message);

  const modal = new bootstrap.Modal("#alert-modal");
  modal.show();
}
